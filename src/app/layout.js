import "./globals.css";
import { CartProvider } from '../contexts/CartContext.js';
import LayoutShell from "./features/shared/components/LayoutShell";

// Import Google fonts (or any other font you prefer)
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Study Stuff",
  description: "Your stationery store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <CartProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </CartProvider>
      </body>
    </html>
  );
}
