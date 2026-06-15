import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { createConversion, getConversionById, getImagesByConversionId, updateConversionStatus, createImage, getConversionsByUserId } from "../db";
import { storagePut } from "../storage";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import sharp from "sharp";
import AdmZip from "adm-zip";
import axios from "axios";
import { execSync } from "child_process";

// PDF를 이미지로 변환하는 함수
async function convertPdfToImages(
  pdfBuffer: Buffer,
  conversionId: number,
  quality: number
): Promise<{ pageCount: number; imagePaths: string[] }> {
  const tempDir = os.tmpdir();
  const tempPdfPath = path.join(tempDir, `pdf-${conversionId}-${Date.now()}.pdf`);
  const outputDir = path.join(tempDir, `pdf-output-${conversionId}-${Date.now()}`);

  try {
    // 임시 디렉토리 생성
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // PDF 파일 저장
    fs.writeFileSync(tempPdfPath, pdfBuffer);

    // pdftoppm을 사용하여 PDF를 PPM 이미지로 변환
    // 품질 설정: -r로 DPI 조절 (기본 150, 높을수록 고품질)
    const dpi = Math.max(72, Math.min(300, Math.round(150 * (quality / 85))));
    const outputPrefix = path.join(outputDir, "page");

    try {
      execSync(
        `pdftoppm -r ${dpi} -jpeg -q ${quality} "${tempPdfPath}" "${outputPrefix}"`,
        { stdio: "pipe" }
      );
    } catch (error) {
      console.error("pdftoppm conversion error:", error);
      throw new Error("Failed to convert PDF using pdftoppm");
    }

    // 생성된 이미지 파일 찾기
    const files = fs.readdirSync(outputDir).sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || "0");
      const numB = parseInt(b.match(/\d+/)?.[0] || "0");
      return numA - numB;
    });

    const imagePaths = files
      .filter((f) => f.endsWith(".jpg"))
      .map((f) => path.join(outputDir, f));

    return {
      pageCount: imagePaths.length,
      imagePaths,
    };
  } catch (error) {
    // 정리
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive: true, force: true });
    }
    throw error;
  } finally {
    // 임시 PDF 파일 삭제
    if (fs.existsSync(tempPdfPath)) {
      fs.unlinkSync(tempPdfPath);
    }
  }
}

