import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pavelgaraev.com"),
  title: {
    default: "Pavel Garaev | Senior full-stack engineer",
    template: "%s | Pavel Garaev",
  },
  description:
    "Senior full-stack engineer working on AI products, data platforms, web applications, Next.js, and React Native apps.",
  authors: [{ name: "Pavel Garaev", url: "https://pavelgaraev.com" }],
  creator: "Pavel Garaev",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    description:
      "Full-stack engineering for AI products, data platforms, web applications, and mobile apps.",
    siteName: "Pavel Garaev",
    title: "Pavel Garaev | Senior full-stack engineer",
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
    <html lang="en">
      <body className={`${sans.variable} bg-white text-slate-950 antialiased`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
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
