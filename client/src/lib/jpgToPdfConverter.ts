import jsPDF from 'jspdf';

export interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

export const convertImagesToPDF = async (
  images: ImageFile[],
  fileName: string = 'converted.pdf'
): Promise<Blob> => {
  if (images.length === 0) {
    throw new Error('No images provided');
  }

  // Create a new PDF document
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < images.length; i++) {
    const imageFile = images[i];

    // Load image as data URL
    const imageData = await loadImageAsDataURL(imageFile.file);

    // Get image dimensions
    const img = new Image();
    img.src = imageData;

    await new Promise((resolve) => {
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const ratio = imgWidth / imgHeight;

        // Calculate dimensions to fit page
        let finalWidth = pageWidth - 10; // 5mm margin on each side
        let finalHeight = finalWidth / ratio;

        if (finalHeight > pageHeight - 10) {
          finalHeight = pageHeight - 10;
          finalWidth = finalHeight * ratio;
        }

        // Center image on page
        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;

        // Add image to PDF
        pdf.addImage(imageData, 'JPEG', x, y, finalWidth, finalHeight);

        // Add new page if not the last image
        if (i < images.length - 1) {
          pdf.addPage();
        }

        resolve(null);
      };
    });
  }

  // Return PDF as Blob
  return pdf.output('blob');
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
