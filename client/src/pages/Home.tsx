'use client';

import { useRef, useState } from 'react';
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
import { getTranslation } from "@/lib/translations";

interface ConvertedImage {
  pageNumber: number;
  url: string;
  fileSize: number;
}

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const { language, setLanguage } = useLanguage();
  const t = (path: string) => getTranslation(language, path);
  
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
      toast.error(t('upload.uploadError'));
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error(t('upload.fileSizeError'));
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
      toast.error(t('upload.conversionError'));
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

  const handleDownloadImage = (imageUrl: string, pageNumber: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    const ext = outputFormat === 'png' ? 'png' : 'jpg';
    link.download = `page-${pageNumber}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadZip = async () => {
    if (!conversionId) return;

    try {
      const result = await zipMutation.mutateAsync({ conversionId });
      const link = document.createElement("a");
      link.href = result.url;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(t('results.downloadSuccess'));
    } catch (error) {
      toast.error(t('results.downloadError'));
      console.error(error);
    }
  };

  const filteredImages = convertedImages.filter(
    (img) => img.pageNumber >= pageRangeStart && img.pageNumber <= pageRangeEnd
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200/50 backdrop-blur-sm bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <FileImage className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{t('header.title')}</h1>
              <p className="text-sm text-slate-500">{t('header.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setLanguage('ko')}
                className={`px-3 py-1 rounded font-medium text-sm transition-all ${
                  language === 'ko'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                KO
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded font-medium text-sm transition-all ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>
            {user && (
              <div className="text-right">
                <p className="text-sm text-slate-600">{user.name || user.email}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {convertedImages.length === 0 ? (
          // Upload Section
          <div className="space-y-12">
            {/* Privacy Badge */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">{t('badges.browserProcessing')}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">{t('badges.noUpload')}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full">
                <Lock className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">{t('badges.completePrivacy')}</span>
              </div>
            </div>

            {/* Upload Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl">{t('upload.title')}</CardTitle>
                <CardDescription>{t('upload.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quality Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">{t('upload.qualityLabel')}</label>
                    <span className="text-sm font-bold text-blue-600">{quality}%</span>
                  </div>
                  <Slider
                    value={[quality]}
                    onValueChange={(value) => setQuality(value[0])}
                    min={1}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-slate-500">{t('upload.qualityHint')}</p>
                </div>

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} />
                  {t('upload.advancedOptions')}
                </button>

                {/* Advanced Options */}
                {showAdvancedOptions && (
                  <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    {/* Output Format */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">{t('upload.outputFormat')}</label>
                      <div className="flex gap-3">
                        {(['jpg', 'png'] as const).map((format) => (
                          <button
                            key={format}
                            onClick={() => setOutputFormat(format)}
                            className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all ${
                              outputFormat === format
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                            }`}
                          >
                            {format.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">{t('upload.formatHint')}</p>
                    </div>
                  </div>
                )}

                {/* Drag and Drop Area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-200 ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-300 bg-slate-50 hover:border-slate-400"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className={`p-4 rounded-full transition-colors ${
                      isDragging ? "bg-blue-100" : "bg-slate-100"
                    }`}>
                      <Upload className={`w-8 h-8 ${
                        isDragging ? "text-blue-600" : "text-slate-600"
                      }`} />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-slate-900">
                        {isDragging ? t('upload.dragDropAlt') : t('upload.dragDropTitle')}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">{t('upload.dragDropHint')}</p>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                {/* File Select Button */}
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isConverting}
                  className="w-full h-11 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {isConverting ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2" />
                      {t('upload.converting')}
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      {t('upload.selectButton')}
                    </>
                  )}
                </Button>

                {/* Progress Bar */}
                {conversionProgress > 0 && conversionProgress < 100 && (
                  <div className="space-y-2">
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300"
                        style={{ width: `${conversionProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 text-center">{Math.round(conversionProgress)}%</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{t('features.fastConversion')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{t('features.fastConversionDesc')}</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{t('features.completeSafety')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{t('features.completeSafetyDesc')}</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Download className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{t('features.freeUsage')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{t('features.freeUsageDesc')}</p>
                </CardContent>
              </Card>
            </div>

            {/* About Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">{t('about.title')}</h2>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>{t('about.para1')}</p>
                <p>{t('about.para2')}</p>
                <p>{t('about.para3')}</p>
              </div>
            </div>

            {/* How to Use */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">{t('howToUse.title')}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: t('howToUse.step1Title'), desc: t('howToUse.step1Desc') },
                  { title: t('howToUse.step2Title'), desc: t('howToUse.step2Desc') },
                  { title: t('howToUse.step3Title'), desc: t('howToUse.step3Desc') },
                ].map((step, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-blue-600">{idx + 1}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">{t('benefits.title')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: t('benefits.browserConversion'), desc: t('benefits.browserConversionDesc') },
                  { title: t('benefits.noServerUpload'), desc: t('benefits.noServerUploadDesc') },
                  { title: t('benefits.freeUnlimited'), desc: t('benefits.freeUnlimitedDesc') },
                  { title: t('benefits.highQuality'), desc: t('benefits.highQualityDesc') },
                ].map((benefit, idx) => (
                  <Card key={idx} className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">{benefit.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">{t('useCases.title')}</h2>
              <div className="space-y-3 text-slate-700">
                <p>• {t('useCases.documentSharing')}</p>
                <p>• {t('useCases.imageEditing')}</p>
                <p>• {t('useCases.socialUpload')}</p>
                <p>• {t('useCases.webPosting')}</p>
                <p>• {t('useCases.mobileViewing')}</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">{t('faq.title')}</h2>
              <div className="space-y-4">
                {[
                  { q: t('faq.q1'), a: t('faq.a1') },
                  { q: t('faq.q2'), a: t('faq.a2') },
                  { q: t('faq.q3'), a: t('faq.a3') },
                  { q: t('faq.q4'), a: t('faq.a4') },
                  { q: t('faq.q5'), a: t('faq.a5') },
                  { q: t('faq.q6'), a: t('faq.a6') },
                  { q: t('faq.q7'), a: t('faq.a7') },
                  { q: t('faq.q8'), a: t('faq.a8') },
                ].map((item, idx) => (
                  <Card key={idx} className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base">{item.q}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">{item.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Results Section
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-slate-900">{t('results.conversionComplete')}</h2>
              <p className="text-slate-600">{convertedImages.length} {t('results.imagesReady')}</p>
            </div>

            {/* Page Range Selection */}
            {totalPages > 1 && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{t('results.pageRangeLabel')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">{language === 'ko' ? '시작 페이지' : 'Start Page'}</label>
                      <input
                        type="number"
                        min={1}
                        max={totalPages}
                        value={pageRangeStart}
                        onChange={(e) => setPageRangeStart(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-2">{language === 'ko' ? '끝 페이지' : 'End Page'}</label>
                      <input
                        type="number"
                        min={1}
                        max={totalPages}
                        value={pageRangeEnd}
                        onChange={(e) => setPageRangeEnd(Math.min(totalPages, parseInt(e.target.value) || totalPages))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{t('results.showing')} {filteredImages.length} {t('results.of')} {totalPages}</p>
                </CardContent>
              </Card>
            )}

            {/* Image Thumbnails */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((img) => (
                <div key={img.pageNumber} className="space-y-2">
                  <div className="relative bg-slate-100 rounded-lg overflow-hidden aspect-square border border-slate-200 hover:shadow-lg transition-shadow">
                    <img
                      src={img.url}
                      alt={`${t('results.page')} ${img.pageNumber}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">{t('results.page')} {img.pageNumber}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadImage(img.url, img.pageNumber)}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Download All Button */}
            <Button
              onClick={handleDownloadZip}
              disabled={zipMutation.isPending}
              className="w-full h-11 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg"
            >
              {zipMutation.isPending ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  {t('results.preparing')}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  {t('results.downloadAll')}
                </>
              )}
            </Button>

            {/* Convert New File Button */}
            <Button
              onClick={() => {
                setConvertedImages([]);
                setConversionId(null);
                setConversionProgress(0);
              }}
              variant="outline"
              className="w-full h-11"
            >
              {t('results.convertNewFile')}
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">{t('footer.copyright')}</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                {t('footer.contact')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
