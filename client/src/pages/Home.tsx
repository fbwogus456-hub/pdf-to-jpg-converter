import { useState, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc";
import { Upload, Download, FileImage, Zap, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ConvertedImage {
  pageNumber: number;
  url: string;
  fileSize: number;
}

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [quality, setQuality] = useState(85);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [conversionId, setConversionId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.conversion.uploadAndConvert.useMutation();
  const zipMutation = trpc.conversion.generateZipDownload.useMutation();

  const handleFileSelect = async (file: File) => {
    if (!file.type.includes("pdf")) {
      toast.error("PDF 파일만 업로드할 수 있습니다.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("파일 크기가 50MB를 초과할 수 없습니다.");
      return;
    }

    setIsConverting(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(",")[1];
        const result = await uploadMutation.mutateAsync({
          fileName: file.name,
          fileData: base64,
          quality,
        });

        setConvertedImages(result.images);
        setConversionId(result.conversionId);
        toast.success(`${result.pageCount}개 페이지가 성공적으로 변환되었습니다.`);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("파일 변환 중 오류가 발생했습니다.");
      console.error(error);
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
    link.download = `page-${pageNumber}.jpg`;
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
      toast.success("ZIP 파일이 다운로드되었습니다.");
    } catch (error) {
      toast.error("ZIP 파일 생성 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

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
              <h1 className="text-2xl font-bold text-slate-900">PDF to JPG</h1>
              <p className="text-sm text-slate-500">우아한 변환 도구</p>
            </div>
          </div>
          {user && (
            <div className="text-right">
              <p className="text-sm text-slate-600">{user.name || user.email}</p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {convertedImages.length === 0 ? (
          // Upload Section
          <div className="space-y-8">
            {/* Upload Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">PDF 파일 변환</CardTitle>
                <CardDescription>PDF 파일을 JPG 이미지로 변환하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quality Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">이미지 화질</label>
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
                  <p className="text-xs text-slate-500">높을수록 더 선명하지만 파일 크기가 커집니다</p>
                </div>

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
                        {isDragging ? "여기에 놓으세요" : "PDF 파일을 드래그하세요"}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">또는 아래 버튼으로 선택</p>
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
                      변환 중...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      파일 선택
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">빠른 변환</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">고속 처리로 빠르게 이미지로 변환됩니다</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <FileImage className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">화질 조절</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">1~100% 범위에서 원하는 화질을 선택</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Download className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">일괄 다운로드</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">모든 이미지를 ZIP으로 한 번에 다운로드</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Results Section
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  변환 완료
                </h2>
                <p className="text-slate-600 mt-1">{convertedImages.length}개의 이미지가 준비되었습니다</p>
              </div>
              <Button
                onClick={() => {
                  setConvertedImages([]);
                  setConversionId(null);
                }}
                variant="outline"
                className="text-slate-600 hover:text-slate-900"
              >
                새 파일 변환
              </Button>
            </div>

            {/* Download Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleDownloadZip}
                disabled={zipMutation.isPending}
                className="flex-1 h-11 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg"
              >
                {zipMutation.isPending ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    준비 중...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    모두 ZIP으로 다운로드
                  </>
                )}
              </Button>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">이미지 미리보기</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {convertedImages.map((image) => (
                  <Card key={image.pageNumber} className="border-0 shadow-md hover:shadow-lg transition-all overflow-hidden group">
                    <div className="relative bg-slate-100 aspect-[4/5] overflow-hidden">
                      <img
                        src={image.url}
                        alt={`Page ${image.pageNumber}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          onClick={() => handleDownloadImage(image.url, image.pageNumber)}
                          size="sm"
                          className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          다운로드
                        </Button>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-sm text-slate-600">페이지 {image.pageNumber}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {(image.fileSize / 1024).toFixed(1)} KB
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
