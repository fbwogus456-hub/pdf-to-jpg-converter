import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Upload, Download, FileImage, Zap, CheckCircle2, Lock, ChevronDown, Globe } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { convertPdfToImages, downloadImage, downloadImagesAsZip, ConvertedImage } from "@/lib/pdfConverter";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  
  const [isDragging, setIsDragging] = useState(false);
  const [quality, setQuality] = useState(85);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [pageRangeStart, setPageRangeStart] = useState(1);
  const [pageRangeEnd, setPageRangeEnd] = useState(1);
  const [outputFormat, setOutputFormat] = useState<'jpg' | 'png'>('jpg');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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
      // 첫 변환 시 모든 페이지를 변환 (pageStart/End는 undefined로 전달)
      const images = await convertPdfToImages(
        file,
        quality,
        outputFormat,
        undefined,  // pageStart - undefined면 1부터 시작
        undefined,  // pageEnd - undefined면 마지막 페이지까지
        (progress) => setConversionProgress(progress)
      );
      
      console.log('[Home] Conversion result:', images);
      console.log('[Home] Images length:', images.length);
      if (images.length > 0) {
        console.log('[Home] First image URL length:', images[0]?.url.length);
      }
      
      setTotalPages(images.length);
      setPageRangeStart(1);
      setPageRangeEnd(images.length);
      setConvertedImages(images);
      console.log('[Home] State updated with convertedImages');
      setConversionProgress(100);
      
      toast.success(`${images.length}${language === 'ko' ? '개 페이지가 성공적으로 변환되었습니다.' : ' pages converted successfully.'}`);
      
      // 자동 스크롤
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setConversionProgress(0);
      }, 500);
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

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
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

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDownloadAll = async () => {
    try {
      await downloadImagesAsZip(convertedImages, 'converted-images');
      toast.success(t.results.downloadSuccess);
    } catch (error) {
      toast.error(t.results.downloadError);
      console.error(error);
    }
  };

  const handleDownloadSingle = async (image: ConvertedImage) => {
    try {
      const ext = outputFormat === 'png' ? 'png' : 'jpg';
      await downloadImage(image.url, `page_${image.pageNumber}.${ext}`);
    } catch (error) {
      toast.error(t.results.downloadError);
      console.error(error);
    }
  };

  const handleConvertNew = () => {
    setConvertedImages([]);
    setTotalPages(0);
    setConversionProgress(0);
    setPageRangeStart(1);
    setPageRangeEnd(1);
    fileInputRef.current?.click();
  };

  const displayedImages = convertedImages.slice(pageRangeStart - 1, pageRangeEnd);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              P
            </div>
            <div>
              <h1 className="font-bold text-lg">{t.header.title}</h1>
              <p className="text-xs text-slate-500">{t.header.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/guides"
              className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              {language === 'ko' ? '가이드' : 'Guides'}
            </Link>
            <button
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {language === 'ko' ? 'EN' : 'KO'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Privacy Badges */}
        <div className="flex gap-3 justify-center mb-8 flex-wrap">
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
            <Lock size={16} />
            <span className="text-sm font-medium">{t.badges.browserProcessing}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
            <Lock size={16} />
            <span className="text-sm font-medium">{t.badges.noUpload}</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full border border-purple-200">
            <Lock size={16} />
            <span className="text-sm font-medium">{t.badges.completePrivacy}</span>
          </div>
        </div>

        {/* Upload Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.upload.title}</CardTitle>
            <CardDescription>{t.upload.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Quality Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">{t.upload.qualityLabel}</label>
                <span className="text-sm text-blue-600 font-semibold">{quality}%</span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={(val) => setQuality(val[0])}
                min={30}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-slate-500 mt-1">{t.upload.qualityHint}</p>
            </div>

            {/* Output Format Selection - 항상 표시 */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium">{t.upload.outputFormat}</label>
                <span className="text-xs font-semibold text-blue-600 bg-white px-3 py-1 rounded-full border border-blue-200">
                  📁 converted-images-{outputFormat.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="jpg"
                    checked={outputFormat === 'jpg'}
                    onChange={(e) => setOutputFormat(e.target.value as 'jpg' | 'png')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">JPG</span>
                  <span className="text-xs text-slate-500">(작은 파일 크기)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="png"
                    checked={outputFormat === 'png'}
                    onChange={(e) => setOutputFormat(e.target.value as 'jpg' | 'png')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">PNG</span>
                  <span className="text-xs text-slate-500">(투명도 지원)</span>
                </label>
              </div>
              <p className="text-xs text-slate-500 mt-2">{t.upload.formatHint}</p>
            </div>

            {/* Advanced Options */}
            <div className="mb-6 border-t pt-6">
              <button
                type="button"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                <ChevronDown size={16} className={`transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} />
                {t.upload.advancedOptions}
              </button>

              {showAdvancedOptions && (
                <div className="mt-4 space-y-4">
                  {/* Additional advanced options can be added here */}
                </div>
              )}
            </div>

            {/* File Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-300 bg-slate-50 hover:border-slate-400'
              }`}
            >
              <FileImage size={48} className="mx-auto mb-4 text-slate-400" />
              <p className="font-semibold text-slate-700 mb-1">{t.upload.dragDropTitle}</p>
              <p className="text-sm text-slate-500">{t.upload.dragDropHint}</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {/* Progress Bar */}
            {conversionProgress > 0 && (
              <div className="mt-6">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${conversionProgress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  {t.upload.converting} {Math.round(conversionProgress)}%
                </p>
              </div>
            )}

            {/* Select Button */}
            <Button
              onClick={handleSelectClick}
              disabled={isConverting}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
              type="button"
            >
              {isConverting ? (
                <>
                  <Spinner className="mr-2 w-4 h-4" />
                  {t.upload.converting}
                </>
              ) : (
                <>
                  <Upload size={18} className="mr-2" />
                  {t.upload.selectButton}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section - 업로드 영역 바로 아래 */}
        {convertedImages.length > 0 && (
          <div ref={resultsRef}>
            <Card className="mb-8 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900">{t.results.conversionComplete}</CardTitle>
                <CardDescription className="text-green-800">
                  {convertedImages.length} {t.results.imagesReady}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Download All Button */}
                  <Button
                    onClick={handleDownloadAll}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    type="button"
                  >
                    <Download size={18} className="mr-2" />
                    {t.results.downloadAll}
                  </Button>

                  {/* Page Range Selection */}
                  {convertedImages.length > 1 && (
                    <div className="border-t pt-6">
                      <label className="text-sm font-medium block mb-4">{t.results.pageRangeLabel}</label>
                      <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-600">{t.results.showing}</label>
                          <input
                            type="number"
                            min="1"
                            max={convertedImages.length}
                            value={pageRangeStart}
                            onChange={(e) => setPageRangeStart(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-16 px-2 py-1 border border-slate-300 rounded text-sm"
                          />
                          <span className="text-xs text-slate-600">{t.results.of}</span>
                          <input
                            type="number"
                            min="1"
                            max={convertedImages.length}
                            value={pageRangeEnd}
                            onChange={(e) => setPageRangeEnd(Math.min(convertedImages.length, parseInt(e.target.value) || convertedImages.length))}
                            className="w-16 px-2 py-1 border border-slate-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Thumbnails */}
                  <div className="border-t pt-6">
                    <p className="text-sm font-medium mb-4">{t.results.imagePreview}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {displayedImages.map((image) => (
                        <div key={image.pageNumber} className="group relative">
                          <img
                            src={image.url}
                            alt={`${t.results.page} ${image.pageNumber}`}
                            className="w-full h-32 object-cover rounded-lg border border-slate-300 group-hover:border-blue-500 transition-colors"
                          />
                          <button
                            onClick={() => handleDownloadSingle(image)}
                            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            type="button"
                          >
                            <Download size={24} className="text-white" />
                          </button>
                          <p className="text-xs text-slate-600 mt-1 text-center">
                            {t.results.page} {image.pageNumber}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Convert New File */}
                  <Button
                    onClick={handleConvertNew}
                    variant="outline"
                    className="w-full"
                    type="button"
                  >
                    {t.results.convertNewFile}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comparison Section */}
        <Card className="mb-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">{t.comparison.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-800 mb-6">{t.comparison.message}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-200">
                    <th className="text-left py-2 px-4 font-semibold text-yellow-900">{t.comparison.headers.feature}</th>
                    <th className="text-left py-2 px-4 font-semibold text-yellow-900">{t.comparison.headers.general}</th>
                    <th className="text-left py-2 px-4 font-semibold text-yellow-900">{t.comparison.headers.thisTool}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-yellow-100">
                    <td className="py-2 px-4">{t.comparison.features.serverUpload}</td>
                    <td className="py-2 px-4 text-yellow-700">{t.comparison.values.yes}</td>
                    <td className="py-2 px-4 text-green-700 font-semibold">{t.comparison.values.no}</td>
                  </tr>
                  <tr className="border-b border-yellow-100">
                    <td className="py-2 px-4">{t.comparison.features.dailyLimit}</td>
                    <td className="py-2 px-4 text-yellow-700">{t.comparison.values.yes}</td>
                    <td className="py-2 px-4 text-green-700 font-semibold">{t.comparison.values.no}</td>
                  </tr>
                  <tr className="border-b border-yellow-100">
                    <td className="py-2 px-4">{t.comparison.features.registration}</td>
                    <td className="py-2 px-4 text-yellow-700">{t.comparison.values.required}</td>
                    <td className="py-2 px-4 text-green-700 font-semibold">{t.comparison.values.notRequired}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">{t.comparison.features.cost}</td>
                    <td className="py-2 px-4 text-yellow-700">{t.comparison.values.partial}</td>
                    <td className="py-2 px-4 text-green-700 font-semibold">{t.comparison.values.free}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap size={20} className="text-blue-600" />
                {t.features.fastConversion}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{t.features.fastConversionDesc}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={20} className="text-green-600" />
                {t.features.completeSafety}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{t.features.completeSafetyDesc}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-purple-600" />
                {t.features.freeUsage}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{t.features.freeUsageDesc}</p>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.about.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600">
            <p>{t.about.para1}</p>
            <p>{t.about.para2}</p>
            <p>{t.about.para3}</p>
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.howToUse.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 text-sm text-slate-600">
              {[1, 2, 3, 4].map((step) => (
                <li key={step} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white font-semibold rounded-full">{step}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t.howToUse[`step${step}Title` as keyof typeof t.howToUse]}</p>
                    <p className="text-slate-600 mt-1">{t.howToUse[`step${step}Desc` as keyof typeof t.howToUse]}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Content Sections - SEO/신뢰도 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.content.whyConvert.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{t.content.whyConvert.desc}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.content.jpgVsPng.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{t.content.jpgVsPng.desc}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.content.whySafe.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{t.content.whySafe.desc}</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.faq.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="border-b pb-4 last:border-b-0">
                  <p className="font-semibold text-slate-900 mb-2">{t.faq[`q${i}` as keyof typeof t.faq]}</p>
                  <p className="text-sm text-slate-600">{t.faq[`a${i}` as keyof typeof t.faq]}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-sm">{t.footer.copyright}</p>
            <div className="flex gap-6 flex-wrap justify-center">
              <Link href="/guides" className="text-sm hover:text-white transition-colors">
                {language === 'ko' ? '가이드' : 'Guides'}
              </Link>
              <Link href="/jpg-to-pdf" className="text-sm hover:text-white transition-colors">
                JPG to PDF
              </Link>
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="text-sm hover:text-white transition-colors">
                {t.footer.terms}
              </Link>
              <Link href="/contact" className="text-sm hover:text-white transition-colors">
                {t.footer.contact}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
