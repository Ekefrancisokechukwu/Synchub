import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/providers/AppProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synchub",
  description: "linker synchub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <ThemeProvider>
            <div className="max-w-[1600px] mx-auto ">{children}</div>
            <Toaster
              toastOptions={{
                style: {
                  background: "#242323",
                  color: "#fff",
                },
                className: "class",
              }}
            />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
