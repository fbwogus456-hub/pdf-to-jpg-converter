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
            JPG vs PNG: 언제 무엇을 써야 할까?
          </h1>
          <p className="text-slate-600 mt-2">
            두 이미지 형식의 차이와 상황별 올바른 선택법을 알아봅니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              이미지를 저장할 때 가장 많이 쓰이는 형식이 JPG와 PNG입니다. 겉보기엔
              비슷해 보이지만 압축 방식과 특징이 달라, 상황에 맞지 않는 형식을
              고르면 파일이 불필요하게 커지거나 화질이 떨어질 수 있습니다. 두
              형식의 차이를 이해하면 문서를 변환할 때 더 나은 선택을 할 수
              있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              JPG의 특징
            </h2>
            <p>
              JPG(JPEG)는 손실 압축 방식을 사용합니다. 사람 눈에 잘 띄지 않는
              정보를 줄여 파일 크기를 크게 낮추기 때문에, 사진처럼 색상이 많고
              복잡한 이미지에 적합합니다. 파일이 가벼워 SNS 공유나 웹 게시에
              유리하지만, 저장할 때마다 화질이 조금씩 손실되고 투명한 배경을
              지원하지 않는다는 한계가 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              PNG의 특징
            </h2>
            <p>
              PNG는 무손실 압축 방식을 사용해 원본 화질을 그대로 유지합니다.
              특히 투명 배경을 지원하기 때문에 로고나 아이콘, 텍스트가 많은
              이미지에 적합합니다. 선이 또렷하게 유지되는 장점이 있지만, 그만큼
              파일 크기가 JPG보다 커지는 경향이 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              상황별 선택 가이드
            </h2>
            <p>
              사진이나 그림처럼 색이 풍부한 페이지, 그리고 파일 크기를 줄여
              빠르게 공유해야 하는 경우에는 JPG가 좋습니다. 반대로 글자가 많은
              문서, 표나 도표처럼 선명함이 중요한 페이지, 투명 배경이 필요한
              경우에는 PNG가 더 알맞습니다. 예를 들어 계약서나 강의 자료처럼
              텍스트 가독성이 중요한 문서라면 PNG를, 사진이 많은 카탈로그라면
              JPG를 선택하는 식입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              정리하면 JPG는 가볍고 공유에 강하며, PNG는 선명하고 편집에
              강합니다. 어떤 형식이 좋을지 고민된다면 두 가지를 모두 변환해보고
              비교하는 것도 방법입니다. 지금 바로{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              에서 JPG와 PNG를 선택해 변환해보세요. 모든 작업은 브라우저에서만
              처리되어 파일이 서버에 업로드되지 않습니다.
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
