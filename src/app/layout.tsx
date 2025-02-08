import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Explorer - Discover Movies",
  description:
    "Explore and discover movies with our Movie Explorer app. Search for your favorite movies, view details, and save your favorites.",
  keywords: [
    "movies",
    "movie explorer",
    "search movies",
    "movie database",
    "movie details",
  ],
  openGraph: {
    title: "Movie Explorer - Discover Movies",
    description:
      "Discover movies with our Movie Explorer app. Search for your favorite movies, view details, and save your favorites.",
    url: "https://your-movie-explorer-app.com",
    type: "website",
    images: [
      {
        url: "https://your-movie-explorer-app.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Movie Explorer Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "Movie Explorer - Discover Movies",
    description:
      "Explore and discover movies with our Movie Explorer app. Search for your favorite movies, view details, and save your favorites.",
    images: ["https://your-movie-explorer-app.com/twitter-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        <div className="pt-12 bg-secondary">
        {children}
        </div>
        
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
