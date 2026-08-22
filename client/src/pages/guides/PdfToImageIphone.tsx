import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PdfToImageIphone() {
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
            아이폰에서 PDF를 사진으로 저장하는 법
          </h1>
          <p className="text-slate-600 mt-2">
            아이폰과 아이패드에서 PDF를 JPG·PNG 사진으로 바꿔 갤러리에
            저장하는 여러 가지 방법을 상황별로 자세히 정리했습니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              아이폰에서 받은 PDF를 사진 앱에 저장하고 싶은데 방법을 몰라
              헤맨 경험이 한 번쯤 있으실 겁니다. PDF는 파일 앱에 저장되는
              반면, 우리가 자주 쓰는 사진첩(갤러리)에는 이미지 형식만
              들어가기 때문입니다. 계약서, 청첩장, 강의 자료, 티켓처럼 자주
              꺼내 봐야 하는 문서라면 사진으로 저장해두는 편이 훨씬
              편리합니다. 이 글에서는 아이폰과 아이패드에서 PDF를 이미지로
              저장하는 대표적인 방법들을 하나씩 살펴봅니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. 스크린샷으로 간단히 저장하기
            </h2>
            <p>
              가장 빠른 방법은 PDF를 화면에 띄운 뒤 스크린샷을 찍는
              것입니다. 페이스ID 모델은 측면 버튼과 볼륨 위 버튼을 동시에,
              홈 버튼 모델은 홈 버튼과 측면 버튼을 동시에 누르면 됩니다.
              찍은 스크린샷은 자동으로 사진 앱에 저장됩니다.
            </p>
            <p className="mt-4">
              다만 이 방법은 화면에 보이는 부분만 저장되기 때문에 화질이
              낮고, 여러 페이지짜리 문서는 한 장씩 일일이 찍어야 하는 단점이
              있습니다. 한두 페이지를 급하게 저장할 때만 쓰기 좋습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. 변환 도구로 깔끔하게 저장하기 (추천)
            </h2>
            <p>
              문서 전체를 선명하게, 그리고 여러 페이지를 한 번에 저장하려면
              PDF를 이미지로 변환하는 온라인 도구를 쓰는 것이 가장
              깔끔합니다. 아이폰 사파리에서 바로 이용할 수 있어 앱을 따로
              설치할 필요도 없습니다.
            </p>
            <p className="mt-4">
              사용법은 간단합니다. 사파리에서{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              에 접속한 뒤, 변환할 PDF 파일을 선택하고 JPG 또는 PNG 형식을
              고른 다음 변환 버튼을 누릅니다. 변환된 이미지를 길게 눌러
              &ldquo;이미지 저장&rdquo;을 선택하면 사진 앱에 바로 들어갑니다.
              모든 변환이 브라우저 안에서만 처리되므로 파일이 외부 서버로
              올라가지 않아, 계약서나 신분증 같은 민감한 문서도 안심하고
              저장할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. 파일 앱과 단축어 활용하기
            </h2>
            <p>
              아이폰의 &ldquo;단축어&rdquo; 앱을 이용하면 PDF를 이미지로
              바꾸는 나만의 자동화를 만들 수도 있습니다. &ldquo;PDF에서
              이미지 만들기&rdquo; 동작과 &ldquo;사진 앨범에 저장&rdquo;
              동작을 연결하면, 파일 앱에서 공유 버튼 한 번으로 PDF를 사진으로
              저장할 수 있습니다. 자주 반복하는 작업이라면 한 번 만들어두는
              것이 편리하지만, 처음 설정이 다소 번거로워 가끔 쓰는
              분에게는 앞의 변환 도구 방법이 더 간단합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              어떤 방법을 선택해야 할까
            </h2>
            <p>
              한두 페이지를 급하게 저장할 때는 스크린샷이 가장 빠릅니다.
              문서 전체를 선명하게, 특히 여러 페이지를 한꺼번에 저장하려면
              변환 도구가 가장 깔끔하고 화질도 좋습니다. 같은 작업을 매일
              반복한다면 단축어로 자동화하는 것도 방법입니다. 대부분의
              경우에는 화질과 편의성을 모두 갖춘 변환 도구 방식이 가장 무난한
              선택입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 저장한 이미지가 흐릿해요.
                </h3>
                <p className="mt-1">
                  스크린샷은 화면 해상도에 맞춰 저장되어 흐릿할 수 있습니다.
                  선명한 결과가 필요하다면 변환 도구에서 화질을 높게 설정해
                  변환하세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 글자가 많은 문서는 어떤 형식이 좋나요?
                </h3>
                <p className="mt-1">
                  글자나 표가 많은 문서는 JPG보다 PNG가 더 선명합니다.
                  자세한 내용은{" "}
                  <Link
                    href="/guides/jpg-vs-png"
                    className="text-blue-600 hover:underline"
                  >
                    JPG vs PNG 가이드
                  </Link>
                  를 참고하세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 안드로이드 폰에서도 같은 방법을 쓸 수 있나요?
                </h3>
                <p className="mt-1">
                  네. 변환 도구는 브라우저에서 동작하므로 안드로이드
                  크롬에서도 똑같이 이용할 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              아이폰에서 PDF를 사진으로 저장하는 방법은 상황에 따라 여러
              가지가 있습니다. 간단하게는 스크린샷, 깔끔하게는 변환 도구를
              기억해두면 언제든 필요할 때 쓸 수 있습니다. 지금 저장할 PDF가
              있다면{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              에서 무료로 바로 변환해보세요. 반대로 여러 장의 사진을 하나의
              PDF로 묶고 싶다면{" "}
              <Link href="/jpg-to-pdf" className="text-blue-600 hover:underline">
                JPG to PDF 변환 도구
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
