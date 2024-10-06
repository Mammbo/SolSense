import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Header from "~/components/header";

export const metadata: Metadata = {
  title: "SolSense",
  description: "Leveraging Earth Observation Data for Informed Agricultural Decision-Making",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          {children}
          </body>
      </html>
    </ClerkProvider>
  );
}
