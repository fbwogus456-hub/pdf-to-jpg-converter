import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function JpgVsPng() {
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
            JPG vs PNG: 언제 무엇을 써야 할까? 완벽 가이드
          </h1>
          <p className="text-slate-600 mt-2">
            두 이미지 형식의 차이를 원리부터 실제 사례까지 깊이 있게 알아보고,
            상황별로 올바른 형식을 고르는 기준을 정리했습니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              이미지를 저장하거나 변환할 때 우리는 거의 매번 JPG와 PNG 중
              하나를 고르게 됩니다. 스마트폰으로 찍은 사진, 캡처한 화면,
              디자인 파일, 스캔한 문서까지 대부분 이 두 형식으로 저장됩니다.
              겉보기엔 둘 다 "그림 파일"이라 비슷해 보이지만, 내부적으로
              압축하는 방식이 완전히 달라서 잘못 고르면 파일이 불필요하게
              커지거나 중요한 화질이 손상될 수 있습니다. 이 글에서는 두
              형식이 어떻게 다른지 원리부터 설명하고, 실제 상황별로 무엇을
              써야 하는지 구체적인 기준을 제시합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              JPG와 PNG는 근본적으로 무엇이 다른가
            </h2>
            <p>
              가장 큰 차이는 "압축 방식"입니다. JPG는 손실 압축(lossy
              compression)을, PNG는 무손실 압축(lossless compression)을
              사용합니다. 손실 압축은 사람 눈이 잘 구분하지 못하는 색상
              정보를 과감히 버려서 파일 크기를 크게 줄입니다. 반대로 무손실
              압축은 원본 데이터를 하나도 버리지 않고 그대로 보존하면서
              크기만 줄이기 때문에, 화질 저하가 전혀 없는 대신 파일이 더
              큽니다.
            </p>
            <p className="mt-4">
              쉽게 비유하면, JPG는 "요약본"이고 PNG는 "원본 복사"입니다.
              요약본은 가볍게 들고 다니기 좋지만 요약하는 과정에서 세부
              정보가 조금 사라집니다. 원본 복사는 무겁지만 내용이 하나도
              빠지지 않습니다. 이 차이가 두 형식의 모든 장단점을 결정합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              JPG의 특징과 장단점
            </h2>
            <p>
              JPG(JPEG)는 색상이 많고 미묘한 그라데이션이 있는 이미지, 즉
              사진에 최적화되어 있습니다. 하늘, 피부, 풍경처럼 색이 자연스럽게
              이어지는 이미지에서 손실 압축의 단점이 거의 눈에 띄지 않으면서
              파일 크기는 크게 줄어듭니다. 그래서 같은 사진을 PNG로 저장하면
              5MB인데 JPG로는 800KB 정도로 줄어드는 일이 흔합니다.
            </p>
            <p className="mt-4">
              다만 두 가지 뚜렷한 한계가 있습니다. 첫째, 저장할 때마다
              화질이 조금씩 손실됩니다. JPG를 열어서 편집하고 다시 저장하는
              과정을 반복하면 화질이 계속 나빠집니다. 둘째, 투명 배경을
              지원하지 않습니다. 로고처럼 배경이 투명해야 하는 이미지를 JPG로
              저장하면 투명한 부분이 흰색으로 채워집니다. 또한 글자나 날카로운
              선 주변에 "노이즈"처럼 지저분한 얼룩이 생기기도 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              PNG의 특징과 장단점
            </h2>
            <p>
              PNG는 무손실 압축으로 원본 화질을 완벽히 보존하고, 투명 배경을
              지원합니다. 그래서 로고, 아이콘, 버튼, 그리고 텍스트나 표가 많은
              문서 이미지처럼 "선이 또렷해야 하는" 이미지에 강합니다. 화면을
              캡처한 스크린샷도 글자가 많기 때문에 PNG가 더 선명하게 나옵니다.
              편집을 반복해도 화질이 떨어지지 않는 것도 큰 장점입니다.
            </p>
            <p className="mt-4">
              단점은 파일 크기입니다. 사진처럼 색이 복잡한 이미지를 PNG로
              저장하면 JPG의 몇 배까지 커질 수 있습니다. 웹사이트에 사진을
              PNG로 잔뜩 올리면 페이지 로딩이 느려지는 이유가 이것입니다.
              즉 PNG는 "선명함이 중요한 곳"에서는 최고지만, "가벼움이
              중요한 곳"에서는 부담이 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              상황별 선택 가이드
            </h2>
            <p>
              실제로 어떤 상황에서 무엇을 골라야 하는지 정리하면 다음과
              같습니다. 사진, 풍경, 인물처럼 색이 풍부한 이미지이거나, SNS
              업로드·이메일 첨부처럼 파일을 가볍게 공유해야 한다면 JPG가
              정답입니다. 반대로 로고나 아이콘, 투명 배경이 필요한 이미지,
              글자와 표가 많은 문서, 스크린샷, 그리고 앞으로 계속 편집할
              이미지라면 PNG가 낫습니다.
            </p>
            <p className="mt-4">
              구체적인 예를 들어보겠습니다. 계약서나 강의 자료처럼 텍스트
              가독성이 생명인 문서를 이미지로 바꾼다면 PNG를 선택해야 글자가
              또렷하게 남습니다. 반면 여행 사진을 블로그에 올린다면 JPG로
              충분하고 오히려 로딩이 빨라 유리합니다. 쇼핑몰 상품 사진처럼
              양이 많은 경우도 JPG가 서버와 방문자 모두에게 부담이 적습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              PDF를 이미지로 바꿀 때는 어떻게 고를까
            </h2>
            <p>
              PDF 문서를 이미지로 변환할 때도 같은 원칙이 적용됩니다. PDF의
              내용이 사진이나 그림 위주라면 JPG로 변환하는 것이 파일도 가볍고
              무난합니다. 하지만 계약서, 보고서, 강의 노트처럼 글자가 빽빽한
              문서라면 PNG로 변환해야 글자가 뭉개지지 않고 선명하게 남습니다.
              특히 나중에 확대해서 봐야 하는 문서라면 PNG가 확실히 유리합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. JPG를 PNG로 바꾸면 화질이 좋아지나요?
                </h3>
                <p className="mt-1">
                  아닙니다. 이미 손실된 화질은 형식을 바꾼다고 복원되지
                  않습니다. JPG를 PNG로 변환하면 파일만 커지고 화질은
                  그대로입니다. 화질을 지키고 싶다면 처음부터 PNG로 저장하는
                  것이 중요합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 어느 쪽이 더 좋은 형식인가요?
                </h3>
                <p className="mt-1">
                  절대적으로 더 좋은 형식은 없습니다. 용도에 따라 다릅니다.
                  가벼움이 중요하면 JPG, 선명함과 투명 배경이 중요하면 PNG가
                  더 나은 선택입니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 투명 배경이 필요한데 JPG로 저장했어요.
                </h3>
                <p className="mt-1">
                  JPG는 투명도를 지원하지 않아 투명한 부분이 흰색으로
                  채워집니다. 투명 배경이 꼭 필요하다면 원본을 다시 PNG로
                  저장해야 합니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              정리하면 JPG는 가볍고 공유에 강하며, PNG는 선명하고 편집과
              투명 배경에 강합니다. 사진이라면 JPG, 문서·로고·스크린샷이라면
              PNG를 기억하면 대부분의 상황에서 올바른 선택을 할 수 있습니다.
              어떤 형식이 나을지 고민된다면 두 가지로 모두 변환해보고 파일
              크기와 화질을 직접 비교해보는 것도 좋은 방법입니다. 지금 바로{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              에서 JPG와 PNG를 선택해 변환해보세요. 모든 작업은 브라우저에서만
              처리되어 파일이 서버에 업로드되지 않습니다. 여러 이미지를 하나의
              문서로 묶고 싶다면{" "}
              <Link href="/jpg-to-pdf" className="text-blue-600 hover:underline">
                JPG to PDF 변환 도구
              </Link>
              도 함께 활용해보세요.
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
