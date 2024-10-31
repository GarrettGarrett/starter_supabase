import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Providers } from "@/utilities/providers";
import { Toaster } from "@/components/ui/toaster";

const APP_NAME = "";
const DEFAULT_TITLE = `${APP_NAME} - `;
const DEFAULT_DESCRIPTION = `${APP_NAME} `;
const DEFAULT_IMAGE = "/og_image.png";
const DOMAIN = "http://www.yourdomain.com";


const fontHeading = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: "700",
});

const fontBody = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: "400",
});

function generateMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  icons = [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
  noIndex = false,
  canonicalUrl,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: Metadata["icons"];
  noIndex?: boolean;
  canonicalUrl?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      siteName: APP_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "",
    },
    icons,
    metadataBase: new URL(DOMAIN),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export const metadata = generateMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <Providers
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
