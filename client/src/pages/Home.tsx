import React, { useRef, useState } from 'react';
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc";
import { Upload, Download, FileImage, Zap, CheckCircle2, Lock, ChevronDown, Globe } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

interface ConvertedImage {
  pageNumber: number;
  url: string;
  fileSize: number;
}

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  
  const [isDragging, setIsDragging] = useState(false);
  const [quality, setQuality] = useState(85);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [conversionId, setConversionId] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [pageRangeStart, setPageRangeStart] = useState(1);
  const [pageRangeEnd, setPageRangeEnd] = useState(1);
  const [outputFormat, setOutputFormat] = useState<'jpg' | 'png'>('jpg');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.conversion.uploadAndConvert.useMutation();
  const zipMutation = trpc.conversion.generateZipDownload.useMutation();

  const handleFileSelect = async (file: File) => {
    if (!file.type.includes("pdf")) {
      toast.error(t.upload.uploadError);
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error(t.upload.fileSizeError);
      return;
    }

    setIsConverting(true);
    setConversionProgress(0);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(",")[1];
        
        const progressInterval = setInterval(() => {
          setConversionProgress((prev) => Math.min(prev + Math.random() * 30, 90));
        }, 300);

        try {
          const result = await uploadMutation.mutateAsync({
            fileName: file.name,
            fileData: base64,
            quality,
          });

          clearInterval(progressInterval);
          setConversionProgress(100);
          
          setTotalPages(result.pageCount);
          setPageRangeStart(1);
          setPageRangeEnd(result.pageCount);
          
          setConvertedImages(result.images);
          setConversionId(result.conversionId);
          toast.success(`${result.pageCount}${language === 'ko' ? '개 페이지가 성공적으로 변환되었습니다.' : ' pages converted successfully.'}`);
          
          setTimeout(() => setConversionProgress(0), 1000);
        } catch (error) {
          clearInterval(progressInterval);
          throw error;
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error(t.upload.conversionError);
      console.error(error);
      setConversionProgress(0);
    } finally {
      setIsConverting(false);
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
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const downloadImage = (image: ConvertedImage) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `page-${image.pageNumber}.${outputFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAsZip = async () => {
    if (!conversionId) return;
    
    try {
      const result = await zipMutation.mutateAsync({
        conversionId,
      });
      
      const link = document.createElement("a");
      link.href = result.url;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(t.results.downloadSuccess);
    } catch (error) {
      toast.error(t.results.downloadError);
      console.error(error);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileImage className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{t.header.title}</h1>
              <p className="text-sm text-slate-500">{t.header.subtitle}</p>
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
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">{t.badges.noUpload}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full">
            <Lock className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">{t.badges.completePrivacy}</span>
          </div>
        </div>

        {/* Upload Card */}
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">{t.upload.title}</CardTitle>
            <CardDescription>{t.upload.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quality Slider */}
            <div>
              <label className="text-sm font-semibold text-slate-700">{t.upload.qualityLabel}</label>
              <div className="flex items-center gap-4 mt-2">
                <Slider
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  min={30}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="text-lg font-bold text-blue-600 w-12 text-right">{quality}%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{t.upload.qualityHint}</p>
            </div>

            {/* Advanced Options */}
            <div className="border-t pt-4">
              <button
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} />
                {t.upload.advancedOptions}
              </button>

              {showAdvancedOptions && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700">{t.upload.outputFormat}</label>
                    <div className="flex gap-2 mt-2">
                      {['jpg', 'png'].map((format) => (
                        <Button
                          key={format}
                          variant={outputFormat === format ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setOutputFormat(format as 'jpg' | 'png')}
                        >
                          {format.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{t.upload.formatHint}</p>
                  </div>
                </div>
              )}
            </div>

            {/* File Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50'
              }`}
            >
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-lg font-semibold text-slate-900">{t.upload.dragDropTitle}</p>
              <p className="text-sm text-slate-500">{t.upload.dragDropHint}</p>
            </div>

            {/* Select Button */}
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isConverting}
              className="w-full h-12 text-base font-semibold"
            >
              {isConverting ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  {t.upload.converting}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {t.upload.selectButton}
                </>
              )}
            </Button>

            {/* Progress Bar */}
            {conversionProgress > 0 && (
              <div className="space-y-2">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${conversionProgress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600 text-center">{Math.round(conversionProgress)}%</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* Comparison Section */}
        <Card className="mb-12 shadow-lg border-2 border-yellow-100 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-900">{t.comparison.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-yellow-800 font-semibold">{t.comparison.message}</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-yellow-200">
                    <th className="text-left py-3 px-4 font-bold text-yellow-900">{t.comparison.headers.feature}</th>
                    <th className="text-left py-3 px-4 font-bold text-yellow-900">{t.comparison.headers.general}</th>
                    <th className="text-left py-3 px-4 font-bold text-yellow-900">{t.comparison.headers.thisTool}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-yellow-100">
                    <td className="py-3 px-4 font-semibold text-yellow-900">{t.comparison.features.serverUpload}</td>
                    <td className="py-3 px-4 text-yellow-800">{t.comparison.values.yes}</td>
                    <td className="py-3 px-4 text-green-700 font-semibold">{t.comparison.values.no}</td>
                  </tr>
                  <tr className="border-b border-yellow-100">
                    <td className="py-3 px-4 font-semibold text-yellow-900">{t.comparison.features.dailyLimit}</td>
                    <td className="py-3 px-4 text-yellow-800">{t.comparison.values.yes}</td>
                    <td className="py-3 px-4 text-green-700 font-semibold">{t.comparison.values.no}</td>
                  </tr>
                  <tr className="border-b border-yellow-100">
                    <td className="py-3 px-4 font-semibold text-yellow-900">{t.comparison.features.registration}</td>
                    <td className="py-3 px-4 text-yellow-800">{t.comparison.values.required}</td>
                    <td className="py-3 px-4 text-green-700 font-semibold">{t.comparison.values.notRequired}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-yellow-900">{t.comparison.features.cost}</td>
                    <td className="py-3 px-4 text-yellow-800">{t.comparison.values.partial}</td>
                    <td className="py-3 px-4 text-green-700 font-semibold">{t.comparison.values.free}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {convertedImages.length > 0 && (
          <Card className="mb-12 shadow-lg">
            <CardHeader>
              <CardTitle>{t.results.conversionComplete}</CardTitle>
              <CardDescription>{convertedImages.length} {t.results.imagesReady}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Page Range Selection */}
              <div>
                <label className="text-sm font-semibold text-slate-700">{t.results.pageRangeLabel}</label>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={pageRangeStart}
                    onChange={(e) => setPageRangeStart(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-2 py-1 border border-slate-300 rounded"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={pageRangeEnd}
                    onChange={(e) => setPageRangeEnd(Math.min(totalPages, parseInt(e.target.value) || totalPages))}
                    className="w-16 px-2 py-1 border border-slate-300 rounded"
                  />
                  <span className="text-sm text-slate-600">({t.results.showing} {pageRangeStart} {t.results.of} {totalPages})</span>
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {convertedImages
                  .filter((img) => img.pageNumber >= pageRangeStart && img.pageNumber <= pageRangeEnd)
                  .map((image) => (
                    <div key={image.pageNumber} className="group relative">
                      <img
                        src={image.url}
                        alt={`${t.results.page} ${image.pageNumber}`}
                        className="w-full h-32 object-cover rounded-lg border border-slate-200 group-hover:border-blue-500 transition-colors"
                      />
                      <button
                        onClick={() => downloadImage(image)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                      >
                        <Download className="w-6 h-6 text-white" />
                      </button>
                      <p className="text-xs text-slate-600 mt-1 text-center">{t.results.page} {image.pageNumber}</p>
                    </div>
                  ))}
              </div>

              {/* Download Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={downloadAsZip}
                  disabled={zipMutation.isPending}
                  className="flex-1"
                >
                  {zipMutation.isPending ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2" />
                      {t.results.preparing}
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      {t.results.downloadAll}
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setConvertedImages([]);
                    setConversionId(null);
                  }}
                  variant="outline"
                >
                  {t.results.convertNewFile}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                {t.features.fastConversion}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">{t.features.fastConversionDesc}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" />
                {t.features.completeSafety}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">{t.features.completeSafetyDesc}</p>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">{t.about.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-700">
            <p>{t.about.para1}</p>
            <p>{t.about.para2}</p>
            <p>{t.about.para3}</p>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">{t.faq.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { q: t.faq.q1, a: t.faq.a1 },
              { q: t.faq.q2, a: t.faq.a2 },
              { q: t.faq.q3, a: t.faq.a3 },
              { q: t.faq.q4, a: t.faq.a4 },
              { q: t.faq.q5, a: t.faq.a5 },
              { q: t.faq.q6, a: t.faq.a6 },
              { q: t.faq.q7, a: t.faq.a7 },
              { q: t.faq.q8, a: t.faq.a8 },
            ].map((item, idx) => (
              <div key={idx} className="border-b pb-4 last:border-b-0">
                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm">{item.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>
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
