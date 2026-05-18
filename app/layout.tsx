import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "配当サムライ | 配当手取りシミュレーター",
  description: "自分で選んだ銘柄と投資額から、日本の税率を反映した配当の手取り目安を確認できます。銘柄推奨ではありません。",
  openGraph: {
    title: "配当サムライ / Haitou Samurai",
    description: "投資額、配当利回り、日本の税率から毎月の手取りを試算します。",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
