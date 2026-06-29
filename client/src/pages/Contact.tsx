import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Github, AlertCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200/50 backdrop-blur-sm bg-white/80">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">문의</h1>
          <p className="text-slate-600 mt-2">질문이나 피드백이 있으신가요? 언제든지 연락주세요.</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  이메일
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-600">
                  일반적인 문의나 피드백은 이메일로 보내주세요. 가능한 한 빠르게 답변하겠습니다.
                </p>
                <a href="mailto:support@pdf-to-jpg.com" className="text-blue-600 hover:underline font-semibold">
                  support@pdf-to-jpg.com
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-slate-900" />
                  GitHub Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-600">
                  버그 보고나 기능 요청은 GitHub Issues에서 해주세요.
                </p>
                <a href="https://github.com/fbwogus456-hub/pdf-to-jpg-converter/issues" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                  GitHub Issues 열기
                </a>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">자주 묻는 질문</h2>
              <div className="space-y-4">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">응답 시간은 얼마나 되나요?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      일반적으로 24시간 이내에 답변합니다. 주말이나 휴일에는 다소 지연될 수 있습니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">버그를 발견했어요. 어디에 보고하나요?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      GitHub Issues에서 버그를 보고해주세요. 가능하면 재현 방법과 스크린샷을 포함해주면 좋습니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">새로운 기능을 제안하고 싶어요.</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      GitHub Issues에서 기능 요청(Feature Request)을 생성하거나 이메일로 보내주세요. 모든 제안을 검토합니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">서비스가 작동하지 않아요.</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      먼저 브라우저 캐시를 삭제하고 다시 시도해보세요. 그래도 안 되면 이메일로 문의해주세요. 문제 상황을 자세히 설명해주면 도움이 됩니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base">개인정보 요청이나 삭제 요청은?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">
                      개인정보 관련 요청은 이메일로 "개인정보 요청" 또는 "개인정보 삭제"라고 명시하여 보내주세요. 법적 절차에 따라 처리합니다.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Important Notice */}
          <Card className="border-0 shadow-md bg-blue-50 border-l-4 border-blue-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <AlertCircle className="w-5 h-5" />
                중요 안내
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-900">
              <p>
                서비스 이용 중 문제가 발생하면 즉시 문의해주세요. 보안 취약점을 발견한 경우, 공개하지 말고 이메일로 직접 보고해주시기 바랍니다.
              </p>
            </CardContent>
          </Card>

          {/* Contact Form Info */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>문의 시 포함할 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-700">
              <p>더 빠른 해결을 위해 다음 정보를 포함해주세요:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>사용 중인 브라우저와 버전</li>
                <li>운영체제 (Windows, Mac, Linux 등)</li>
                <li>문제가 발생한 PDF 파일의 특성 (크기, 페이지 수 등)</li>
                <li>발생한 오류 메시지 (있다면)</li>
                <li>문제를 재현하는 방법</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 bg-slate-50/50 backdrop-blur-sm mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
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
