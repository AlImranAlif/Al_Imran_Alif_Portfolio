import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";
const inter = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = localFont({
  src: "../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${site.name} — ${site.headline}`,
    template: `%s | ${site.name}`,
  },
  description: site.pitch,
  applicationName: "Al Imran Alif Portfolio",
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.headline}`,
    description: site.tagline,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.headline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.headline}`,
    description: site.tagline,
    images: ["/social-card.png"],
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0f14" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
  ],
};
const themeScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
