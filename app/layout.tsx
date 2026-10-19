import type { Metadata } from "next";
import { restaurant } from "@/data/restaurant";
import { displayFont, sansFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "The White Rabbit | Kathmandu",
  description: "Find The White Rabbit in Pepsicola, Kathmandu. A place to celebrate life's special moments.",
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) } : {}),
  openGraph: { title: "The White Rabbit", description: "A place to celebrate life's special moments.", ...(process.env.NEXT_PUBLIC_SITE_URL ? { images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/gallery/chicken-burger.png`] } : {}), type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { "@context": "https://schema.org", "@type": "Restaurant", name: restaurant.name, telephone: restaurant.phone, address: { "@type": "PostalAddress", streetAddress: restaurant.address, addressLocality: "Kathmandu", addressCountry: "NP" }, openingHours: "Mo-Su 10:30-22:00", priceRange: restaurant.priceRange, ...(process.env.NEXT_PUBLIC_SITE_URL ? { hasMenu: `${process.env.NEXT_PUBLIC_SITE_URL}/menu` } : {}) };
  return <html lang="en"><body className={`${displayFont.variable} ${sansFont.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</body></html>;
}
