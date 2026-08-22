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
            여러 장의 사진을 하나의 PDF로 합치기: 완벽 가이드
          </h1>
          <p className="text-slate-600 mt-2">
            흩어진 이미지 파일을 순서대로 정리해 한 개의 PDF 문서로 묶는
            방법을 단계별로, 실전 사례와 함께 자세히 알아봅니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              영수증 여러 장, 신분증 앞뒤, 손으로 찍은 계약서 사진, 과제
              이미지처럼 여러 장의 이미지를 한꺼번에 제출하거나 보관해야 할
              때가 자주 있습니다. 이미지를 낱장으로 보내면 받는 사람이 파일을
              하나하나 열어봐야 하고, 순서가 뒤섞이거나 일부가 누락되기도
              쉽습니다. 이럴 때 여러 이미지를 하나의 PDF로 합쳐두면 순서가
              고정되고, 파일 하나만 주고받으면 되어 훨씬 깔끔하고 전문적으로
              보입니다. 이 글에서는 이미지를 PDF로 합치는 이유부터 실제
              단계, 자주 겪는 문제 해결까지 차근차근 정리합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              왜 이미지를 PDF로 합쳐야 할까
            </h2>
            <p>
              이미지 파일은 기본적으로 한 장이 하나의 파일입니다. 여러 장을
              보내려면 파일을 여러 개 첨부해야 하는데, 이 방식에는 몇 가지
              불편함이 따릅니다. 받는 사람이 순서를 알 수 없고, 파일명이
              제각각이라 정리가 어려우며, 이메일이나 메신저로 보낼 때 일부
              파일이 빠질 위험도 있습니다.
            </p>
            <p className="mt-4">
              PDF로 합치면 이 문제가 한 번에 해결됩니다. 페이지 순서가 그대로
              고정되고, 하나의 파일이라 누락 걱정이 없으며, 인쇄할 때도 순서
              대로 한 번에 출력됩니다. 또한 대부분의 관공서·학교·회사가 서류
              제출 형식으로 PDF를 요구하기 때문에, 이미지를 PDF로 합쳐두면
              그대로 제출할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              이럴 때 특히 유용합니다
            </h2>
            <p>
              여러 장이 하나의 묶음으로 취급돼야 하는 상황에서 특히 빛을
              발합니다. 예를 들어 여행 경비를 정산할 때 영수증 사진 여러 장을
              하나의 PDF로 묶으면 회계 담당자가 한 파일만 확인하면 됩니다.
              스캔한 계약서 여러 페이지, 포트폴리오 이미지 모음, 손으로 찍은
              학습 자료, 부동산 서류 사진 등도 마찬가지입니다. 여러 장을
              순서대로 보관해야 하는 거의 모든 경우에 PDF 합치기가 답이 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              단계별 방법
            </h2>
            <p>
              실제로 합치는 과정은 간단합니다. 순서대로 따라 하면 됩니다.
            </p>
            <ol className="list-decimal list-inside mt-4 space-y-3">
              <li>
                <span className="font-semibold">이미지 업로드:</span> PDF에
                넣을 이미지를 모두 선택해 업로드합니다. 여러 파일을 한 번에
                선택하거나, 파일들을 화면으로 끌어다 놓아도 됩니다.
              </li>
              <li>
                <span className="font-semibold">순서 정리:</span> 업로드한
                이미지를 목록에서 끌어 순서를 바꿉니다. 이 순서가 그대로 PDF의
                페이지 순서가 되므로, 원하는 순서대로 정렬합니다.
              </li>
              <li>
                <span className="font-semibold">불필요한 이미지 삭제:</span>{" "}
                잘못 올린 이미지는 삭제 버튼으로 목록에서 제거합니다.
              </li>
              <li>
                <span className="font-semibold">용지와 방향 설정:</span> 용지
                크기(A4, Letter, 이미지 크기에 맞춤)와 페이지 방향(세로,
                가로)을 선택합니다.
              </li>
              <li>
                <span className="font-semibold">미리보기 확인 후 생성:</span>{" "}
                첫 페이지가 어떻게 나올지 미리보기로 확인한 뒤, PDF 생성
                버튼을 눌러 하나의 문서로 내려받습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              용지 크기와 방향 정하기
            </h2>
            <p>
              합치기 전에 용지 설정을 신경 쓰면 결과물이 훨씬 깔끔해집니다.
              일반 문서라면 A4 세로가 무난하고, 옆으로 긴 사진이 많다면
              가로를 선택하면 위아래 여백이 줄어듭니다. 이미지 원본 비율을
              그대로 살리고 싶다면 "이미지 크기에 맞춤"을 쓰면 여백 없이
              이미지가 페이지를 꽉 채웁니다. 세로 사진과 가로 사진이 섞여
              있다면 "이미지 크기에 맞춤"이 각 페이지를 자동으로 맞춰주므로
              편리합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              자주 겪는 문제와 해결법
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  이미지가 흐릿하게 나와요
                </h3>
                <p className="mt-1">
                  원본 이미지 자체의 해상도가 낮으면 PDF로 합쳐도 선명해지지
                  않습니다. 가능하면 촬영·스캔할 때부터 고해상도로 준비하는
                  것이 좋습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  페이지 순서가 뒤섞였어요
                </h3>
                <p className="mt-1">
                  업로드 후 목록에서 이미지를 끌어 순서를 바꿀 수 있습니다.
                  PDF를 생성하기 전에 순서가 맞는지 반드시 확인하세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  파일 용량이 너무 커요
                </h3>
                <p className="mt-1">
                  고해상도 사진을 여러 장 합치면 PDF 용량이 커질 수 있습니다.
                  용량이 중요하다면 합치기 전에 이미지 크기를 적절히 줄이는
                  것이 도움이 됩니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              안전하게 처리되나요
            </h2>
            <p>
              신분증, 계약서, 영수증처럼 민감한 이미지를 다룰 때는 보안이
              걱정될 수 있습니다. 이 도구는 모든 변환 작업을 여러분의
              브라우저 안에서만 처리하며, 이미지를 서버로 업로드하지 않습니다.
              즉 파일이 여러분의 기기를 떠나지 않으므로, 민감한 문서도 안심
              하고 하나의 PDF로 합칠 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              여러 이미지를 하나의 PDF로 합치면 관리와 공유, 제출이 모두
              편해집니다. 순서 변경과 용지 설정까지 마쳤다면 지금 바로{" "}
              <Link href="/jpg-to-pdf" className="text-blue-600 hover:underline">
                JPG to PDF 변환 도구
              </Link>
              에서 사진들을 하나의 문서로 묶어보세요. 모든 작업은 브라우저에서만
              처리되어 파일이 서버에 업로드되지 않습니다. 반대로 PDF를 이미지로
              나눠야 한다면{" "}
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
