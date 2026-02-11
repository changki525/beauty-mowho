import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "freemaker | 하루만에 배송되는 프리미엄 홈페이지 제작",
  description: "마음에 안들면 돈 안내도 됩니다. 하루 2,000원 커피 한 잔 값으로 나만의 홈페이지를 가지세요. 300만원씩 쓰지 마세요. 전담 팀이 제작해드립니다.",
  keywords: ["홈페이지 제작", "웹사이트 제작", "랜딩페이지", "웹 에이전시", "저렴한 홈페이지", "빠른 제작"],
  authors: [{ name: "freemaker" }],
  openGraph: {
    title: "freemaker | 하루만에 배송되는 프리미엄 홈페이지 제작",
    description: "마음에 안들면 돈 안내도 됩니다. 하루 2,000원으로 나만의 홈페이지를 가지세요.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "freemaker | 하루만에 배송되는 프리미엄 홈페이지",
    description: "마음에 안들면 돈 안내도 됩니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
