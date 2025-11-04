import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '../contexts/CartContext.js';
import LayoutShell from "./features/shared/components/LayoutShell";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'StudyStuff',
  description: 'Stationery supplies made easy',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <CartProvider>   
            <LayoutShell>
            {children}
            </LayoutShell>
      </CartProvider>
      </body>
    </html>
  );
}
