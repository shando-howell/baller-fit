import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/auth";
import NavBar from "@/components/NavBar";
import { Poppins } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
  title: "BallerFit",
  description: "BallerFit Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-sky-100`}>
        <AuthProvider>
          <NavBar />
          {children}
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
