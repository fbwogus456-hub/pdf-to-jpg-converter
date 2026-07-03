import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set worker source once at module load time
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export interface ConvertedImage {
  pageNumber: number;
  url: string;
  fileSize: number;
}

export async function convertPdfToImages(
  file: File,
  quality: number = 85,
  format: 'jpg' | 'png' = 'jpg',
  pageStart?: number,
  pageEnd?: number,
  onProgress?: (progress: number) => void
): Promise<ConvertedImage[]> {
  try {
    // Validate file type
    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
      throw new Error('Invalid file type: Please upload a PDF file');
    }

    // Validate file size
    if (file.size === 0) {
      throw new Error('Invalid file: File is empty');
    }

    const arrayBuffer = await file.arrayBuffer();
    
    // Validate PDF file header
    const view = new Uint8Array(arrayBuffer);
    const isPDF = view[0] === 0x25 && view[1] === 0x50 && view[2] === 0x44 && view[3] === 0x46; // %PDF
    if (!isPDF) {
      throw new Error('Invalid PDF file: File does not start with PDF header (%PDF)');
    }

    console.log('[PDF] Loading PDF document...');
    
    // Load PDF document
        const pdf = await pdfjsLib.getDocument({
          data: arrayBuffer,
          useSystemFonts: true,
        } as any).promise;

    console.log(`[PDF] PDF loaded successfully. Total pages: ${pdf.numPages}`);

    const images: ConvertedImage[] = [];
    const totalPages = pdf.numPages;
    const start = pageStart || 1;
    const end = Math.min(pageEnd || totalPages, totalPages);

    // Validate page range
    if (start < 1 || end < start) {
      throw new Error('Invalid page range');
    }

    for (let pageNum = start; pageNum <= end; pageNum++) {
      try {
        console.log(`[PDF] Processing page ${pageNum}...`);
        
        // Get page
        const page = await pdf.getPage(pageNum);

        // Get viewport
        const viewport = page.getViewport({ scale: 2 });

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('Failed to get canvas context');
        }

        // Set white background
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Render page to canvas
        console.log(`[PDF] Page ${pageNum}: Canvas size ${canvas.width}x${canvas.height}`);
        
        const renderTask = page.render({
          canvasContext: context,
          viewport: viewport,
        } as any);
        
        await renderTask.promise;
        console.log(`[PDF] Page ${pageNum}: Render complete`);

        // Convert canvas to image
        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
        const qualityValue = format === 'png' ? undefined : quality / 100;
        const imageUrl = canvas.toDataURL(mimeType, qualityValue);
        
        if (!imageUrl || imageUrl === 'data:,' || imageUrl.length < 100) {
          throw new Error('Failed to convert canvas to image data URL');
        }

        console.log(`[PDF] Page ${pageNum}: toDataURL success - ${imageUrl.substring(0, 50)}... (length: ${imageUrl.length})`);

        // Calculate file size (approximate)
        const fileSize = Math.round((imageUrl.length * 3) / 4 / 1024); // in KB

        const result: ConvertedImage = {
          pageNumber: pageNum,
          url: imageUrl,
          fileSize,
        };
        
        console.log(`[PDF] Page ${pageNum}: Result object created`, result);
        images.push(result);

        // Update progress
        if (onProgress) {
          const progress = ((pageNum - start + 1) / (end - start + 1)) * 100;
          onProgress(progress);
        }
      } catch (pageError) {
        const pageErrorMsg = pageError instanceof Error ? pageError.message : String(pageError);
        console.error(`[PDF] Error rendering page ${pageNum}:`, pageErrorMsg);
        throw new Error(`Failed to render page ${pageNum}: ${pageErrorMsg}`);
      }
    }

    if (images.length === 0) {
      throw new Error('No pages were converted');
    }

    console.log(`[PDF] Conversion complete. Total images: ${images.length}`);
    console.log('[PDF] Final images array:', images);
    return images;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[PDF] Conversion error:', errorMessage);
    throw new Error(`PDF 변환 실패: ${errorMessage}`);
  }
}

export async function downloadImage(imageUrl: string, fileName: string): Promise<void> {
  try {
    if (!imageUrl || !imageUrl.startsWith('data:')) {
      throw new Error('Invalid image URL');
    }

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Download] Error:', errorMessage);
    throw new Error(`이미지 다운로드 실패: ${errorMessage}`);
  }
}

export async function downloadImagesAsZip(
  images: ConvertedImage[],
  fileName: string
): Promise<void> {
  try {
    if (!images || images.length === 0) {
      throw new Error('No images to download');
    }

    const JSZip = (await import('jszip')).default;

    const zip = new JSZip();

    for (const image of images) {
      try {
        // Extract base64 data from data URL
        const parts = image.url.split(',');
        if (parts.length !== 2) {
          throw new Error('Invalid image data URL format');
        }

        const base64 = parts[1];
        if (!base64) {
          throw new Error('Empty base64 data');
        }

        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const imageName = `page_${image.pageNumber}.${image.url.includes('image/png') ? 'png' : 'jpg'}`;
        zip.file(imageName, bytes);
      } catch (imageError) {
        const imageErrorMsg = imageError instanceof Error ? imageError.message : String(imageError);
        console.error(`[ZIP] Error adding image for page ${image.pageNumber}:`, imageErrorMsg);
        throw new Error(`Failed to add page ${image.pageNumber} to ZIP: ${imageErrorMsg}`);
      }
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName.replace('.pdf', '')}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[ZIP] Download error:', errorMessage);
    throw new Error(`ZIP 다운로드 실패: ${errorMessage}`);
  }
}
