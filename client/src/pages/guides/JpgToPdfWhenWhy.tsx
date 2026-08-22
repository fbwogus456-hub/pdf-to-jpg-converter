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
            JPG를 PDF로 바꿔야 하는 이유: 언제, 왜 필요할까
          </h1>
          <p className="text-slate-600 mt-2">
            이미지 대신 PDF로 제출하거나 공유하는 것이 나은 상황을 실제
            사례와 함께 자세히 알아봅니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              사진이나 스캔 이미지를 그대로 보내도 되는데 굳이 PDF로 바꿀
              이유가 있을까 싶을 수 있습니다. 하지만 문서를 제출하거나
              인쇄하거나 여러 장을 함께 다뤄야 하는 상황에서는 PDF가
              이미지보다 훨씬 안정적이고 전문적입니다. 실제로 많은 기관과
              회사가 이미지 파일 대신 PDF를 요구하는 데는 분명한 이유가
              있습니다. 이 글에서는 어떤 경우에 JPG를 PDF로 바꾸는 것이
              유리한지, 그리고 그때 무엇을 주의해야 하는지 정리합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              여러 장을 하나로 묶을 수 있다
            </h2>
            <p>
              이미지 파일은 기본적으로 한 장씩 따로 존재합니다. 여러 장을
              보내려면 파일을 여러 개 첨부해야 하고, 받는 사람이 순서를
              헷갈리기 쉬우며 일부가 누락될 위험도 있습니다. PDF로 바꾸면
              여러 이미지를 정해진 순서대로 한 개의 문서에 담을 수 있어, 파일
              하나만 주고받으면 됩니다. 계약서나 영수증 묶음, 여러 장의
              증빙 서류처럼 순서가 중요한 자료에 특히 유용합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              어디서 열어도 똑같이 보인다
            </h2>
            <p>
              이미지는 기기나 뷰어, 프로그램에 따라 크기나 회전 상태가 다르게
              보일 수 있습니다. 어떤 기기에서는 옆으로 누워서 열리거나, 화면에
              꽉 차게 확대되어 보이기도 합니다. 반면 PDF는 페이지 크기와
              배치가 문서 안에 고정되어 있어, 컴퓨터든 휴대폰이든 인쇄물이든
              항상 같은 모습으로 표시됩니다. 문서를 제출할 때 "내가 보낸
              그대로 상대방이 본다"는 점은 생각보다 큰 장점입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              제출과 인쇄의 표준 형식이다
            </h2>
            <p>
              관공서, 학교, 회사의 서류 제출은 대부분 PDF를 표준 형식으로
              요구합니다. 온라인 제출 시스템에서 이미지 파일은 아예 받지 않는
              경우도 많습니다. 인쇄할 때도 PDF는 용지 크기와 여백이 지정돼
              있어 의도한 대로 정확히 출력되지만, 이미지는 프로그램에 따라
              잘리거나 크기가 제멋대로 달라질 수 있습니다. 공식적인 자리에서는
              PDF가 사실상의 기본 규격입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              더 전문적으로 보인다
            </h2>
            <p>
              같은 내용이라도 사진 파일 여러 장을 보내는 것보다 잘 정리된 PDF
              한 부를 보내는 편이 훨씬 신뢰감을 줍니다. 이력서에 첨부하는
              포트폴리오, 거래처에 보내는 견적 관련 자료, 학교 과제처럼 상대
              방에게 인상을 남겨야 하는 상황이라면 PDF로 정리하는 것만으로도
              완성도가 올라갑니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              이럴 때는 이미지가 더 나을 수도 있다
            </h2>
            <p>
              물론 항상 PDF가 정답인 것은 아닙니다. SNS에 사진 한 장을
              올리거나, 메신저로 이미지를 빠르게 공유하거나, 이미지를 편집
              프로그램에서 계속 수정해야 하는 경우에는 이미지 형식이 더
              편리합니다. 즉 "제출·인쇄·묶음 보관"이 목적이면 PDF, "빠른
              공유·편집"이 목적이면 이미지로 생각하면 간단합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. JPG를 PDF로 바꾸면 화질이 떨어지나요?
                </h3>
                <p className="mt-1">
                  변환 자체로 원본 이미지의 화질이 크게 손상되지는 않습니다.
                  다만 용지 크기에 맞춰 이미지가 축소되어 배치될 수 있으니,
                  선명함이 중요하다면 고해상도 원본을 사용하는 것이 좋습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 여러 장의 사진을 한 PDF에 넣을 수 있나요?
                </h3>
                <p className="mt-1">
                  네, 여러 이미지를 업로드해 순서를 정하면 하나의 PDF로 묶을
                  수 있습니다. 각 이미지가 PDF의 한 페이지가 됩니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. PNG 이미지도 PDF로 바꿀 수 있나요?
                </h3>
                <p className="mt-1">
                  네, JPG뿐 아니라 PNG 등 일반적인 이미지 형식도 PDF로 변환할
                  수 있습니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              여러 장을 묶어야 하거나, 어디서든 같은 모습으로 보여야 하거나,
              공식 문서로 제출해야 한다면 이미지보다 PDF가 정답입니다. 반대로
              빠른 공유나 편집이 목적이라면 이미지가 낫습니다. 목적에 맞게
              골라 쓰면 됩니다. 지금 바로{" "}
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
