import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PdfPageSizeOrientation() {
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
            PDF 만들 때 용지 크기와 방향 고르는 법
          </h1>
          <p className="text-slate-600 mt-2">
            A4와 Letter, 세로와 가로 중 상황에 맞는 설정을 고르는 기준을 알아봅니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              이미지를 PDF로 변환할 때 용지 크기와 페이지 방향을 어떻게
              설정하느냐에 따라 결과물의 느낌이 크게 달라집니다. 같은 사진이라도
              세로로 넣으면 위아래 여백이 커지고, 가로로 넣으면 꽉 차 보일 수
              있습니다. 몇 가지 기준만 알아두면 인쇄하거나 제출할 때 어색함
              없는 문서를 만들 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              A4와 Letter의 차이
            </h2>
            <p>
              A4는 한국을 포함한 대부분의 나라에서 쓰는 표준 용지로, 세로가
              조금 더 길쭉합니다. Letter는 주로 미국과 캐나다에서 쓰는 규격으로
              A4보다 약간 짧고 넓습니다. 국내에서 인쇄하거나 제출할 문서라면
              A4를, 미국 기관에 제출하는 서류라면 Letter를 고르는 것이 안전합니다.
              어느 쪽인지 확신이 없다면 A4가 무난한 기본값입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              세로와 가로, 언제 무엇을
            </h2>
            <p>
              세로(포트레이트)는 일반 문서, 세로로 긴 사진, 텍스트가 많은
              자료에 어울립니다. 대부분의 서류는 세로가 기본입니다. 반면
              가로(랜드스케이프)는 옆으로 긴 사진, 표나 도표, 가로로 촬영한
              풍경 사진처럼 폭이 넓은 이미지에 적합합니다. 가로 이미지를 세로
              용지에 넣으면 위아래 여백이 지나치게 커지므로, 이럴 때 가로로
              바꾸면 이미지가 페이지를 더 알차게 채웁니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              이미지 크기에 맞춤 옵션
            </h2>
            <p>
              용지 규격을 정하지 않고 이미지 원본 비율을 그대로 살리고 싶다면
              "이미지 크기에 맞춤"을 고르면 됩니다. 이 경우 페이지가 이미지
              비율을 따라가므로 여백이 거의 생기지 않습니다. 인쇄보다는 화면으로
              보거나 이미지 자체를 온전히 담아야 할 때 유용합니다. 다만 이
              모드에서는 페이지 방향이 이미지에 따라 자동으로 결정됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              정리하면 국내 문서는 A4, 미국 서류는 Letter, 일반 자료는 세로,
              넓은 이미지는 가로, 원본 비율 유지는 "이미지 크기에 맞춤"이
              기준입니다. 설정을 바꿔가며 미리보기로 확인한 뒤 생성하면
              실수를 줄일 수 있습니다. 지금 바로{" "}
              <Link href="/jpg-to-pdf" className="text-blue-600 hover:underline">
                JPG to PDF 변환 도구
              </Link>
              에서 용지와 방향을 설정해 변환해보세요. 모든 작업은 브라우저에서만
              처리되어 파일이 서버에 업로드되지 않습니다.
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
