import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CombineImagesToPdf() {
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
            여러 장의 사진을 하나의 PDF로 합치기
          </h1>
          <p className="text-slate-600 mt-2">
            흩어진 이미지 파일을 순서대로 정리해 한 개의 PDF 문서로 묶는 방법을 알아봅니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              영수증, 신분증 앞뒤, 손으로 찍은 문서 사진처럼 여러 장의 이미지를
              한꺼번에 제출해야 할 때가 있습니다. 이미지를 낱장으로 보내면 받는
              사람이 여러 파일을 일일이 열어봐야 하고 순서도 뒤섞이기 쉽습니다.
              여러 이미지를 하나의 PDF로 합쳐두면 순서가 고정되고, 파일 하나만
              주고받으면 되어 훨씬 깔끔합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              언제 이미지를 PDF로 합치면 좋을까
            </h2>
            <p>
              스캔한 계약서 여러 장, 여행 경비 영수증 모음, 과제나 포트폴리오
              이미지처럼 "여러 장이 하나의 묶음"으로 취급돼야 하는 경우에
              특히 유용합니다. PDF로 합쳐두면 인쇄할 때도 순서대로 한 번에
              출력되고, 이메일에 첨부할 때도 파일이 하나라 누락될 걱정이
              없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              합치는 순서
            </h2>
            <p>
              먼저 PDF에 넣을 이미지를 모두 업로드합니다. 여러 파일을 한 번에
              선택하거나 드래그해서 올릴 수 있습니다. 업로드한 뒤에는 목록에서
              이미지를 끌어 순서를 바꿀 수 있는데, 이 순서가 그대로 PDF의
              페이지 순서가 됩니다. 잘못 올린 이미지는 삭제 버튼으로 빼면
              됩니다. 순서가 정리되면 PDF 생성 버튼을 눌러 한 개의 문서로
              내려받습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              용지 크기와 방향 정하기
            </h2>
            <p>
              합치기 전에 용지 크기(A4, Letter, 이미지 크기에 맞춤)와 페이지
              방향(세로, 가로)을 고를 수 있습니다. 일반 문서라면 A4 세로가
              무난하고, 옆으로 긴 사진이 많다면 가로를 선택하면 여백이 줄어듭니다.
              이미지 원본 비율을 그대로 살리고 싶다면 "이미지 크기에 맞춤"을
              쓰면 됩니다. 미리보기로 첫 페이지가 어떻게 나올지 확인한 뒤
              생성하면 실수를 줄일 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              여러 이미지를 하나의 PDF로 합치면 관리와 공유가 훨씬 편해집니다.
              순서 변경과 용지 설정까지 마쳤다면 지금 바로{" "}
              <Link href="/jpg-to-pdf" className="text-blue-600 hover:underline">
                JPG to PDF 변환 도구
              </Link>
              에서 사진들을 하나의 문서로 묶어보세요. 모든 작업은 브라우저에서만
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
