import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";

//set up main font
const geistSans = Geist
(
  {
    variable: "--font-geist-sans",
    subsets: ["latin"],
  }
);

const geistMono = Geist_Mono
(
  {
    variable: "--font-geist-mono",
    subsets: ["latin"],
  }
);

//page title & description for browser
export const metadata: Metadata = 
{
  title: "Mood Tracker",
  description: "A simple mood tracker web app",
};

// main wrapper for all pages
export default function RootLayout
(
  {
    children,
  }: Readonly<{
  children: React.ReactNode;
}>) 
{
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopMenu />
        {children}
      </body>
    </html>
  );
}