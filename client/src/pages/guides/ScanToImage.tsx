import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ScanToImage() {
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
            스캔한 문서를 안전하게 이미지로 보관하고 공유하는 법
          </h1>
          <p className="text-slate-600 mt-2">
            민감한 문서를 다룰 때 지켜야 할 보안 원칙과 실용적인 팁을
            단계별로 자세히 정리했습니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              계약서, 신분증, 주민등록등본, 각종 증명서처럼 민감한 문서를
              스캔해 보관하거나 공유하는 일은 이제 일상이 되었습니다. 하지만
              편리함만 좇다 보면 개인정보가 유출되는 위험을 놓치기 쉽습니다.
              한 번 유출된 신분증이나 계약서 이미지는 되돌리기 어렵고, 명의
              도용 같은 심각한 피해로 이어질 수 있습니다. 이 글에서는 스캔
              문서를 이미지로 안전하게 관리하는 방법을 단계별로 살펴보고,
              실무에서 바로 지킬 수 있는 팁까지 함께 정리합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. 어디에서 변환하는지가 가장 중요합니다
            </h2>
            <p>
              온라인 변환 도구 중에는 파일을 자사 서버에 업로드해 처리하는
              곳이 많습니다. 이 경우 민감한 문서가 외부 서버에 잠시라도
              저장되며, 그 서버가 어떻게 관리되는지 사용자는 알 수 없습니다.
              업체가 파일을 즉시 삭제한다고 밝히더라도, 전송 과정이나 서버
              보관 중에 노출될 가능성을 완전히 배제하기는 어렵습니다.
            </p>
            <p className="mt-4">
              가장 안전한 방법은 파일을 서버로 보내지 않고 브라우저 안에서만
              처리하는 도구를 쓰는 것입니다. 이런 방식에서는 문서가 내 기기
              밖으로 아예 나가지 않기 때문에, 전송 중 유출이나 서버 저장에
              따른 위험 자체가 발생하지 않습니다. 민감한 문서일수록 "이
              파일이 내 컴퓨터를 떠나는가?"를 먼저 확인해야 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. 필요한 페이지만 변환하세요
            </h2>
            <p>
              여러 장짜리 문서라면 실제로 공유해야 하는 페이지만 골라
              변환하는 것이 좋습니다. 예를 들어 계약서 전체 중 서명 페이지만
              필요한데 전부를 이미지로 만들어 보내면, 불필요한 개인정보가
              담긴 페이지까지 함께 노출됩니다. 페이지 범위를 지정할 수 있는
              도구를 쓰면 원하는 부분만 깔끔하게 추출해 노출 범위를 최소화할
              수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. 개인정보는 미리 가리세요
            </h2>
            <p>
              공유 목적에 꼭 필요하지 않은 개인정보는 변환 전이나 후에
              가리는 것이 안전합니다. 예를 들어 신분증 사본을 제출할 때
              주민등록번호 뒷자리나 발급 기관 정보가 필요 없다면 검은색으로
              덮어두는 것이 좋습니다. 특히 신분증 사본에는 "○○ 제출용"처럼
              용도를 적어두면 다른 곳에 도용되는 것을 어느 정도 막을 수
              있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. 공유 방식과 보관 위치를 점검하세요
            </h2>
            <p>
              이미지를 공유할 때는 링크가 아무나 접근 가능한 상태로 열려 있지
              않은지 확인해야 합니다. 클라우드 공유 링크는 "링크가 있는 모든
              사람"에게 열려 있는 경우가 많으니, 특정 사람만 볼 수 있도록
              권한을 제한하세요. 오래 보관해야 하는 문서라면 잠금 기능이 있는
              폴더나 암호화된 저장소를 활용하고, 더 이상 필요 없는 파일은
              기기와 휴지통에서 완전히 삭제하는 습관을 들이는 것이 좋습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. 화질과 파일 크기의 균형
            </h2>
            <p>
              증빙용 문서는 글자가 또렷하게 보여야 하므로 화질을 너무 낮추지
              않는 것이 좋습니다. 화질이 낮으면 글자가 뭉개져 문서를 다시
              제출해야 하는 번거로움이 생깁니다. 다만 화질을 지나치게 높이면
              파일이 커져 공유가 불편해집니다. 텍스트 중심 문서는 선명함을
              유지하는 PNG를, 용량이 중요하다면 적당한 품질의 JPG를 선택하는
              식으로 균형을 맞추세요. 형식 선택이 고민된다면{" "}
              <Link
                href="/guides/jpg-vs-png"
                className="text-blue-600 hover:underline"
              >
                JPG vs PNG 가이드
              </Link>
              를 참고하면 도움이 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              깨끗하게 스캔하는 팁
            </h2>
            <p>
              스캔 품질 자체를 높이면 보관과 공유가 훨씬 수월해집니다. 문서를
              평평한 곳에 놓고 그림자가 지지 않도록 밝은 곳에서 촬영하거나
              스캔하세요. 휴대폰 스캔 앱을 쓸 때는 문서의 네 모서리가 화면
              안에 다 들어오게 하고, 자동 보정 기능으로 기울기를 바로잡으면
              반듯한 결과를 얻을 수 있습니다. 반듯하고 선명한 스캔본은 나중에
              이미지로 변환했을 때도 훨씬 보기 좋습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 브라우저에서만 처리된다는 게 정말 안전한가요?
                </h3>
                <p className="mt-1">
                  파일이 서버로 전송되지 않고 여러분의 기기 안에서만 변환되기
                  때문에, 전송 중 가로채기나 외부 서버 저장에 따른 위험이
                  발생하지 않습니다. 민감한 문서에 특히 적합한 방식입니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 신분증 사본을 제출할 때 주의할 점은?
                </h3>
                <p className="mt-1">
                  꼭 필요한 정보만 남기고 나머지는 가리며, 사본에 사용 목적을
                  표시해두는 것이 안전합니다. 제출 후에는 사용한 임시 파일을
                  삭제하는 것도 잊지 마세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Q. 텍스트 문서는 어떤 형식이 좋나요?
                </h3>
                <p className="mt-1">
                  글자가 많은 문서는 선명함을 유지하는 PNG가 유리합니다.
                  사진이 섞여 있고 용량이 중요하다면 JPG도 괜찮습니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">마무리</h2>
            <p>
              민감한 문서일수록 "어디에서, 어떤 부분만, 어떻게 공유하느냐"를
              신경 쓰는 것만으로도 위험을 크게 줄일 수 있습니다. 브라우저에서만
              처리되는{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                PDF to JPG 변환 도구
              </Link>
              를 사용하면 파일이 서버에 업로드되지 않아 스캔 문서를 안심하고
              변환할 수 있습니다. 여러 장을 하나로 묶어 보관하고 싶다면{" "}
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
