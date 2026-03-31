import type { Metadata } from "next";
import "./globals.css";
import LoadingOverlay from "../components/LoadingOverlay";
import WhatsAppFloat from "../components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "AVILPRO | Thrissur's Favourite Premium Avilmilk Brand",
  description: "Experience the legendary Avil Milk reimagined. Premium ingredients, 60+ flavours, and an authentic heritage of taste. Located in Chavakkad, Thrissur, Kochi.",
  keywords: ["Avil Milk", "Premium Milkshakes", "Thrissur Food", "Avilpro", "Kerala Desserts", "Healthy Drinks"],
  icons: {
    icon: "/avil-pro-removebg-preview.png",
    apple: "/avil-pro-removebg-preview.png",
  },
  openGraph: {
    title: "AVILPRO | The Art of Authentic Avil Milk",
    description: "Premium Avil Milk brand with a boutique experience. Discover our Flavour Studio.",
    url: "https://avilpro.in",
    siteName: "Avilpro",
    images: [
      {
        url: "/hero-drink.png",
        width: 1200,
        height: 630,
        alt: "Premium Avil Milk",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/avil-pro-removebg-preview.png" sizes="any" />
        {/* Force the very first paint to yellow — eliminates white flash before loader mounts */}
        <style>{`html, body { background-color: #FBE106 !important; overflow: hidden; }`}</style>
      </head>
      <body>
        <LoadingOverlay />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
