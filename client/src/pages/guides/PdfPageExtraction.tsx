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
            원하는 페이지만 골라 깔끔하게 이미지로 만드는 방법을 안내합니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              블로그나 웹페이지에 자료를 인용할 때, PDF 전체가 아니라 특정
              페이지만 필요한 경우가 많습니다. 굳이 전체를 변환해 하나하나
              지우기보다, 처음부터 원하는 페이지만 골라 이미지로 추출하면 훨씬
              효율적입니다. 이 과정을 단계별로 정리했습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. 어떤 페이지가 필요한지 먼저 확인하기
            </h2>
            <p>
              PDF 뷰어에서 문서를 열어 인용하고 싶은 페이지 번호를 미리
              메모해두세요. 예를 들어 12페이지짜리 자료에서 3페이지와 7페이지만
              필요하다면, 그 번호를 기억해두면 변환 과정이 훨씬 빨라집니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. 페이지 범위를 지정해 변환하기
            </h2>
            <p>
              페이지 범위 지정 기능을 지원하는 변환 도구를 사용하면 "3-7" 처럼
              구간을 입력하거나 원하는 페이지만 선택할 수 있습니다. 이렇게 하면
              필요 없는 페이지를 변환하느라 시간을 낭비하지 않고, 결과물도
              깔끔하게 정리됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. 블로그에 맞는 형식과 화질 고르기
            </h2>
            <p>
              글자가 많은 페이지라면 선명함이 유지되는 PNG가, 사진이나 그림이
              많은 페이지라면 가벼운 JPG가 적합합니다. 웹에서는 이미지가 너무
              크면 로딩이 느려지므로, 화면에서 읽기 좋은 수준의 화질로 조절하면
              방문자 경험도 좋아집니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. 저작권과 출처 표시 잊지 않기
            </h2>
            <p>
              다른 사람이 만든 자료의 페이지를 이미지로 가져올 때는 저작권을
              반드시 확인해야 합니다. 인용이 허용되는 자료라도 출처를 함께
              표기하는 것이 좋습니다. 이는 방문자에게 신뢰를 주고, 나중에 발생할
              수 있는 저작권 문제도 예방합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              필요한 페이지만 골라 추출하면 작업 시간도 줄고 결과물도 깔끔해
              집니다. 지금 바로{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              에서 페이지 범위를 지정해 원하는 페이지만 이미지로 만들어보세요.
              모든 작업은 브라우저에서만 처리되어 파일이 안전하게 유지됩니다.
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
