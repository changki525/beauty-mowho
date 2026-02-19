import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "beauty mowho | 세종 반영구 화장 전문 - 눈썹·입술·아이라인",
  description: "세종시 반영구 화장 전문 beauty mowho. 미대출신 원장의 1:1 맞춤 디자인. 다이아페더링 눈썹, 워터풀시럽립 입술, 아이라인 시술. 세종특별자치시 다솜1로 21.",
  keywords: ["세종 반영구", "세종 눈썹문신", "세종시 반영구화장", "세종 입술문신", "세종 아이라인문신", "다이아페더링", "뷰티모후", "beauty mowho", "세종시 눈썹", "반영구 눈썹", "세종 반영구 잘하는곳"],
  authors: [{ name: "beauty mowho" }],
  openGraph: {
    title: "beauty mowho | 세종 반영구 화장 전문",
    description: "미대출신 원장의 1:1 맞춤 디자인. 다이아페더링 눈썹, 워터풀시럽립 입술, 아이라인 시술.",
    type: "website",
    locale: "ko_KR",
    url: "https://beauty-mowho.com/",
    siteName: "beauty mowho",
  },
  twitter: {
    card: "summary_large_image",
    title: "beauty mowho | 세종 반영구 화장 전문",
    description: "미대출신 원장의 1:1 맞춤 디자인.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Sans+KR:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "beauty mowho",
              "description": "세종시 반영구 화장 전문. 미대출신 원장의 1:1 맞춤 디자인.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "다솜1로 21",
                "addressLocality": "세종특별자치시",
                "addressCountry": "KR"
              },
              "telephone": "010-7316-7783",
              "openingHours": "Mo-Su 10:00-20:00",
              "url": "https://beauty-mowho.com/",
              "sameAs": [
                "https://blog.naver.com/mipoomdal",
                "https://www.instagram.com/p/Crx8J6xLEvP/"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
