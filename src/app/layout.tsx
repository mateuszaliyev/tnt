import type { ReactNode } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { environment } from "@/environment.mjs";

import { cx } from "@/utilities/classname";

import { Providers } from "./providers";

import "./style.css";

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(environment.NEXT_PUBLIC_BASE_URL),
  robots: {
    follow: false,
    googleBot: {
      follow: false,
      index: false,
      indexifembedded: false,
      "max-image-preview": "none",
      noarchive: true,
      nocache: true,
      noimageindex: true,
      nositelinkssearchbox: true,
      nosnippet: true,
      notranslate: true,
    },
    index: false,
    indexifembedded: false,
    "max-image-preview": "none",
    noarchive: true,
    nocache: true,
    noimageindex: true,
    nositelinkssearchbox: true,
    nosnippet: true,
    notranslate: true,
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const RootLayout = ({ children }: RootLayoutProps) => (
  <html
    className={cx("scroll-smooth", inter.variable)}
    lang="en"
    suppressHydrationWarning
  >
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
