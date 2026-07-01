import React, { useRef, useState } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Upload, Download, FileImage, Trash2, Lock, ChevronDown, Globe } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { convertImagesToPDF, downloadPDF, ImageFile } from "@/lib/jpgToPdfConverter";

export default function JpgToPdf() {

  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList) => {
    const newImages: ImageFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.includes("image")) {
        toast.error(t.jpgToPdf.invalidFile);
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error(t.jpgToPdf.fileSizeError);
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        newImages.push({
          file,
          preview,
          id: `${Date.now()}-${Math.random()}`,
        });

        if (newImages.length === Object.keys(files).length) {
          setImages([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };

  const createPDF = async () => {
    if (images.length === 0) {
      toast.error(t.jpgToPdf.invalidFile);
      return;
    }

    setIsConverting(true);
    try {
      const blob = await convertImagesToPDF(images, 'converted.pdf');
      downloadPDF(blob, 'converted.pdf');
      toast.success(t.jpgToPdf.pdfReady);
    } catch (error) {
      toast.error(t.jpgToPdf.conversionError);
      console.error(error);
    } finally {
      setIsConverting(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <FileImage className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{t.jpgToPdf.title}</h1>
              <p className="text-sm text-slate-500">{t.jpgToPdf.description}</p>
            </div>
          </div>
          
          {/* Language Toggle */}
          <div className="flex gap-2">
            <Button
              variant={language === 'ko' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('ko')}
              className="w-12"
            >
              KO
            </Button>
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
              className="w-12"
            >
              EN
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Privacy Badges */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <Lock className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">{t.badges.browserProcessing}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
            <Lock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">{t.badges.noUpload}</span>
          </div>
        </div>

        {/* Upload Card */}
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle>{t.jpgToPdf.title}</CardTitle>
            <CardDescription>{t.jpgToPdf.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging ? 'border-green-500 bg-green-50' : 'border-slate-300 bg-slate-50'
              }`}
            >
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-lg font-semibold text-slate-900">{t.jpgToPdf.uploadTitle}</p>
              <p className="text-sm text-slate-500">{t.jpgToPdf.uploadHint}</p>
            </div>

            {/* Select Button */}
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isConverting}
              className="w-full h-12 text-base font-semibold"
            >
              <Upload className="w-4 h-4 mr-2" />
              {t.jpgToPdf.selectButton}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* Image List */}
        {images.length > 0 && (
          <Card className="mb-12 shadow-lg">
            <CardHeader>
              <CardTitle>
                {images.length} {t.jpgToPdf.imageCount}
              </CardTitle>
              <CardDescription>{t.jpgToPdf.dragToReorder}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Thumbnails */}
              <div className="space-y-2">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <img
                      src={image.preview}
                      alt={`Page ${index + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{image.file.name}</p>
                      <p className="text-sm text-slate-600">
                        {(image.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    
                    {/* Move Buttons */}
                    <div className="flex gap-1">
                      {index > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveImage(index, index - 1)}
                          className="text-xs"
                        >
                          ↑
                        </Button>
                      )}
                      {index < images.length - 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveImage(index, index + 1)}
                          className="text-xs"
                        >
                          ↓
                        </Button>
                      )}
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeImage(image.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={createPDF}
                  disabled={isConverting || images.length === 0}
                  className="flex-1"
                >
                  {isConverting ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2" />
                      {t.jpgToPdf.createPdf}
                    </>
                  ) : (
                    <>
                      <FileImage className="w-4 h-4 mr-2" />
                      {t.jpgToPdf.createPdf}
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setImages([]);
                  }}
                  variant="outline"
                >
                  {t.jpgToPdf.convertMore}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Links */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <p className="text-sm text-slate-600 mb-3">
            {language === 'ko' ? '다른 변환 도구:' : 'Other conversion tools:'}
          </p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            {t.footer.pdfToJpg} →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-sm">{t.footer.copyright}</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
                {t.footer.terms}
              </Link>
              <Link href="/contact" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
                {t.footer.contact}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
