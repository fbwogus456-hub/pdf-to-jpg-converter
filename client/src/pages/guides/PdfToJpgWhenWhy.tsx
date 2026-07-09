import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PdfToJpgWhenWhy() {
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
            PDF를 JPG로 변환해야 하는 5가지 상황
          </h1>
          <p className="text-slate-600 mt-2">
            언제, 왜 PDF를 이미지로 바꿔야 하는지 실제 사례로 알아봅니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              PDF는 문서를 원본 그대로 보존하기에 훌륭한 형식이지만, 모든 상황에
              적합한 것은 아닙니다. 특히 이미지 형태가 필요한 경우에는 PDF보다
              JPG가 훨씬 다루기 편합니다. 아래에서는 실제로 사람들이 PDF를 JPG로
              변환하게 되는 대표적인 상황들을 정리했습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. SNS나 메신저로 문서를 공유할 때
            </h2>
            <p>
              카카오톡, 인스타그램, 라인 같은 플랫폼은 PDF 미리보기를 제대로
              지원하지 않는 경우가 많습니다. 상대방이 파일을 일일이 열어봐야 하고,
              모바일에서는 앱이 없으면 아예 열리지 않기도 합니다. PDF를 JPG로
              변환하면 이미지 한 장으로 바로 보여줄 수 있어 강의 자료나 회의
              내용을 훨씬 빠르게 전달할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. 블로그나 웹사이트에 문서 내용을 넣을 때
            </h2>
            <p>
              블로그 글이나 웹페이지에 PDF를 그대로 삽입하면 로딩이 느리고
              디자인과 어울리지 않습니다. 필요한 페이지만 JPG로 추출해서 이미지로
              넣으면 글의 흐름을 방해하지 않으면서 원하는 내용을 그대로 보여줄 수
              있습니다. 전자책이나 자료집의 특정 페이지를 인용할 때 특히
              유용합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. 모바일에서 문서를 편하게 보고 싶을 때
            </h2>
            <p>
              계약서나 증빙 서류 같은 PDF를 스마트폰에서 확인하려면 확대·축소가
              번거롭고 앱을 열어야 하는 불편이 있습니다. 이미지로 변환해두면
              갤러리에서 바로 열어볼 수 있고, 필요한 부분을 손쉽게 확대해서 볼 수
              있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. 포트폴리오나 디자인 시안을 제출할 때
            </h2>
            <p>
              온라인 지원 시스템 중에는 PDF 업로드를 지원하지 않고 이미지
              파일만 받는 곳이 있습니다. 포트폴리오나 디자인 시안을 JPG로
              변환해두면 어떤 제출 양식에도 유연하게 대응할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. 문서 내용을 이미지 편집 도구에서 활용할 때
            </h2>
            <p>
              포토샵이나 캔바 같은 이미지 편집 도구는 PDF를 직접 불러오기
              어렵거나 제한이 많습니다. JPG로 변환하면 자유롭게 자르고, 텍스트를
              올리고, 다른 디자인 요소와 합칠 수 있어 활용 폭이 훨씬 넓어집니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              PDF는 보관과 인쇄에 강하고, JPG는 공유와 편집에 강합니다. 상황에
              따라 알맞은 형식을 선택하는 것이 중요합니다. 위와 같은 상황이라면
              지금 바로{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              에서 무료로 변환해보세요. 모든 작업은 브라우저에서만 처리되므로
              파일이 서버에 업로드되지 않아 안전합니다.
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
