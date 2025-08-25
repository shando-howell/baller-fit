import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/auth";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";

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
      <body className='bg-sky-100'>
        <AuthProvider>
          <NavBar />
          {children}
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
