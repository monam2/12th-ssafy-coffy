import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "삽히코히",
    template: "%s | 삽히코히",
  },
  description: "광주캠퍼스에서 커피가 마시고 십허요.",
  icons: {
    icon: "/img/logo/logo-sm.png",
    shortcut: "/img/logo/logo-sm.png",
    apple: "/img/logo/logo-sm.png",
  },
  openGraph: {
    title: "삽히코히 SSAFY-COFY",
    description: "광주캠퍼스에서 커피가 마시고 십허요.",
    images: [
      {
        url: "https://ssafy-cofy.vercel.app/images/thumbnail.png",
        width: 800,
        height: 600,
        alt: "thumbnail",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
