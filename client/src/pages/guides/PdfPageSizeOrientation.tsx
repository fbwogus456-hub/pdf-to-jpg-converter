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
            A4와 Letter, 세로와 가로 중 상황에 맞는 설정을 고르는 기준을
            실제 사례와 함께 자세히 알아봅니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              이미지를 PDF로 변환할 때 용지 크기와 페이지 방향을 어떻게
              설정하느냐에 따라 결과물의 완성도가 크게 달라집니다. 같은
              사진이라도 세로로 넣으면 위아래 여백이 커지고, 가로로 넣으면
              페이지를 꽉 채울 수 있습니다. 국내에서 인쇄할 문서인지 해외에
              제출할 서류인지에 따라 용지 규격도 달라집니다. 몇 가지 기준만
              알아두면 인쇄하거나 제출할 때 어색함 없는 문서를 만들 수
              있습니다. 이 글에서는 각 설정이 무엇을 의미하고 언제 어떤 것을
              골라야 하는지 구체적으로 정리합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              A4와 Letter, 무엇이 다를까
            </h2>
            <p>
              A4는 한국을 포함한 대부분의 나라에서 표준으로 쓰는 용지입니다.
              가로 210mm, 세로 297mm로, 우리가 흔히 쓰는 프린터 용지와
              문서 양식이 모두 이 규격에 맞춰져 있습니다. Letter는 주로
              미국과 캐나다에서 쓰는 규격으로 가로 215.9mm, 세로 279.4mm
              입니다. A4보다 폭이 조금 더 넓고 길이는 조금 더 짧습니다.
            </p>
            <p className="mt-4">
              선택 기준은 간단합니다. 국내에서 인쇄하거나 국내 기관에 제출할
              문서라면 A4를, 미국이나 캐나다 기관에 제출할 서류라면 Letter를
              고르면 됩니다. 규격이 맞지 않으면 인쇄 시 여백이 어긋나거나
              내용이 잘릴 수 있으니, 제출처의 요구 규격을 확인하는 것이
              안전합니다. 어느 쪽인지 확신이 없다면 A4가 무난한 기본값입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              세로와 가로, 언제 무엇을 고를까
            </h2>
            <p>
              세로(포트레이트)는 위아래로 긴 방향으로, 일반 문서·세로로 긴
              사진·텍스트가 많은 자료에 어울립니다. 대부분의 서류는 세로가
              기본이며, 계약서나 보고서, 편지, 세로로 촬영한 인물 사진 등이
              여기에 해당합니다.
            </p>
            <p className="mt-4">
              가로(랜드스케이프)는 좌우로 긴 방향으로, 옆으로 긴 사진·표나
              도표·가로로 촬영한 풍경 사진처럼 폭이 넓은 이미지에 적합합니다.
              가로로 찍은 사진을 세로 용지에 넣으면 위아래 여백이 지나치게
              커져 어색해 보이는데, 이럴 때 가로로 바꾸면 이미지가 페이지를
              훨씬 알차게 채웁니다. 발표 자료나 넓은 스프레드시트 캡처도
              가로가 잘 어울립니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              "이미지 크기에 맞춤" 옵션은 언제 쓸까
            </h2>
            <p>
              용지 규격을 정하지 않고 이미지 원본 비율을 그대로 살리고 싶다면
              "이미지 크기에 맞춤"을 고르면 됩니다. 이 경우 페이지가 이미지
              비율을 그대로 따라가므로 여백이 거의 생기지 않습니다. 인쇄보다는
              화면으로 보거나, 이미지 자체를 온전히 담는 것이 중요한 경우에
              유용합니다.
            </p>
            <p className="mt-4">
              특히 세로 사진과 가로 사진이 섞여 있는 경우에 편리합니다. 고정
              용지를 쓰면 어떤 사진은 여백이 크고 어떤 사진은 꽉 차는 등
              들쭉날쭉해지지만, "이미지 크기에 맞춤"은 각 페이지를 이미지에
              맞춰 자동으로 만들어주기 때문입니다. 다만 이 모드에서는 페이지
              방향이 이미지에 따라 자동 결정되므로, 세로·가로를 직접 지정할
              수는 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              상황별 추천 설정
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  국내 서류 제출
                </h3>
                <p className="mt-1">A4 + 세로. 가장 표준적이고 안전한 조합입니다.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  가로로 찍은 풍경 사진 모음
                </h3>
                <p className="mt-1">
                  A4 + 가로. 여백을 줄이고 사진을 크게 담을 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  세로·가로가 섞인 사진 앨범
                </h3>
                <p className="mt-1">
                  이미지 크기에 맞춤. 각 사진의 비율을 그대로 살립니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  미국 기관 제출 서류
                </h3>
                <p className="mt-1">Letter + 세로. 현지 표준 규격에 맞춥니다.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              미리보기로 확인하는 습관
            </h2>
            <p>
              설정을 바꿔가며 미리보기로 첫 페이지가 어떻게 나올지 확인한 뒤
              생성하면 실수를 크게 줄일 수 있습니다. 특히 방향을 잘못 골라
              이미지가 작게 들어가거나 여백이 과도하게 생기는 경우를 미리
              방지할 수 있습니다. 몇 초만 투자해 미리보기를 확인하는 것이
              여러 번 다시 만드는 것보다 훨씬 효율적입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              정리하면 국내 문서는 A4, 미국 서류는 Letter, 일반 자료는 세로,
              넓은 이미지는 가로, 원본 비율 유지는 "이미지 크기에 맞춤"이
              기준입니다. 설정을 바꿔가며 미리보기로 확인한 뒤 생성하면 원하는
              결과를 정확히 얻을 수 있습니다. 지금 바로{" "}
              <Link href="/jpg-to-pdf" className="text-blue-600 hover:underline">
                JPG to PDF 변환 도구
              </Link>
              에서 용지와 방향을 설정해 변환해보세요. 여러 장을 하나로 묶는
              방법이 궁금하다면{" "}
              <Link
                href="/guides/combine-images-to-pdf"
                className="text-blue-600 hover:underline"
              >
                여러 장의 사진을 하나의 PDF로 합치기
              </Link>
              가이드도 함께 참고하세요.
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
