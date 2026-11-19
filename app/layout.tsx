import "./globals.css";
import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Air Duct Cleaning & Roof Cleaning Services`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  keywords: ["air duct cleaning", "roof cleaning", "soft wash roof cleaning", "HVAC duct cleaning", "dryer vent cleaning", "roof moss removal", "duct cleaning near me", "roof cleaning near me"],
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: SITE.name, url: SITE.url, title: `${SITE.name} | Air Duct & Roof Cleaning`, description: SITE.description, images: [{ url: "/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description, images: ["/og.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/icon.svg" },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};
export const viewport: Viewport = { themeColor: "#0E5A8A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = {
    "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", "@id": `${SITE.url}/#business`,
    name: SITE.name, url: SITE.url, logo: `${SITE.url}/logo.svg`, image: `${SITE.url}/og.png`, email: SITE.email,
    ...(SITE.phone ? { telephone: SITE.phone } : {}), description: SITE.description, areaServed: { "@type": "Country", name: "United States" },
    makesOffer: [{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Air Duct Cleaning" } }, { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roof Cleaning" } }],
  };
  const web = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE.url}/#website`, name: SITE.name, url: SITE.url, publisher: { "@id": `${SITE.url}/#business` } };
  return (
    <html lang="en-US"><body>
      <JsonLd data={org} /><JsonLd data={web} />
      <Header /><main>{children}</main><Footer />
    </body></html>
  );
}
