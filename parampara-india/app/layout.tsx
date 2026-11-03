import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Providers } from "@/components/common/providers";
import {
  ADDRESS,
  CONTACT_EMAIL,
  LPG_SAVINGS_CLAIM,
  PHONES,
  SITE_NAME,
  SITE_URL,
} from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parampara India | Wood Gasifier Stoves",
  description:
    `Parampara India manufactures high-efficiency commercial and industrial wood gasifier stoves for hotels, industries, temples, and large kitchens. ${LPG_SAVINGS_CLAIM}.`,
  keywords: [
    "wood gasifier stove",
    "commercial wood gasifier stove",
    "industrial cooking stove",
    "LPG alternative for hotels",
    "Parampara India",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {/* Google Analytics */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-2LB5XHEMS7"
        />
        <Script
          id="google-analytics-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2LB5XHEMS7', {
                page_title: document.title,
                page_location: window.location.href
              });
            `,
          }}
        />

        {/* Pageview Tracking Script */}
        <Script
          id="pageview-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              let currentPath = window.location.pathname;
              const observer = new MutationObserver(() => {
                if (window.location.pathname !== currentPath) {
                  currentPath = window.location.pathname;
                  if (window.gtag) {
                    gtag('config', 'G-2LB5XHEMS7', {
                      page_path: currentPath,
                      page_title: document.title
                    });
                  }
                }
              });
              observer.observe(document.body, { childList: true, subtree: true });
            `,
          }}
        />

        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              email: CONTACT_EMAIL,
              description:
                "Manufacturer of commercial and industrial wood gasifier stoves for hotels, industries, temples and large kitchens in India.",
              address: {
                "@type": "PostalAddress",
                streetAddress: ADDRESS.streetAddress,
                addressLocality: ADDRESS.locality,
                addressRegion: ADDRESS.region,
                postalCode: ADDRESS.postalCode,
                addressCountry: ADDRESS.country,
              },
              telephone: PHONES.map((phone) => phone.tel),
              contactPoint: PHONES.map((phone) => ({
                "@type": "ContactPoint",
                telephone: phone.tel,
                contactType: "Sales",
                email: CONTACT_EMAIL,
              })),
              sameAs: [
                "https://www.instagram.com/indiaparampara",
                "https://www.youtube.com/@BadukinaButthi",
              ],
            }),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
