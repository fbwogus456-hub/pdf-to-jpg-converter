import * as pdfjsLib from 'pdfjs-dist';

// Set worker source - use import.meta.url to get correct path in Vite
const workerPath = new URL(
  '../../../node_modules/pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).href;

pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;

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
    if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
      throw new Error('Please upload a PDF file');
    }

    if (file.size === 0) {
      throw new Error('File is empty');
    }

    const arrayBuffer = await file.arrayBuffer();
    
    console.log('[PDF] Loading document...');
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

    console.log(`[PDF] Document loaded. Total pages: ${pdf.numPages}`);

    const images: ConvertedImage[] = [];
    const totalPages = pdf.numPages;
    const start = pageStart || 1;
    const end = Math.min(pageEnd || totalPages, totalPages);

    for (let pageNum = start; pageNum <= end; pageNum++) {
      console.log(`[PDF] Rendering page ${pageNum}...`);
      
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2 });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Failed to get canvas context');
      }

      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const qualityValue = format === 'png' ? undefined : quality / 100;
      const imageUrl = canvas.toDataURL(mimeType, qualityValue);

      if (!imageUrl || imageUrl === 'data:,' || imageUrl.length < 100) {
        throw new Error(`Failed to convert page ${pageNum} to image`);
      }

      const fileSize = Math.round((imageUrl.length * 3) / 4 / 1024);
      
      images.push({
        pageNumber: pageNum,
        url: imageUrl,
        fileSize,
      });

      console.log(`[PDF] Page ${pageNum} rendered successfully`);

      if (onProgress) {
        const progress = ((pageNum - start + 1) / (end - start + 1)) * 100;
        onProgress(progress);
      }
    }

    console.log(`[PDF] Conversion complete. Total images: ${images.length}`);
    return images;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[PDF] Error:', errorMessage);
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
    throw new Error(`Download failed: ${errorMessage}`);
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
      const parts = image.url.split(',');
      if (parts.length !== 2) {
        throw new Error('Invalid image data');
      }

      const base64 = parts[1];
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const imageName = `page_${image.pageNumber}.${image.url.includes('image/png') ? 'png' : 'jpg'}`;
      zip.file(imageName, bytes);
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
    console.error('[ZIP] Error:', errorMessage);
    throw new Error(`ZIP download failed: ${errorMessage}`);
  }
}
