import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

const guides = [
  {
    href: "/guides/pdf-to-jpg-when-why",
    title: "PDF를 JPG로 변환해야 하는 5가지 상황",
    description:
      "언제, 왜 PDF를 이미지로 바꿔야 하는지 실제 사례로 알아봅니다.",
  },
  {
    href: "/guides/jpg-vs-png",
    title: "JPG vs PNG: 언제 무엇을 써야 할까?",
    description: "두 이미지 형식의 차이와 상황별 올바른 선택법을 알아봅니다.",
  },
  {
    href: "/guides/scan-to-image",
    title: "스캔한 문서를 안전하게 이미지로 보관하고 공유하는 법",
    description:
      "민감한 문서를 다룰 때 지켜야 할 원칙과 실용적인 팁을 정리했습니다.",
  },
  {
    href: "/guides/pdf-page-extraction",
    title: "블로그용으로 PDF 특정 페이지만 이미지로 추출하는 법",
    description: "원하는 페이지만 골라 깔끔하게 이미지로 만드는 방법을 안내합니다.",
  },
  {
    href: "/guides/image-quality",
    title: "이미지 화질 설정과 파일 크기의 관계",
    description: "화질과 용량 사이에서 최적의 균형을 찾는 방법을 알아봅니다.",
  },
  {
    href: "/guides/combine-images-to-pdf",
    title: "여러 장의 사진을 하나의 PDF로 합치기",
    description:
      "흩어진 이미지 파일을 순서대로 정리해 한 개의 PDF 문서로 묶는 방법을 알아봅니다.",
  },
  {
    href: "/guides/pdf-page-size-orientation",
    title: "PDF 만들 때 용지 크기와 방향 고르는 법",
    description:
      "A4와 Letter, 세로와 가로 중 상황에 맞는 설정을 고르는 기준을 알아봅니다.",
  },
  {
    href: "/guides/jpg-to-pdf-when-why",
    title: "JPG를 PDF로 바꿔야 하는 이유",
    description: "이미지 대신 PDF로 제출하거나 공유하는 것이 나은 상황을 알아봅니다.",
  },
  {
    href: "/guides/pdf-to-image-iphone",
    title: "아이폰에서 PDF를 사진으로 저장하는 법",
    description: "아이폰과 아이패드에서 PDF를 JPG·PNG 사진으로 바꿔 갤러리에 저장하는 방법을 알아봅니다.",
  },
  {
    href: "/guides/reduce-pdf-size",
    title: "PDF 용량 줄이는 법",
    description: "무거운 PDF를 내용은 그대로 두면서 용량만 효과적으로 줄이는 방법을 알아봅니다.",
  },
  {
    href: "/guides/share-pdf-as-image",
    title: "카카오톡·인스타그램으로 PDF를 이미지로 공유하는 법",
    description: "메신저와 SNS에서 PDF를 이미지로 바꿔 누구나 바로 볼 수 있게 공유하는 방법을 알아봅니다.",
  },


];


export default function Guides() {
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
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-blue-600" />
            가이드
          </h1>
          <p className="text-slate-600 mt-2">
            PDF와 이미지 변환을 더 잘 활용하는 데 도움이 되는 글 모음입니다.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid gap-6">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href}>
              <Card className="border-0 shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2 text-lg">
                    <span>{guide.title}</span>
                    <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{guide.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
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
