import jsPDF from 'jspdf';

export interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

export type PdfOrientation = 'portrait' | 'landscape';
export type PdfPageSize = 'a4' | 'letter' | 'fit';

export interface PdfOptions {
  orientation?: PdfOrientation;
  pageSize?: PdfPageSize;
}

export const convertImagesToPDF = async (
  images: ImageFile[],
  fileName: string = 'converted.pdf',
  options: PdfOptions = {}
): Promise<Blob> => {
  if (images.length === 0) {
    throw new Error('No images provided');
  }

  const orientation: PdfOrientation = options.orientation || 'portrait';
  const pageSize: PdfPageSize = options.pageSize || 'a4';

  // "fit" mode: each page matches the image size, so we create the PDF lazily per image.
  let pdf: jsPDF | null = null;

  for (let i = 0; i < images.length; i++) {
    const imageFile = images[i];
    const imageData = await loadImageAsDataURL(imageFile.file);

    const img = new Image();
    img.src = imageData;

    await new Promise((resolve) => {
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const ratio = imgWidth / imgHeight;

        if (pageSize === 'fit') {
          // Page size follows the image's own aspect ratio (in px units).
          const pageOrientation: PdfOrientation =
            imgWidth >= imgHeight ? 'landscape' : 'portrait';

          if (i === 0) {
            pdf = new jsPDF({
              orientation: pageOrientation,
              unit: 'px',
              format: [imgWidth, imgHeight],
            });
          } else {
            pdf!.addPage([imgWidth, imgHeight], pageOrientation);
          }

          pdf!.addImage(imageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
          // Fixed page size (A4 or Letter) with the chosen orientation.
          if (i === 0) {
            pdf = new jsPDF({
              orientation,
              unit: 'mm',
              format: pageSize,
            });
          } else {
            pdf!.addPage(pageSize, orientation);
          }

          const pageWidth = pdf!.internal.pageSize.getWidth();
          const pageHeight = pdf!.internal.pageSize.getHeight();

          let finalWidth = pageWidth - 10; // 5mm margin each side
          let finalHeight = finalWidth / ratio;

          if (finalHeight > pageHeight - 10) {
            finalHeight = pageHeight - 10;
            finalWidth = finalHeight * ratio;
          }

          const x = (pageWidth - finalWidth) / 2;
          const y = (pageHeight - finalHeight) / 2;

          pdf!.addImage(imageData, 'JPEG', x, y, finalWidth, finalHeight);
        }

        resolve(null);
      };
    });
  }

  return pdf!.output('blob');
};

const loadImageAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const downloadPDF = (blob: Blob, fileName: string = 'converted.pdf') => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
