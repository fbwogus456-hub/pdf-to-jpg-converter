import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function JpgToPdfWhenWhy() {
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
            JPG를 PDF로 바꿔야 하는 이유
          </h1>
          <p className="text-slate-600 mt-2">
            이미지 대신 PDF로 제출하거나 공유하는 것이 나은 상황을 알아봅니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              사진이나 스캔 이미지를 그대로 보내도 되는데 굳이 PDF로 바꿀 이유가
              있을까 싶을 수 있습니다. 하지만 문서를 제출하거나 인쇄하거나
              여러 장을 함께 다뤄야 하는 상황에서는 PDF가 이미지보다 훨씬
              안정적입니다. 어떤 경우에 PDF가 유리한지 정리해봤습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              여러 장을 하나로 묶을 수 있다
            </h2>
            <p>
              이미지 파일은 기본적으로 한 장씩 따로 존재합니다. 여러 장을
              보내려면 파일을 여러 개 첨부해야 하고, 받는 사람이 순서를
              헷갈리기 쉽습니다. PDF로 바꾸면 여러 이미지를 정해진 순서대로
              한 개의 문서에 담을 수 있어, 파일 하나만 주고받으면 됩니다.
              계약서나 영수증 묶음처럼 순서가 중요한 자료에 특히 유용합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              어디서 열어도 똑같이 보인다
            </h2>
            <p>
              이미지는 기기나 뷰어에 따라 크기나 회전 상태가 다르게 보일 수
              있습니다. PDF는 페이지 크기와 배치가 고정되어 있어, 컴퓨터든
              휴대폰이든 인쇄물이든 항상 같은 모습으로 표시됩니다. 문서를 제출할
              때 "보낸 그대로 보인다"는 점은 큰 장점입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              제출과 인쇄에 표준으로 쓰인다
            </h2>
            <p>
              관공서, 학교, 회사의 서류 제출은 대부분 PDF를 표준 형식으로
              요구합니다. 이미지 파일은 받지 않는 경우도 많습니다. 또한 인쇄할
              때도 PDF는 용지 크기와 여백이 지정돼 있어 의도한 대로 출력되지만,
              이미지는 프로그램에 따라 잘리거나 크기가 달라질 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              여러 장을 묶어야 하거나, 어디서든 같은 모습으로 보여야 하거나,
              공식 문서로 제출해야 한다면 이미지보다 PDF가 정답입니다. 지금
              바로{" "}
              <Link href="/jpg-to-pdf" className="text-blue-600 hover:underline">
                JPG to PDF 변환 도구
              </Link>
              에서 사진을 PDF 문서로 바꿔보세요. 모든 작업은 브라우저에서만
              처리되어 파일이 서버에 업로드되지 않습니다. 반대로 PDF를
              이미지로 바꿔야 한다면{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              를 이용하세요.
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
