"use client";

<<<<<<< HEAD
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../service";
=======
import { useState } from "react";
import { useRouter } from "next/navigation";
>>>>>>> d1c6c3e (added login and signup)

export default function LoginForm({ onSuccess }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await loginUser({ email, password });
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", "true");
        if (result && result.token) {
          localStorage.setItem("authToken", result.token);
        }
      }
      if (typeof onSuccess === "function") onSuccess(result);
      router.push("/");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
=======
  const [message, setMessage] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      setMessage("Login successful!");
      console.log("Logged in:", data);

     
      router.push("/");

    } catch (err) {
      setMessage(err.message);
>>>>>>> d1c6c3e (added login and signup)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#728f40]"
          placeholder="you@example.com"
        />
      </div>

<<<<<<< HEAD
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#728f40]"
          placeholder="••••••••"
        />
      </div>
=======
      {message && (
        <p style={{ color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        required
      />
>>>>>>> d1c6c3e (added login and signup)

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-[#728f40] px-4 py-2 font-semibold text-white transition-opacity disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
