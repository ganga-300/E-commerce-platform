import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar'; 
import Footer from "./components/Footer";
import { CartProvider } from './Context/Cartcontext.js';
import { AuthProvider } from './Context/AuthContext';


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
        <AuthProvider>
            <Navbar />  
            {children}
            <Footer />
        </AuthProvider>
      </CartProvider>
      </body>
    </html>
  );
}
