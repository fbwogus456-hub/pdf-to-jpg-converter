import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set up the worker with local file
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

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
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  const images: ConvertedImage[] = [];
  const totalPages = pdf.numPages;
  const start = pageStart || 1;
  const end = pageEnd || totalPages;
  
  for (let pageNum = start; pageNum <= end; pageNum++) {
    const page = await pdf.getPage(pageNum);
    
    // Get page dimensions
    const viewport = page.getViewport({ scale: 2 }) as any; // 2x scale for better quality
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Failed to get canvas context');
    
    // Render page to canvas
    await page.render({
      canvasContext: context,
      viewport: viewport,
    } as any).promise;
    
    // Convert canvas to image
    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
    const imageUrl = canvas.toDataURL(mimeType, quality / 100);
    
    // Calculate file size (approximate)
    const fileSize = Math.round((imageUrl.length * 3) / 4);
    
    images.push({
      pageNumber: pageNum,
      url: imageUrl,
      fileSize,
    });
    
    // Update progress
    if (onProgress) {
      const progress = ((pageNum - start + 1) / (end - start + 1)) * 100;
      onProgress(progress);
    }
  }
  
  return images;
}

export async function downloadImage(imageUrl: string, fileName: string): Promise<void> {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadImagesAsZip(
  images: ConvertedImage[],
  fileName: string
): Promise<void> {
  const JSZip = (await import('jszip')).default;
  
  const zip = new JSZip();
  
  for (const image of images) {
    const base64 = image.url.split(',')[1];
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
}
