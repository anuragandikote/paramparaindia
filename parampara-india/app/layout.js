import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatingVideo from "@/common/floatingVideo";
import ChatBot from "@/common/chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Parampara India | Wood Gasifier Stoves",
  description:
    "Parampara India manufactures high-efficiency commercial and industrial wood gasifier stoves for hotels, industries, temples, and large kitchens. Save up to 80% on LPG costs.",
  keywords: [
    "wood gasifier stove",
    "commercial wood gasifier stove",
    "industrial cooking stove",
    "LPG alternative for hotels",
    "Parampara India",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
              // Track page views on route changes
              let currentPath = window.location.pathname;
              
              // Observer for navigation changes (for SPA)
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
              name: "Parampara India",
              url: "https://paramparaindia.in",
              logo: "https://paramparaindia.in/logo.png",
              description:
                "Manufacturer of commercial and industrial wood gasifier stoves for hotels, industries, temples and large kitchens in India.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressRegion: "KA",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-7019713708",
                contactType: "Sales",
              },
              sameAs: [
                "https://www.instagram.com/indiaparampara",
                "https://www.youtube.com/@BadukinaButthi",
              ],
            }),
          }}
        />
        <FloatingVideo />
        <ChatBot />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
