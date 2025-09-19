

"use client"

import React from 'react';
import Link from 'next/link';
import { FiShoppingCart } from "react-icons/fi"
import { useCart } from '../Context/Cartcontext.js';
import { useAuth } from '../Context/AuthContext'; 
import { auth } from '../../firebase.js'; 
import { useRouter } from 'next/navigation';

function Navbar() {
 const { totalItems, clearCart } = useCart();
const { user } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  await auth.signOut();
  clearCart();             
  router.push('/');       
  window.location.reload(); 
};
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-gray-200">

      <div className="flex items-center space-x-6">
        <h1 style={{ fontFamily: 'TTRamillas' }} className="text-4xl font-bold text-black">
          Study<span style={{ color: '#637D37' }}>Stuff</span>
        </h1>

        <div className="relative w-full max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112.75 5.25a7.5 7.5 0 014.9 11.4z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products"
            className="pl-10 pr-4 py-2 h-10 w-100 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-8 pr-6">
        <Link href="/About" className="cursor-pointer px-4 py-1 hover:text-green-700">
          About us
        </Link>

        {user ? (
          <>
            <h2 className="text-gray-1000 cursor-pointer px-4 py-1">Account</h2>
            <h2 className="text-gray-1000 cursor-pointer px-4 py-1">Wishlist</h2>
            <button
               onClick={handleLogout}
              className="text-red-600 px-4 py-1"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/Login" className="text-blue-700">Login</Link>
            <Link href="/Signup" className="text-blue-700">Signup</Link>
          </>
        )}

        <div className="relative">
          <Link href="/Cart">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all
              ${totalItems > 0 ? 'bg-[#728f40]' : 'bg-gray-400'}`}
            >
              <span>Cart ({totalItems})</span>
              <FiShoppingCart className="text-lg" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
