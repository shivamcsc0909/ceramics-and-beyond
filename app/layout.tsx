import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { BRAND_INFO } from "@/data/navigation";

export const viewport: Viewport = {
  themeColor: "#1A1916",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ceramicsandbeyond.com"),
  title: {
    default: "Ceramics & Beyond | Architectural Surfaces & Live Kitchen Manufacturing",
    template: "%s | Ceramics & Beyond",
  },
  description:
    "Curated luxury ceramic tiles, continuous porcelain slabs, marble, and bespoke German-precision kitchens crafted live on our factory floor.",
  keywords: [
    "luxury ceramic tiles",
    "porcelain surfaces",
    "marble and natural stone",
    "bespoke kitchens",
    "live kitchen manufacturing",
    "architectural interior materials",
    "designer wall tiles",
    "flooring solutions",
  ],
  authors: [{ name: "Ceramics & Beyond Editorial" }],
  creator: "Ceramics & Beyond",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ceramicsandbeyond.com",
    title: "Ceramics & Beyond | Architectural Surfaces & Live Kitchen Manufacturing",
    description:
      "Beyond Surfaces. Beyond Ordinary. Experience luxury porcelain, natural marble, and our live factory-floor kitchen manufacturing.",
    siteName: "Ceramics & Beyond",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Ceramics & Beyond Architectural Interior and Kitchen Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceramics & Beyond | Architectural Surfaces & Live Kitchen Manufacturing",
    description: "Curated luxury ceramics, porcelain slabs, and live factory-floor kitchen manufacturing.",
    images: ["https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"],
  },
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ceramicsandbeyond.com/#organization",
        name: BRAND_INFO.name,
        url: "https://ceramicsandbeyond.com",
        description: BRAND_INFO.description,
        telephone: BRAND_INFO.contact.phone,
        email: BRAND_INFO.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: BRAND_INFO.contact.address,
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://ceramicsandbeyond.com/#website",
        url: "https://ceramicsandbeyond.com",
        name: BRAND_INFO.name,
        publisher: {
          "@id": "https://ceramicsandbeyond.com/#organization",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-[#292824] bg-[#F5F2EC]">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
