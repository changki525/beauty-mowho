import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "세종 눈썹문신 · 반영구 화장 전문 | beauty mowho 뷰티모후",
  description: "세종시 눈썹문신 반영구 화장 전문 뷰티모후. 미대출신 원장의 1:1 맞춤 다이아페더링 눈썹, 워터풀시럽립 입술, 아이라인 시술. 세종특별자치시 다솜1로 21. 당일세안 가능, 자연스러운 결 표현.",
  keywords: ["세종눈썹문신", "세종 눈썹문신", "세종 반영구", "세종시 반영구화장", "세종 반영구 잘하는곳", "세종 입술문신", "세종 아이라인문신", "다이아페더링", "뷰티모후", "beauty mowho", "세종시 눈썹", "반영구 눈썹", "세종 반영구화장 추천"],
  authors: [{ name: "beauty mowho" }],
  openGraph: {
    title: "세종 눈썹문신 · 반영구 화장 전문 | beauty mowho 뷰티모후",
    description: "세종시 눈썹문신 반영구 화장 전문. 미대출신 원장의 1:1 맞춤 다이아페더링 눈썹, 입술, 아이라인 시술. 당일세안 가능.",
    type: "website",
    locale: "ko_KR",
    url: "https://beauty-mowho.com/",
    siteName: "beauty mowho 뷰티모후",
    images: [
      {
        url: "https://beauty-mowho.com/images/hero-bg.jpeg",
        width: 1200,
        height: 630,
        alt: "뷰티모후 - 세종 눈썹문신 반영구 화장 전문",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "세종 눈썹문신 · 반영구 화장 전문 | beauty mowho 뷰티모후",
    description: "세종시 눈썹문신 반영구 전문. 미대출신 원장 1:1 맞춤 디자인.",
    images: ["https://beauty-mowho.com/images/hero-bg.jpeg"],
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
        <meta name="naver-site-verification" content="99bad93a57a66db9211c5ec35ff56f44d0eaacc2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Sans+KR:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "beauty mowho 뷰티모후",
              "alternateName": "뷰티모후",
              "description": "세종시 눈썹문신 반영구 화장 전문. 미대출신 원장의 1:1 맞춤 다이아페더링 눈썹, 워터풀시럽립 입술, 아이라인 시술.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "다솜1로 21",
                "addressLocality": "세종특별자치시",
                "addressRegion": "세종특별자치시",
                "addressCountry": "KR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "36.5040",
                "longitude": "127.0049"
              },
              "telephone": "010-7316-7783",
              "openingHours": "Mo-Su 10:00-20:00",
              "image": "https://beauty-mowho.com/images/hero-bg.jpeg",
              "url": "https://beauty-mowho.com/",
              "priceRange": "$$",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "반영구 화장 시술 메뉴",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "다이아페더링 눈썹 반영구",
                      "description": "다이아몬드 패턴으로 한 올 한 올 자연스러운 눈썹결을 표현하는 프리미엄 반영구 눈썹 시술"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "워터풀시럽립 입술 반영구",
                      "description": "맑고 화사한 입술 톤업을 위한 워터풀시럽립 반영구 입술 시술"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "자연 아이라인 반영구",
                      "description": "붓기·통증 없이 또렷한 눈매를 완성하는 반영구 아이라인 시술"
                    }
                  }
                ]
              },
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
