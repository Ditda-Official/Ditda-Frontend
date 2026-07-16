import "@/app/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ditda",
  description: "학원을 위한 맞춤형 1:N 디자인 외주 매칭 서비스",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "ditda",
    description: "학원을 위한 맞춤형 1:N 디자인 외주 매칭 서비스",
    images: ["/images/og-thumbnail.png"],
    url: "https://ditda.kr",
    siteName: "ditda",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex h-full flex-col overflow-hidden">{children}</body>
    </html>
  );
}
