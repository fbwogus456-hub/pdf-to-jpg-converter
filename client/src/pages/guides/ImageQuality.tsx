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
            화질과 용량 사이에서 최적의 균형을 찾는 방법을 알아봅니다.
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
              용도에 맞는 균형점을 찾는 것이 핵심입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              화질을 높이면 어떻게 될까?
            </h2>
            <p>
              화질을 높일수록 글자와 세부 묘사가 더 또렷해집니다. 대신 이미지에
              담기는 정보가 많아져 파일 크기도 함께 커집니다. 100%에 가까운
              화질은 원본에 가장 충실하지만, 페이지 한 장이 수 메가바이트에 이를
              수 있어 공유나 업로드가 불편해질 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              화질을 낮추면 어떻게 될까?
            </h2>
            <p>
              화질을 낮추면 파일이 가벼워져 공유가 편해집니다. 다만 너무 낮추면
              글자가 뭉개지거나 이미지에 얼룩 같은 압축 흔적이 생깁니다. 특히
              작은 글씨가 많은 문서는 화질을 지나치게 낮추면 읽기 어려워지므로
              주의해야 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              용도별 추천 설정
            </h2>
            <p>
              화면에서 보거나 SNS에 공유하는 용도라면 70~85% 정도의 화질이면
              충분합니다. 파일이 적당히 가벼우면서도 눈으로 보기에 무리가
              없습니다. 인쇄하거나 세부 내용을 정확히 보관해야 하는 경우에는
              90% 이상으로 높이는 것이 좋습니다. 반대로 미리보기용 썸네일처럼
              크기가 최우선이라면 더 낮춰도 무방합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              형식 선택도 함께 고려하기
            </h2>
            <p>
              화질 설정은 형식 선택과도 맞물립니다. JPG는 화질을 조절해 용량을
              크게 줄일 수 있고, PNG는 무손실이라 화질은 뛰어나지만 용량 조절
              여지가 적습니다. 텍스트가 많은 문서는 PNG로 선명하게, 사진이 많은
              문서는 적당한 화질의 JPG로 저장하는 조합을 추천합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              완벽한 하나의 설정은 없습니다. "어디에 쓸 것인가"에 따라 화질과
              형식을 조절하는 것이 가장 좋습니다. 직접 몇 가지 설정으로 변환해
              비교해보면 감이 잡힙니다. 지금 바로{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              에서 화질 슬라이더를 조절하며 최적의 균형을 찾아보세요.
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
