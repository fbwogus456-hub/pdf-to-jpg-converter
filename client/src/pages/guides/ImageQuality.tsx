import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ImageQuality() {
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
            이미지 화질 설정과 파일 크기의 관계
          </h1>
          <p className="text-slate-600 mt-2">
            화질과 용량 사이에서 최적의 균형을 찾는 방법을, 원리부터 용도별
            추천 설정까지 자세히 알아봅니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              PDF를 이미지로 변환할 때 대부분의 도구는 화질(품질)을 조절할 수
              있습니다. 이 설정은 결과 이미지의 선명함과 파일 크기를 동시에
              결정합니다. 화질과 용량은 서로 반대 방향으로 움직이기 때문에,
              무조건 높게 두는 것이 정답은 아닙니다. 어디에 쓸 이미지인지에
              따라 적절한 균형점을 찾는 것이 핵심입니다. 이 글에서는 화질을
              올리고 내릴 때 각각 어떤 일이 일어나는지, 그리고 용도별로 어떤
              설정이 적당한지 구체적으로 정리합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              화질을 높이면 어떻게 될까?
            </h2>
            <p>
              화질을 높일수록 글자와 세부 묘사가 더 또렷해집니다. 대신 이미지에
              담기는 정보가 많아져 파일 크기도 함께 커집니다. 100%에 가까운
              화질은 원본에 가장 충실하지만, 페이지 한 장이 수 메가바이트에
              이를 수 있어 이메일 첨부나 웹 업로드가 불편해질 수 있습니다.
              특히 여러 페이지를 한꺼번에 변환하면 전체 용량이 빠르게 불어
              납니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              화질을 낮추면 어떻게 될까?
            </h2>
            <p>
              화질을 낮추면 파일이 가벼워져 공유가 편해지고 웹페이지 로딩도
              빨라집니다. 다만 너무 낮추면 글자가 뭉개지거나 이미지에 얼룩
              같은 압축 흔적(노이즈)이 생깁니다. 특히 작은 글씨가 많은 문서는
              화질을 지나치게 낮추면 읽기 어려워지므로 주의해야 합니다. 한 번
              낮은 화질로 저장한 이미지는 나중에 화질을 올려도 원래대로
              복원되지 않는다는 점도 기억해두면 좋습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              화질과 해상도는 다른 개념입니다
            </h2>
            <p>
              흔히 헷갈리는 것이 "화질(품질)"과 "해상도(크기)"입니다. 화질은
              같은 크기의 이미지를 얼마나 촘촘하게 압축하느냐의 문제이고,
              해상도는 이미지의 가로·세로 픽셀 수, 즉 이미지 자체의 크기를
              말합니다. 예를 들어 해상도가 낮으면 아무리 화질을 100%로 올려도
              확대했을 때 흐릿합니다. 반대로 해상도가 충분히 높으면 화질을
              조금 낮춰도 화면에서 보기에 충분히 선명합니다. 확대해서 봐야
              하는 문서라면 해상도가 충분한지부터 확인하는 것이 좋습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              용도별 추천 설정
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  화면 보기·SNS 공유
                </h3>
                <p className="mt-1">
                  70~85% 화질이면 충분합니다. 파일이 가벼우면서도 눈으로 보기에
                  무리가 없습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  인쇄·정밀 보관
                </h3>
                <p className="mt-1">
                  90% 이상으로 높이는 것이 좋습니다. 인쇄물은 화면보다 세부가
                  더 잘 드러나므로 높은 화질이 유리합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  썸네일·미리보기
                </h3>
                <p className="mt-1">
                  크기가 최우선이라면 60% 이하로 낮춰도 무방합니다. 작게
                  보이는 용도라 화질 저하가 잘 드러나지 않습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  글자가 많은 문서
                </h3>
                <p className="mt-1">
                  화질을 높이거나 아예 PNG로 변환해 글자의 선명함을 지키는
                  것이 좋습니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              형식 선택도 함께 고려하기
            </h2>
            <p>
              화질 설정은 형식 선택과도 맞물립니다. JPG는 화질을 조절해 용량을
              크게 줄일 수 있고, PNG는 무손실이라 화질은 뛰어나지만 용량 조절
              여지가 적습니다. 텍스트가 많은 문서는 PNG로 선명하게, 사진이
              많은 문서는 적당한 화질의 JPG로 저장하는 조합을 추천합니다.
              자세한 비교는{" "}
              <Link
                href="/guides/jpg-vs-png"
                className="text-blue-600 hover:underline"
              >
                JPG vs PNG 가이드
              </Link>
              에서 확인할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 화질을 낮췄다가 다시 높이면 원래대로 돌아오나요?
                </h3>
                <p className="mt-1">
                  아닙니다. 이미 손실된 정보는 복원되지 않습니다. 원본을
                  보관해두고 필요할 때마다 원본에서 다시 변환하는 것이
                  안전합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. PNG에도 화질 설정이 있나요?
                </h3>
                <p className="mt-1">
                  PNG는 무손실 형식이라 JPG처럼 품질을 단계별로 낮추는 개념이
                  거의 없습니다. 대신 용량이 크므로, 용량이 중요하면 JPG를
                  고려하세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 적당한 화질을 어떻게 찾나요?
                </h3>
                <p className="mt-1">
                  같은 문서를 두세 가지 화질로 변환해 파일 크기와 선명함을
                  직접 비교해보는 것이 가장 확실합니다. 한 번 감을 잡으면
                  이후에는 빠르게 고를 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              완벽한 하나의 설정은 없습니다. "어디에 쓸 것인가"에 따라 화질과
              형식을 조절하는 것이 가장 좋습니다. 직접 몇 가지 설정으로 변환해
              비교해보면 금방 감이 잡힙니다. 지금 바로{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              에서 화질 슬라이더를 조절하며 최적의 균형을 찾아보세요. 모든
              작업은 브라우저에서만 처리되어 파일이 서버에 업로드되지
              않습니다.
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
