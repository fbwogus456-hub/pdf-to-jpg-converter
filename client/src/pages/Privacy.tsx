import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200/50 backdrop-blur-sm bg-white/80">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">개인정보처리방침</h1>
          <p className="text-slate-600 mt-2">마지막 업데이트: 2026년 6월</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8 text-slate-700">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. 개요</h2>
            <p>
              PDF to JPG(이하 "서비스")는 사용자의 개인정보를 소중히 여기며, 관련 법령을 준수합니다. 본 개인정보처리방침은 서비스 이용 시 개인정보가 어떻게 수집, 이용, 보관되는지 설명합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. 수집하는 정보</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">2.1 직접 수집하는 정보</h3>
                <p>
                  서비스는 최소한의 정보만 수집합니다. 사용자가 계정을 생성하는 경우, 이름과 이메일 주소를 수집할 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">2.2 자동으로 수집되는 정보</h3>
                <p>
                  서비스 이용 시 다음 정보가 자동으로 수집될 수 있습니다:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2 ml-2">
                  <li>IP 주소</li>
                  <li>브라우저 종류 및 버전</li>
                  <li>접속 시간 및 이용 기록</li>
                  <li>쿠키 정보</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">2.3 PDF 파일에 대한 중요 안내</h3>
                <p>
                  <strong>서비스는 당신의 PDF 파일을 서버에 업로드하거나 저장하지 않습니다.</strong> 모든 변환 작업은 당신의 브라우저에서만 처리되며, 파일 데이터는 당신의 기기에만 남습니다. 이는 기밀 문서나 민감한 정보를 안전하게 처리할 수 있음을 의미합니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. 정보 이용</h2>
            <p>수집된 정보는 다음 목적으로만 이용됩니다:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-2">
              <li>서비스 제공 및 개선</li>
              <li>사용자 지원 및 문의 응답</li>
              <li>서비스 이용 통계 분석</li>
              <li>보안 및 부정 행위 방지</li>
              <li>법적 의무 준수</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. 쿠키 및 추적 기술</h2>
            <p>
              서비스는 사용자 경험 개선을 위해 쿠키를 사용할 수 있습니다. 쿠키는 사용자의 브라우저에 저장되는 작은 텍스트 파일입니다. 사용자는 브라우저 설정을 통해 쿠키 사용을 거부할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. 광고 및 분석</h2>
            <p>
              서비스는 Google AdSense를 통해 광고를 표시합니다. Google은 사용자의 관심사에 맞는 광고를 제공하기 위해 쿠키 및 기타 추적 기술을 사용할 수 있습니다. Google의 개인정보처리방침은 <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">여기</a>에서 확인할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. 정보 보안</h2>
            <p>
              서비스는 사용자 정보를 보호하기 위해 적절한 기술적, 관리적 조치를 취합니다. 그러나 인터넷 전송 중 완벽한 보안을 보장할 수 없습니다. 사용자는 자신의 계정 정보를 안전하게 관리할 책임이 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. 제3자 공유</h2>
            <p>
              서비스는 사용자의 개인정보를 제3자와 공유하지 않습니다. 단, 법적 요청이나 서비스 운영에 필수적인 경우는 예외입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. 사용자 권리</h2>
            <p>
              사용자는 다음과 같은 권리를 가집니다:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-2">
              <li>개인정보 열람 요청</li>
              <li>개인정보 수정 요청</li>
              <li>개인정보 삭제 요청</li>
              <li>개인정보 이용 동의 철회</li>
            </ul>
            <p className="mt-4">이러한 요청은 문의 페이지를 통해 제출할 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. 정책 변경</h2>
            <p>
              서비스는 필요에 따라 본 개인정보처리방침을 변경할 수 있습니다. 중요한 변경 사항은 서비스 내 공지 또는 이메일을 통해 알립니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. 문의</h2>
            <p>
              개인정보 처리에 관한 문의나 요청은 <Link href="/contact" className="text-blue-600 hover:underline">문의 페이지</Link>를 통해 주시기 바랍니다.
            </p>
          </section>
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
