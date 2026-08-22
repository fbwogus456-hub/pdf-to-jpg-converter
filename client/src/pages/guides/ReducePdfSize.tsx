import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ReducePdfSize() {
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
            PDF 용량 줄이는 법
          </h1>
          <p className="text-slate-600 mt-2">
            이메일 첨부나 업로드가 막힐 만큼 무거운 PDF를, 내용은 그대로
            두면서 용량만 효과적으로 줄이는 방법들을 정리했습니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              PDF를 이메일에 첨부하려는데 용량 제한에 걸리거나, 제출
              사이트에서 &ldquo;파일이 너무 큽니다&rdquo;라는 메시지를 만난
              적이 있으실 겁니다. PDF가 무거워지는 가장 큰 원인은 대부분 안에
              들어간 고해상도 이미지와 스캔 페이지입니다. 다행히 내용을
              해치지 않으면서 용량을 줄이는 방법이 여러 가지 있습니다.
              아래에서 상황별로 하나씩 살펴봅니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. PDF가 무거워지는 이유부터 알기
            </h2>
            <p>
              PDF 용량의 대부분은 글자가 아니라 이미지가 차지합니다. 특히
              스마트폰으로 찍거나 스캔한 문서는 한 장에 수 메가바이트에
              이르기도 합니다. 그래서 용량을 줄이는 핵심은 &ldquo;이미지를
              어떻게 다루느냐&rdquo;에 달려 있습니다. 글자 위주의 문서라면
              애초에 용량이 크지 않으므로, 무거운 PDF는 거의 대부분 이미지가
              원인이라고 보면 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. 온라인 압축 도구 사용하기
            </h2>
            <p>
              가장 간단한 방법은 PDF 압축을 지원하는 온라인 도구에 파일을
              올려 자동으로 최적화하는 것입니다. 이미지 해상도와 품질을
              적절히 낮춰 용량을 크게 줄여줍니다. 다만 이런 도구는 파일을
              외부 서버에 업로드하는 경우가 많으므로, 계약서나 신분증 같은
              민감한 문서라면 개인정보 처리 방침을 꼭 확인하고 사용하는 것이
              좋습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. 이미지를 먼저 줄여서 PDF로 만들기
            </h2>
            <p>
              사진 여러 장을 묶어 PDF를 만드는 경우라면, 애초에 이미지
              용량을 줄인 상태로 PDF를 만드는 것이 가장 확실합니다. 이미
              완성된 PDF를 다시 압축하는 것보다, 만들 때부터 적절한 화질로
              설정하면 화질 손상도 적고 용량도 잘 관리됩니다.
            </p>
            <p className="mt-4">
              이미지를 하나의 PDF로 묶을 때는{" "}
              <Link href="/jpg-to-pdf" className="text-blue-600 hover:underline">
                JPG to PDF 변환 도구
              </Link>
              에서 용지 크기와 방향을 조절해 불필요하게 큰 여백 없이
              만들 수 있습니다. 화질과 용량의 관계가 궁금하다면{" "}
              <Link
                href="/guides/image-quality"
                className="text-blue-600 hover:underline"
              >
                이미지 화질 설정 가이드
              </Link>
              를 함께 참고하세요.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. 필요한 페이지만 남기기
            </h2>
            <p>
              전체 문서 중 실제로 필요한 페이지가 몇 장뿐이라면, 그 페이지만
              따로 추출하는 것만으로도 용량을 크게 줄일 수 있습니다. 20페이지
              문서에서 3페이지만 제출하면 되는데 전체를 보내는 경우가 의외로
              많습니다. 필요한 페이지만 골라내면 용량도 줄고 받는 사람도
              내용을 찾기 쉬워집니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. 인쇄용 대신 화면용으로 저장하기
            </h2>
            <p>
              워드나 한글, 파워포인트에서 PDF로 내보낼 때 &ldquo;인쇄용&rdquo;
              또는 &ldquo;고품질&rdquo; 대신 &ldquo;최소 크기&rdquo;나
              &ldquo;웹용&rdquo; 옵션을 선택하면 용량이 눈에 띄게 줄어듭니다.
              화면으로 볼 문서라면 굳이 인쇄용 고해상도가 필요 없으므로, 이
              옵션 하나만 바꿔도 충분한 경우가 많습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 용량을 줄이면 화질이 많이 나빠지나요?
                </h3>
                <p className="mt-1">
                  적절한 수준으로 줄이면 화면에서 볼 때는 차이를 거의 느끼기
                  어렵습니다. 다만 인쇄가 목적이라면 화질을 너무 낮추지 않는
                  것이 좋습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 글자만 있는 PDF도 용량을 줄일 수 있나요?
                </h3>
                <p className="mt-1">
                  글자 위주 문서는 원래 용량이 작아 줄일 여지가 크지
                  않습니다. 무거운 PDF는 대부분 이미지가 원인이므로 이미지를
                  줄이는 것이 효과적입니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 이메일 첨부 용량 제한은 보통 얼마인가요?
                </h3>
                <p className="mt-1">
                  서비스마다 다르지만 대체로 20~25MB 안팎입니다. 이보다 크면
                  압축하거나 필요한 페이지만 추려서 보내는 것이 좋습니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              PDF 용량을 줄이는 핵심은 결국 이미지 관리입니다. 압축 도구를
              쓰거나, 필요한 페이지만 남기거나, 저장 옵션을 화면용으로
              바꾸는 방법을 상황에 맞게 조합하면 됩니다. 사진을 묶어 PDF를
              만드는 경우라면 처음부터 적절한 화질로 만드는 것이 가장
              깔끔합니다. 지금 바로{" "}
              <Link href="/jpg-to-pdf" className="text-blue-600 hover:underline">
                JPG to PDF 변환 도구
              </Link>
              에서 용지와 화질을 조절해 가벼운 PDF를 만들어보세요. 반대로
              PDF를 이미지로 바꿔야 한다면{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              를 이용하면 됩니다.
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
              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                소개
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
