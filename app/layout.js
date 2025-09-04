import Footer from "./components/footer";
import Header from "./components/header";
import Popup from "./components/popup";
import { PopupProvider } from "../context/popupContext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export async function generateMetadata({ params }) {
  try{
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFULL_ENVIRONMENT_ID}/entries?content_type=seo`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        next: { revalidate: 60 }, // optional caching
      }
    );


    if(!res.ok){
      throw new Error("Failed to fetch SEO data");
    }

    const data = await res.json();

    const post = data.items[0].fields;
    
    return {
      metadataBase: new URL(
        process.env.NODE_ENV === "production"
          ? "https://pandatattoo.com"
          : "http://localhost:3000"
      ),
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      url: post.canonicalUrl,
      siteName: post.title,
      images: [
        {
          url: post.ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.twitterCardUrl],
    },
  };
} catch (error) {
  console.error("Error fetching SEO data:", error);
  // Fallback SEO metadata
  return {
    metadataBase: new URL(
      process.env.NODE_ENV === "production"
        ? "https://pandatattoo.com"
        : "http://localhost:3000"
    ),
    title: "Panda Tattoo – Fine Line & Realism Tattoo Studio in Miami, FL",
    description:
      "Panda Tattoo in Miami, FL offers award-winning fine-line, realism, and piercing services. Established artists deliver custom, high-definition tattoos in a welcoming studio—book your appointment today!",
    keywords:
      "Panda Tattoo, Miami tattoo shop, fine line tattoos, realism tattoos, custom tattoos, piercing services, Miami tattoo studio, Tatu Panda",
    openGraph: {
      title: "Panda Tattoo – Fine Line & Realism Tattoo Studio in Miami, FL",
      description:
        "Panda Tattoo in Miami, FL offers award-winning fine-line, realism, and piercing services. Established artists deliver custom, high-definition tattoos in a welcoming studio—book your appointment today!",
      url: "https://pandatattoo.com",
      siteName: "Panda Tattoo",
      images: [
        {
          url: "/panda-logo-black.png",
          width: 1200,
          height: 630,
          alt: "Panda Tattoo – Fine Line & Realism Tattoo Studio in Miami, FL",
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: "Panda Tattoo – Fine Line & Realism Tattoo Studio in Miami, FL",
      description:
        "Panda Tattoo in Miami, FL offers award-winning fine-line, realism, and piercing services. Established artists deliver custom, high-definition tattoos in a welcoming studio—book your appointment today!",
      images: ["/panda-logo-black.png"],
    },
    other: {
      keywords:
        "Panda Tattoo, Miami tattoo shop, fine line tattoos, realism tattoos, custom tattoos, piercing services, Miami tattoo studio, Tatu Panda",
    },
  };
}
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/panda-logo-black.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#090d11]`}
      >
        <PopupProvider>
          <Header />
          {children}
          <Footer />
          <Popup />
        </PopupProvider>
      </body>
    </html>
  );
}
