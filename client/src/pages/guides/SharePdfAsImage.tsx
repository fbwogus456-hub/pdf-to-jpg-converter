import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SharePdfAsImage() {
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
            카카오톡·인스타그램으로 PDF를 이미지로 공유하는 법
          </h1>
          <p className="text-slate-600 mt-2">
            메신저와 SNS에서 PDF가 잘 안 열리는 이유와, 이미지로 바꿔
            누구나 바로 볼 수 있게 공유하는 방법을 정리했습니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              친구에게 카카오톡으로 안내문을 보냈는데 &ldquo;파일이 안
              열려&rdquo;라는 답을 받은 적이 있으실 겁니다. 인스타그램
              스토리에 자료를 올리고 싶은데 PDF는 아예 올라가지 않아
              당황했을 수도 있습니다. 메신저와 SNS는 대부분 이미지에
              최적화되어 있어, PDF보다 JPG·PNG 이미지로 공유하면 훨씬
              깔끔하게 전달됩니다. 이 글에서 그 이유와 방법을 살펴봅니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              왜 PDF는 SNS에서 잘 안 보일까
            </h2>
            <p>
              카카오톡에서 PDF는 미리보기가 제대로 뜨지 않아 상대방이 일일이
              파일을 눌러 열어야 합니다. 뷰어 앱이 없는 기기에서는 아예
              열리지 않기도 합니다. 인스타그램과 같은 이미지 중심 플랫폼은
              애초에 문서 파일 업로드를 지원하지 않습니다. 반면 이미지는
              대화창이나 피드에 바로 표시되어, 받는 사람이 아무것도 누르지
              않아도 내용을 즉시 볼 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              PDF를 이미지로 바꿔서 공유하기
            </h2>
            <p>
              방법은 간단합니다. PDF를 먼저 이미지로 변환한 뒤, 그 이미지를
              평소 사진 보내듯 공유하면 됩니다.{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              에 PDF를 올리고 JPG 또는 PNG를 선택해 변환하면, 각 페이지가
              이미지 한 장씩으로 만들어집니다. 변환된 이미지를 저장한 다음
              카카오톡 사진 보내기나 인스타그램 업로드에 그대로 올리면
              끝입니다. 모든 변환이 브라우저 안에서 처리되므로 파일이 외부로
              올라가지 않아, 개인적인 문서도 안심하고 다룰 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              플랫폼별로 알아두면 좋은 점
            </h2>
            <p>
              카카오톡은 여러 장의 이미지를 한 번에 보낼 수 있으므로,
              여러 페이지짜리 문서도 순서대로 묶어 보내면 됩니다. 화질이
              중요하다면 &ldquo;원본으로 보내기&rdquo;를 선택하는 것이
              좋습니다. 인스타그램 스토리는 세로 화면이라 세로로 긴 이미지가
              잘 어울리고, 피드 게시물은 여러 장을 넘겨 보는 형식이라 문서를
              한 장씩 나눠 올리기에 적합합니다. 글자가 많은 문서는 JPG보다
              PNG로 변환하면 글씨가 더 선명하게 보입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 이미지로 보내면 화질이 나빠지지 않나요?
                </h3>
                <p className="mt-1">
                  변환할 때 화질을 높게 설정하고, 카카오톡에서는 원본으로
                  보내면 화면에서 보기에 충분히 선명합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 여러 페이지 문서는 어떻게 공유하나요?
                </h3>
                <p className="mt-1">
                  변환하면 페이지마다 이미지가 만들어집니다. 이를 순서대로
                  여러 장 함께 보내면 됩니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 반대로 여러 이미지를 하나의 문서로 보내려면요?
                </h3>
                <p className="mt-1">
                  이미지들을 하나의 PDF로 묶고 싶다면{" "}
                  <Link
                    href="/jpg-to-pdf"
                    className="text-blue-600 hover:underline"
                  >
                    JPG to PDF 변환 도구
                  </Link>
                  를 이용하세요.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              메신저와 SNS에서는 PDF보다 이미지가 훨씬 잘 통합니다. 받는
              사람이 아무 앱 없이 바로 볼 수 있고, 어떤 플랫폼에도 올릴 수
              있기 때문입니다. 공유할 PDF가 있다면 지금{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              에서 이미지로 바꿔보세요. PDF를 이미지로 바꿔야 하는 다른
              상황이 궁금하다면{" "}
              <Link
                href="/guides/pdf-to-jpg-when-why"
                className="text-blue-600 hover:underline"
              >
                PDF를 JPG로 변환해야 하는 5가지 상황
              </Link>
              도 함께 읽어보세요.
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
