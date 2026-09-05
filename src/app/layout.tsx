import type { Metadata } from "next";
import Script from "next/script";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { siteConfig } from "./lib/site";
import "./globals.css";

const siteTitle = `${siteConfig.name} | Design & engineering`;

export const metadata: Metadata = {
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteTitle,
    template: `%s | ${siteConfig.name}`,
  },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: siteTitle,
    type: "website",
    url: "/",
  },
};

const GTM_ID = "GTM-525FSMMS";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-32">
      <body className="min-h-screen bg-white font-sans text-black antialiased selection:bg-black selection:text-white">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            className="invisible hidden"
            title="Google Tag Manager"
          />
        </noscript>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
