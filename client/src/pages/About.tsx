import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200/50 backdrop-blur-sm bg-white/80">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">사이트 소개</h1>
          <p className="text-slate-600 mt-2">
            이 사이트가 무엇을 위해 만들어졌고, 어떤 원칙으로 운영되는지
            소개합니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              어떤 사이트인가요
            </h2>
            <p>
              이 사이트는 PDF와 이미지를 서로 변환하는 무료 온라인 도구를
              제공합니다. PDF를 JPG나 PNG 이미지로 바꾸거나, 여러 장의
              이미지를 하나의 PDF로 합칠 수 있습니다. 별도의 프로그램 설치나
              회원가입 없이, 웹 브라우저만 있으면 누구나 바로 사용할 수
              있도록 만들었습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              무엇을 가장 중요하게 생각하나요
            </h2>
            <p>
              가장 중요하게 여기는 것은 사용자의 개인정보 보호입니다. 이
              사이트의 모든 변환 작업은 여러분의 브라우저 안에서만 처리되며,
              파일을 외부 서버로 업로드하지 않습니다. 즉 여러분이 변환하는
              계약서, 신분증, 사진 같은 파일이 여러분의 기기를 떠나지
              않습니다. 민감한 문서도 안심하고 변환할 수 있도록 이 원칙을
              지키고 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              어떻게 사용하나요
            </h2>
            <p>
              변환하고 싶은 파일을 올리고 원하는 형식과 옵션을 선택한 뒤
              변환 버튼을 누르면 됩니다. PDF를 이미지로 바꾸려면{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              를, 이미지를 PDF로 묶으려면{" "}
              <Link href="/jpg-to-pdf" className="text-blue-600 hover:underline">
                JPG to PDF 변환 도구
              </Link>
              를 이용하세요. 변환을 더 잘 활용하는 방법이 궁금하다면{" "}
              <Link href="/guides" className="text-blue-600 hover:underline">
                가이드
              </Link>
              에서 다양한 팁을 확인할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              비용이 드나요
            </h2>
            <p>
              모든 기능은 완전히 무료입니다. 사용 횟수 제한이나 숨겨진 유료
              전환도 없습니다. 더 많은 사람이 부담 없이 파일 변환을 이용할 수
              있도록 무료로 제공하고 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">문의하기</h2>
            <p>
              사이트 이용 중 궁금한 점이나 개선 의견이 있다면 언제든{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                문의 페이지
              </Link>
              를 통해 연락해주세요. 여러분의 의견은 서비스를 개선하는 데 큰
              도움이 됩니다.
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
