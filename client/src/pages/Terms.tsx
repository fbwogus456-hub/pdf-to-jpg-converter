import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
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
          <h1 className="text-3xl font-bold text-slate-900">이용약관</h1>
          <p className="text-slate-600 mt-2">마지막 업데이트: 2026년 6월</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8 text-slate-700">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. 서비스 개요</h2>
            <p>
              PDF to JPG(이하 "서비스")는 PDF 파일을 JPG 이미지로 변환하는 온라인 도구입니다. 본 약관은 서비스 이용 시 적용되는 조건을 규정합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. 서비스 이용</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">2.1 이용 자격</h3>
                <p>
                  서비스는 누구나 무료로 이용할 수 있습니다. 다만, 법적으로 계약 능력이 없는 자는 이용할 수 없습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">2.2 이용 제한</h3>
                <p>
                  사용자는 다음 행위를 하면 안 됩니다:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2 ml-2">
                  <li>서비스를 불법적인 목적으로 이용</li>
                  <li>타인의 개인정보를 무단으로 변환</li>
                  <li>저작권이 있는 콘텐츠를 무단으로 변환</li>
                  <li>서비스 시스템을 해킹하거나 방해</li>
                  <li>서비스를 자동화 도구로 대량 이용</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. 파일 처리</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">3.1 파일 보안</h3>
                <p>
                  <strong>서비스는 당신의 PDF 파일을 서버에 저장하지 않습니다.</strong> 모든 변환은 당신의 브라우저에서만 처리되며, 파일은 당신의 기기에만 남습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">3.2 변환 결과</h3>
                <p>
                  변환된 이미지는 임시로 저장되며, 일정 시간 후 자동으로 삭제됩니다. 사용자는 변환 직후 이미지를 다운로드해야 합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">3.3 파일 크기 제한</h3>
                <p>
                  현재 최대 50MB까지의 PDF 파일을 변환할 수 있습니다. 이 제한은 예고 없이 변경될 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. 지적재산권</h2>
            <p>
              서비스의 모든 콘텐츠(로고, 디자인, 코드 등)는 저작권으로 보호됩니다. 사용자는 개인적 사용 목적으로만 서비스를 이용할 수 있으며, 상업적 목적으로 재배포할 수 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. 책임 제한</h2>
            <p>
              서비스는 "있는 그대로" 제공되며, 명시적 또는 암시적 보증이 없습니다. 서비스 이용으로 인한 손실이나 손해에 대해 서비스 제공자는 책임을 지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. 서비스 중단</h2>
            <p>
              서비스 제공자는 다음의 경우 서비스를 중단할 수 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-2">
              <li>시스템 유지보수</li>
              <li>긴급 보안 문제</li>
              <li>기술적 문제</li>
              <li>법적 요청</li>
            </ul>
            <p className="mt-4">가능한 한 사전 공지를 하겠지만, 긴급 상황에서는 사전 공지 없이 중단될 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. 약관 변경</h2>
            <p>
              서비스 제공자는 필요에 따라 본 약관을 변경할 수 있습니다. 중요한 변경 사항은 서비스 내 공지를 통해 알립니다. 변경 후 서비스를 계속 이용하는 것은 변경된 약관에 동의하는 것으로 간주됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. 준거법</h2>
            <p>
              본 약관은 대한민국 법률에 따라 해석되며, 관련 분쟁은 대한민국 법원의 관할을 받습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. 문의</h2>
            <p>
              약관에 관한 문의는 <Link href="/contact" className="text-blue-600 hover:underline">문의 페이지</Link>를 통해 주시기 바랍니다.
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
