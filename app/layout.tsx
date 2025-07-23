import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LocalMeet",
  description: "A video conferencing application",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider 
      appearance={{
        layout:{
          logoImageUrl:"/icons/logo.svg",
          socialButtonsVariant:"iconButton"
        },
        variables:{
          colorText: "#fff",
          colorPrimary:"0E78F9",
          colorBackground:"#1c1f2e",
          colorInputBackground:"#252a41",
          colorInputText:"#fff"
        }
      }}
      >
        <body className={`${inter.variable} antialiased bg-2`}>{children}
          <Toaster/>
        </body>
      </ClerkProvider>
    </html>
  );
}