export const conversionRouter = router({
  // PDF 파일 업로드 및 변환 시작
  uploadAndConvert: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileData: z.string(), // base64 encoded
        quality: z.number().min(1).max(100).default(85),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let conversionId: number = 0;
      let outputDir: string = "";

      try {
        // 1. 파일 버퍼 생성
        const fileBuffer = Buffer.from(input.fileData, "base64");
        
        // PDF 유효성 검사
        if (fileBuffer.length < 4) {
          throw new Error("Invalid PDF file: file too small");
        }
        
        // PDF 헤더 검사 (%PDF)
        const pdfHeader = fileBuffer.toString("ascii", 0, 4);
        if (!pdfHeader.startsWith("%PDF")) {
          throw new Error("Invalid PDF file: incorrect file format");
        }
        
        // 파일 크기 제한 (100MB)
        if (fileBuffer.length > 100 * 1024 * 1024) {
          throw new Error("PDF file is too large (max 100MB)");
        }

        // 2. 변환 레코드 생성
        const conversionResult = await createConversion({
          userId: ctx.user.id,
          fileName: input.fileName,
          fileSize: fileBuffer.length,
          pageCount: 0, // 임시값
          quality: input.quality,
          status: "processing",
        });

        if (!conversionResult || !conversionResult.id) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create conversion record",
          });
        }

        conversionId = conversionResult.id as number;

        // 3. PDF를 이미지로 변환
        console.log(`Converting PDF for conversion ${conversionId}...`);
        const { pageCount, imagePaths } = await convertPdfToImages(
          fileBuffer,
          conversionId,
          input.quality
        );

        if (imagePaths.length === 0) {
          throw new Error("No images were generated from PDF");
        }

        outputDir = path.dirname(imagePaths[0]);

        // 4. 각 이미지를 S3에 업로드
        const images = [];
        for (let i = 0; i < imagePaths.length; i++) {
          try {
            const imagePath = imagePaths[i];
            const imageBuffer = fs.readFileSync(imagePath);

            // 이미지 크기 정보 추출
            const metadata = await sharp(imageBuffer).metadata();

            // S3에 업로드
            const imageKey = `conversions/${conversionId}/page-${i + 1}.jpg`;
            const { url } = await storagePut(imageKey, imageBuffer, "image/jpeg");

            // 이미지 메타데이터 저장
            await createImage({
              conversionId: conversionId,
              pageNumber: i + 1,
              imageUrl: url,
              imageKey: imageKey,
              fileSize: imageBuffer.length,
              width: metadata.width || 800,
              height: metadata.height || 1000,
            });

            images.push({
              pageNumber: i + 1,
              url,
              fileSize: imageBuffer.length,
            });

            console.log(`✓ Page ${i + 1} uploaded successfully`);
          } catch (pageError) {
            console.error(`✗ Failed to process page ${i + 1}:`, pageError);
          }
        }

        // 5. 변환 완료 상태 업데이트
        await updateConversionStatus(conversionId, "completed");

        return {
          conversionId: conversionId,
          pageCount: pageCount,
          images,
          quality: input.quality,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        // 변환 실패 상태 업데이트
        if (conversionId > 0) {
          try {
            await updateConversionStatus(conversionId, "failed", errorMessage);
          } catch (updateError) {
            console.error("Failed to update conversion status:", updateError);
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `PDF conversion failed: ${errorMessage}`,
        });
      } finally {
        // 임시 디렉토리 정리
        if (outputDir && fs.existsSync(outputDir)) {
          try {
            fs.rmSync(outputDir, { recursive: true, force: true });
          } catch (cleanupError) {
            console.warn("Failed to cleanup temporary directory:", cleanupError);
          }
        }
      }
    }),

  // 변환 결과 조회
  getConversion: protectedProcedure
    .input(z.object({ conversionId: z.number() }))
    .query(async ({ ctx, input }) => {
      const conversion = await getConversionById(input.conversionId);

      if (!conversion || conversion.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Conversion not found",
        });
      }

      const images = await getImagesByConversionId(input.conversionId);

      return {
        ...conversion,
        images,
      };
    }),

  // 사용자의 변환 히스토리 조회
  getHistory: protectedProcedure.query(async ({ ctx }) => {
    const conversions = await getConversionsByUserId(ctx.user.id);
    return conversions;
  }),

  // ZIP 다운로드 URL 생성
  generateZipDownload: protectedProcedure
    .input(z.object({ conversionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const conversion = await getConversionById(input.conversionId);

      if (!conversion || conversion.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Conversion not found",
        });
      }

      const images = await getImagesByConversionId(input.conversionId);

      try {
        // ZIP 파일 생성
        const zip = new AdmZip();
        const failedImages: number[] = [];

        // 각 이미지를 ZIP에 추가
        for (const image of images) {
          try {
            const imageBuffer = await axios.get(image.imageUrl, {
              responseType: "arraybuffer",
            });
            zip.addFile(`page-${image.pageNumber}.jpg`, Buffer.from(imageBuffer.data));
          } catch (err) {
            console.error(`Failed to add image ${image.pageNumber} to ZIP:`, err);
            failedImages.push(image.pageNumber);
          }
        }
        
        // 실패한 이미지가 있으면 오류 반환
        if (failedImages.length > 0) {
          throw new Error(`Failed to include pages: ${failedImages.join(", ")}`);
        }

        const zipBuffer = zip.toBuffer();
        const zipKey = `conversions/${conversion.id}/download-${Date.now()}.zip`;
        const { url } = await storagePut(zipKey, zipBuffer, "application/zip");

        return {
          url,
          fileName: `${conversion.fileName.replace(".pdf", "")}.zip`,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `ZIP generation failed: ${errorMessage}`,
        });
      }
    }),
});
