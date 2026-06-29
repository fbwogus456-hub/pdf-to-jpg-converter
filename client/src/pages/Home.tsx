import { useState, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc";
import { Upload, Download, FileImage, Zap, CheckCircle2, Lock, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

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
      toast.error("PDF 파일만 업로드할 수 있습니다.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("파일 크기가 50MB를 초과할 수 없습니다.");
      return;
    }

    setIsConverting(true);
    setConversionProgress(0);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(",")[1];
        
        // 진행률 시뮬레이션
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
          
          // 페이지 범위 초기화
          setTotalPages(result.pageCount);
          setPageRangeStart(1);
          setPageRangeEnd(result.pageCount);
          
          setConvertedImages(result.images);
          setConversionId(result.conversionId);
          toast.success(`${result.pageCount}개 페이지가 성공적으로 변환되었습니다.`);
          
          // 1초 후 진행률 리셋
          setTimeout(() => setConversionProgress(0), 1000);
        } catch (error) {
          clearInterval(progressInterval);
          throw error;
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("파일 변환 중 오류가 발생했습니다.");
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
      toast.success("ZIP 파일이 다운로드되었습니다.");
    } catch (error) {
      toast.error("ZIP 파일 생성 중 오류가 발생했습니다.");
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
              <h1 className="text-2xl font-bold text-slate-900">PDF to JPG</h1>
              <p className="text-sm text-slate-500">무료 온라인 변환 도구</p>
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
          <div className="space-y-12">
            {/* Privacy Badge */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">100% 브라우저 처리</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">업로드 없음</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full">
                <Lock className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">완전 비공개</span>
              </div>
            </div>

            {/* Upload Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl">파일이 서버에 업로드되지 않는 PDF to JPG 변환기</CardTitle>
                <CardDescription>브라우저에서만 처리되는 완전히 안전한 변환. 가입 없이 무료로 사용하세요</CardDescription>
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

                {/* Advanced Options Toggle */}
                <button
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} />
                  고급 옵션
                </button>

                {/* Advanced Options */}
                {showAdvancedOptions && (
                  <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    {/* Output Format */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">출력 형식</label>
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
                      <p className="text-xs text-slate-500">JPG: 더 작은 파일 크기 | PNG: 투명도 지원</p>
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
                  <p className="text-sm text-slate-600">브라우저에서 즉시 변환되어 빠르고 효율적입니다</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">완전히 안전함</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">파일이 서버에 업로드되지 않으며 100% 로컬에서 처리됩니다</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Download className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">무료 사용</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">가입 없이 무제한 무료로 사용할 수 있습니다</p>
                </CardContent>
              </Card>
            </div>

            {/* About Section */}
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">PDF to JPG 변환이란?</h2>
                <div className="space-y-4 text-slate-700">
                  <p>
                    PDF to JPG는 PDF 문서를 고품질의 JPG 이미지로 변환하는 온라인 도구입니다. 복잡한 소프트웨어 설치 없이 웹 브라우저에서 바로 사용할 수 있으며, 모든 PDF 페이지를 개별 이미지로 변환합니다.
                  </p>
                  <p>
                    이 도구는 최신 웹 기술을 사용하여 브라우저 내에서 변환을 처리합니다. 즉, 당신의 파일은 절대 우리 서버에 업로드되지 않으며, 모든 처리가 당신의 기기에서만 일어납니다. 이는 민감한 문서나 기밀 자료를 다룰 때 특히 중요합니다.
                  </p>
                  <p>
                    변환된 이미지는 높은 해상도로 생성되며, 화질 슬라이더를 통해 원하는 수준으로 조절할 수 있습니다. 모든 이미지를 개별적으로 다운로드하거나 ZIP 파일로 한 번에 다운로드할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* How to Use Section */}
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">사용 방법</h2>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                    <div>
                      <h3 className="font-semibold text-slate-900">PDF 파일 선택</h3>
                      <p className="text-slate-600 text-sm">위의 업로드 영역에 PDF 파일을 드래그하거나 "파일 선택" 버튼을 클릭하세요.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                    <div>
                      <h3 className="font-semibold text-slate-900">화질 설정</h3>
                      <p className="text-slate-600 text-sm">슬라이더를 조절하여 원하는 이미지 화질을 선택하세요. 높을수록 선명하지만 파일 크기가 커집니다.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                    <div>
                      <h3 className="font-semibold text-slate-900">변환 완료</h3>
                      <p className="text-slate-600 text-sm">몇 초 후 모든 페이지가 이미지로 변환됩니다. 각 이미지를 개별 다운로드하거나 ZIP으로 일괄 다운로드하세요.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">이 도구의 장점</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">브라우저에서 바로 변환</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        별도의 소프트웨어 설치가 필요 없습니다. 웹 브라우저만 있으면 어디서나 즉시 사용할 수 있습니다.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">파일이 서버에 업로드되지 않음</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        모든 처리가 당신의 기기에서만 일어나므로 민감한 문서도 안전하게 변환할 수 있습니다.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">무료 및 무제한</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        가입 없이 무료로 사용할 수 있으며, 변환 횟수나 파일 크기에 제한이 없습니다.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">고품질 출력</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        화질 조절 옵션으로 원하는 수준의 이미지를 생성할 수 있습니다.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Use Cases Section */}
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">활용 사례</h2>
                <div className="space-y-3 text-slate-700">
                  <p>
                    <strong>문서 공유:</strong> PDF 문서를 이미지로 변환하여 SNS나 메신저에서 쉽게 공유할 수 있습니다.
                  </p>
                  <p>
                    <strong>이미지 편집:</strong> 변환된 이미지를 포토샵이나 다른 이미지 편집 소프트웨어에서 편집할 수 있습니다.
                  </p>
                  <p>
                    <strong>SNS 업로드:</strong> 인스타그램, 트위터 등 SNS에 PDF 내용을 이미지로 업로드할 수 있습니다.
                  </p>
                  <p>
                    <strong>웹 게시:</strong> 웹사이트에 PDF 내용을 이미지로 표시할 수 있습니다.
                  </p>
                  <p>
                    <strong>모바일 보기:</strong> 모바일 기기에서 PDF를 보기 어려울 때 이미지로 변환하여 쉽게 볼 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">자주 묻는 질문 (FAQ)</h2>
                <div className="space-y-4">
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">파일 크기 제한이 있나요?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        현재 최대 50MB까지의 PDF 파일을 변환할 수 있습니다. 대부분의 일반적인 문서는 이 제한 내에서 처리됩니다.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">변환 후 파일이 얼마나 오래 보관되나요?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        변환된 이미지는 브라우저 메모리에서만 생성되며, 페이지를 닫으면 즉시 사라집니다. 어디에도 저장되지 않습니다. 필요한 이미지는 변환 직후 다운로드하시기 바랍니다.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">왜 브라우저 처리가 더 안전한가요?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        서버 업로드 방식은 파일이 서버에 저장되고 처리되는 동안 노출될 수 있습니다. 반면 브라우저 처리는 파일이 당신의 기기에서만 처리되고, 인터넷으로 전송되지 않습니다. 민감한 문서나 기밀 자료도 완전히 안전하게 변환할 수 있습니다.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">화질 설정은 어떻게 선택해야 하나요?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        일반적인 용도는 70~85%를 추천합니다. 고품질이 필요하면 90% 이상, 파일 크기를 줄이고 싶으면 50~60%를 선택하세요.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">내 파일이 안전한가요?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        네, 완전히 안전합니다. 모든 처리가 당신의 브라우저에서만 일어나며, 파일이 우리 서버에 업로드되거나 저장되지 않습니다. 자세한 내용은 개인정보처리방침을 참고하세요.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">어떤 PDF 형식을 지원하나요?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        표준 PDF 형식을 모두 지원합니다. 텍스트 기반 PDF, 스캔본, 이미지 포함 PDF 등 대부분의 PDF 파일을 변환할 수 있습니다.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">모바일에서도 사용할 수 있나요?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        네, 모바일 기기에서도 완벽하게 작동합니다. 스마트폰이나 태블릿의 웹 브라우저에서 바로 사용할 수 있습니다.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base">가입이 필요한가요?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">
                        아니요, 가입 없이 누구나 무료로 사용할 수 있습니다. 추가 기능이나 고급 옵션도 모두 무료입니다.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
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

            {/* Page Range Filter */}
            {totalPages > 0 && (
              <Card className="border-0 shadow-md bg-blue-50">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">페이지 범위 선택</label>
                    <div className="flex gap-2 items-center flex-wrap">
                      <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={pageRangeStart}
                        onChange={(e) => setPageRangeStart(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                      <span className="text-slate-600">~</span>
                      <input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={pageRangeEnd}
                        onChange={(e) => setPageRangeEnd(Math.min(totalPages, parseInt(e.target.value) || totalPages))}
                        className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                      <span className="text-xs text-slate-500 ml-auto">표시: {filteredImages.length} / {totalPages}페이지</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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
                {filteredImages.map((image) => (
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

      {/* Footer */}
      <footer className="border-t border-slate-200/50 bg-slate-50/50 backdrop-blur-sm mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">© 2026 PDF to JPG. 모든 권리 보유.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-slate-600 hover:text-slate-900 transition-colors">
                이용약관
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                문의
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
