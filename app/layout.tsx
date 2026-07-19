import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "理解他人 — 测测你有多了解她",
  description: "一套有趣的互动测试，猜猜你的好朋友会怎么选，把链接发给她来验证！",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <main className="max-w-2xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
