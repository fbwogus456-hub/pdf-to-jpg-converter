import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PdfPageExtraction() {
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
            블로그용으로 PDF 특정 페이지만 이미지로 추출하는 법
          </h1>
          <p className="text-slate-600 mt-2">
            원하는 페이지만 골라 깔끔하게 이미지로 만드는 방법을 단계별로,
            실전 팁과 함께 안내합니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              블로그나 웹페이지에 자료를 인용할 때, PDF 전체가 아니라 특정
              페이지 한두 장만 필요한 경우가 많습니다. 리포트의 핵심 도표
              하나, 매뉴얼의 특정 설명 페이지, 자료집의 인용 부분처럼요. 이럴
              때 전체를 변환한 뒤 필요 없는 이미지를 하나하나 지우는 것은
              비효율적입니다. 처음부터 원하는 페이지만 골라 이미지로 추출하면
              시간도 아끼고 결과물도 깔끔합니다. 이 글에서는 그 과정을
              단계별로 정리하고, 블로그에 넣을 때 유의할 점까지 함께
              살펴봅니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. 어떤 페이지가 필요한지 먼저 확인하기
            </h2>
            <p>
              PDF 뷰어에서 문서를 열어 인용하고 싶은 페이지 번호를 미리
              메모해두세요. 예를 들어 12페이지짜리 자료에서 3페이지와
              7페이지만 필요하다면, 그 번호를 기억해두면 변환 과정이 훨씬
              빨라집니다. 목차가 있는 문서라면 목차에서 원하는 내용의 페이지를
              빠르게 찾을 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. 원하는 페이지만 변환하기
            </h2>
            <p>
              페이지 범위 지정을 지원하는 변환 도구를 사용하면 특정 구간이나
              원하는 페이지만 골라 변환할 수 있습니다. 이렇게 하면 필요 없는
              페이지를 변환하느라 시간을 낭비하지 않고, 결과물도 정리된 상태로
              얻을 수 있습니다. 만약 범위 지정 기능이 없다면 전체를 변환한 뒤
              필요한 이미지만 남기고 나머지를 삭제하면 됩니다. 다만 개인정보가
              담긴 문서라면 처음부터 필요한 페이지만 변환하는 편이 안전합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. 블로그에 맞는 형식과 화질 고르기
            </h2>
            <p>
              글자가 많은 페이지라면 선명함이 유지되는 PNG가, 사진이나 그림이
              많은 페이지라면 가벼운 JPG가 적합합니다. 웹에서는 이미지가 너무
              크면 페이지 로딩이 느려져 방문자가 이탈할 수 있으므로, 화면에서
              읽기 좋은 수준의 화질로 조절하는 것이 좋습니다. 보통 블로그
              본문 폭에 맞는 크기라면 지나치게 높은 화질이 필요하지 않습니다.
              형식 선택이 고민된다면{" "}
              <Link
                href="/guides/jpg-vs-png"
                className="text-blue-600 hover:underline"
              >
                JPG vs PNG 가이드
              </Link>
              를 참고하세요.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. 이미지를 보기 좋게 다듬기
            </h2>
            <p>
              추출한 이미지를 블로그에 바로 올리기 전에, 여백이 너무 넓거나
              불필요한 부분이 있다면 간단히 잘라내면 훨씬 깔끔합니다. 캡션을
              달아 어떤 자료의 몇 페이지인지 알려주면 방문자가 맥락을 이해하기
              쉽고, 이미지에 대체 텍스트(alt)를 넣으면 검색 노출과 접근성에도
              도움이 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. 저작권과 출처 표시 잊지 않기
            </h2>
            <p>
              다른 사람이 만든 자료의 페이지를 이미지로 가져올 때는 저작권을
              반드시 확인해야 합니다. 인용이 허용되는 자료라도 출처를 함께
              표기하는 것이 원칙입니다. 이는 방문자에게 신뢰를 주고, 나중에
              발생할 수 있는 저작권 분쟁도 예방합니다. 상업적으로 이용할
              계획이라면 저작권자의 허락을 받았는지 특히 꼼꼼히 확인해야
              합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 특정 페이지만 골라서 변환할 수 있나요?
                </h3>
                <p className="mt-1">
                  페이지 범위 지정을 지원하는 도구라면 원하는 페이지만 골라
                  변환할 수 있습니다. 그렇지 않은 경우 전체를 변환한 뒤 필요한
                  이미지만 남기면 됩니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 표나 도표는 어떤 형식이 좋나요?
                </h3>
                <p className="mt-1">
                  선이 또렷해야 하는 표나 도표는 PNG가 선명하게 나옵니다.
                  글자가 작을수록 PNG가 유리합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 이미지가 흐릿하게 나올 때는?
                </h3>
                <p className="mt-1">
                  화질 설정을 높여 변환하거나, 원본 PDF의 해상도가 충분한지
                  확인해보세요. 원본이 저해상도라면 변환 후에도 선명해지지
                  않습니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              필요한 페이지만 골라 추출하면 작업 시간도 줄고 결과물도 깔끔해
              집니다. 형식과 화질을 용도에 맞게 고르고 출처까지 챙기면 블로그
              완성도가 한층 올라갑니다. 지금 바로{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              에서 원하는 페이지를 이미지로 만들어보세요. 모든 작업은
              브라우저에서만 처리되어 파일이 안전하게 유지됩니다.
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
