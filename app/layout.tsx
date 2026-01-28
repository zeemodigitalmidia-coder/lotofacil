import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Loto Premiada - IA que Prevê Lotofácil com Alta Precisão",
  description:
    "Pare de perder dinheiro na Lotofácil! A Loto Premiada é uma IA revolucionária que analisa padrões ocultos e aumenta suas chances de acerto. Pessoas reais acertando 14 pontos!",
  keywords: [
    "lotofácil",
    "loteria",
    "IA loteria",
    "previsão lotofácil",
    "acertar lotofácil",
    "loto premiada",
    "inteligência artificial loteria",
  ],
  authors: [{ name: "Loto Premiada" }],
  generator: "v0.app",
  openGraph: {
    title: "Loto Premiada - IA que Prevê Lotofácil",
    description:
      "Pare de perder! Veja como a IA está mudando o jogo da Lotofácil. Acertos reais de 14 pontos!",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loto Premiada - IA que Prevê Lotofácil",
    description:
      "Pare de perder! Veja como a IA está mudando o jogo da Lotofácil.",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#005AA7" },
    { media: "(prefers-color-scheme: dark)", color: "#005AA7" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* VERIFICAÇÃO DE DOMÍNIO META */}
        <meta
          name="facebook-domain-verification"
          content="63pf4i5dqx30i73mjoxw91gi8v6ak6"
        />

        {/* Preconnect Meta */}
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* META PIXEL */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1566629481014555');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* BLOQUEIOS (ANTI-SCRAPING) */}
        <Script id="anti-scraping" strategy="afterInteractive">
          {`
            const prevent = (e) => e.preventDefault();
            document.addEventListener('contextmenu', prevent);
            document.addEventListener('dragstart', prevent);
            document.addEventListener('copy', prevent);

            document.addEventListener('keydown', function(e) {
              if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
                (e.ctrlKey && e.key === 's')
              ) {
                e.preventDefault();
              }
            });

            document.body.style.userSelect = 'none';
          `}
        </Script>
      </head>

      <body className="font-sans antialiased">
        {/* NOSCRIPT PIXEL */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1566629481014555&ev=PageView&noscript=1"
          />
        </noscript>

        {children}
        <Analytics />
      </body>
    </html>
  )
}
