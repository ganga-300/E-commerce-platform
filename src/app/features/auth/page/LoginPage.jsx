"use client";

import React from "react";
import Link from "next/link";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">Welcome back</h1>
        <p className="mb-6 text-sm text-gray-600">
          Sign in to continue your shopping.
        </p>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/Signup" className="text-[#728f40] font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}


