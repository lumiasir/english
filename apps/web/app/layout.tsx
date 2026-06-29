import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | ENGLISH",
    default: "Nền tảng học tiếng Anh thế hệ mới",
  },
  description:
    "Nền tảng học tiếng Anh thế hệ mới cho người Việt Nam (A1–C2). Kết hợp 6 kỹ năng với AI chấm điểm và SRS.",
  metadataBase: new URL("https://edu.doanquangkien.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans font-normal text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
