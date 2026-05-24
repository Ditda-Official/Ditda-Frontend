import "@/app/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ditda",
  description: "ditda",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
