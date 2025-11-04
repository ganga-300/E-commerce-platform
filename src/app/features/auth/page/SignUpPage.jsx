"use client";

import React from "react";
import Link from "next/link";
import SignupForm from "../components/SignupForm";

export default function SignUpPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">Create your account</h1>
        <p className="mb-6 text-sm text-gray-600">
          Join us to save your cart and track orders.
        </p>

        <SignupForm />

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/Login" className="text-[#728f40] font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}


