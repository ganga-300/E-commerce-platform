import "./globals.css";
import { CartProvider } from '../contexts/CartContext.js';
import LayoutShell from "./features/shared/components/LayoutShell";

export const metadata = {
  title: "Study Stuff",
  description: "Your stationery store",
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
