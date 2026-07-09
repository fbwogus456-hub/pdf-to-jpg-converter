import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ScanToImage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200/50 backdrop-blur-sm bg-white/80">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/guides">
              <ArrowLeft className="w-4 h-4 mr-2" />
              가이드 목록으로
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">
            스캔한 문서를 안전하게 이미지로 보관하고 공유하는 법
          </h1>
          <p className="text-slate-600 mt-2">
            민감한 문서를 다룰 때 지켜야 할 원칙과 실용적인 팁을 정리했습니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              계약서, 신분증, 증명서처럼 민감한 문서를 스캔해 보관하거나 공유할
              때는 편리함만큼이나 보안이 중요합니다. 잘못 다루면 개인정보가
              유출될 위험이 있기 때문입니다. 스캔 문서를 이미지로 안전하게
              관리하는 방법을 단계별로 살펴봅니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. 어디에서 변환하는지가 중요합니다
            </h2>
            <p>
              온라인 변환 도구 중에는 파일을 자사 서버에 업로드해 처리하는 곳이
              많습니다. 이 경우 민감한 문서가 외부 서버에 잠시라도 저장될 수
              있습니다. 파일을 서버로 보내지 않고 브라우저 안에서만 처리하는
              도구를 선택하면, 문서가 내 기기 밖으로 나가지 않아 훨씬
              안전합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. 필요한 페이지만 변환하세요
            </h2>
            <p>
              여러 장짜리 문서라면 실제로 공유해야 하는 페이지만 골라 변환하는
              것이 좋습니다. 불필요한 개인정보가 담긴 페이지까지 함께 내보내면
              그만큼 노출 위험이 커집니다. 페이지 범위를 지정할 수 있는 도구를
              쓰면 원하는 부분만 깔끔하게 추출할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. 공유 방식과 보관 위치를 점검하세요
            </h2>
            <p>
              이미지를 공유할 때는 링크가 아무나 접근 가능한 상태로 열려 있지
              않은지 확인해야 합니다. 오래 보관해야 하는 문서라면 잠금 기능이
              있는 폴더나 암호화된 저장소를 활용하고, 더 이상 필요 없는 파일은
              기기와 휴지통에서 완전히 삭제하는 습관을 들이는 것이 좋습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. 화질과 파일 크기의 균형
            </h2>
            <p>
              증빙용 문서는 글자가 또렷하게 보여야 하므로 화질을 너무 낮추지
              않는 것이 좋습니다. 다만 화질을 지나치게 높이면 파일이 커져 공유가
              불편해집니다. 텍스트 중심 문서는 선명함을 유지하는 PNG를, 용량이
              중요하다면 적당한 품질의 JPG를 선택하는 식으로 균형을 맞추세요.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              민감한 문서일수록 "어디에서, 어떤 부분만, 어떻게 공유하느냐"를
              신경 쓰는 것만으로도 위험을 크게 줄일 수 있습니다. 브라우저에서만
              처리되는{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              를 사용하면 파일이 서버에 업로드되지 않아 스캔 문서를 안심하고
              변환할 수 있습니다.
            </p>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 bg-slate-50/50 backdrop-blur-sm mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">© 2026 PDF to JPG. 모든 권리 보유.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/guides" className="text-slate-600 hover:text-slate-900 transition-colors">
                가이드
              </Link>
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
