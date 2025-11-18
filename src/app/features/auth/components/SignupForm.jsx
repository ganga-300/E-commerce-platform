"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "../service";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      await signupUser({ userName: name, email, password, role: "BUYER" });

      setMessage("Signup successful!");

      // Redirect after 1 sec
      setTimeout(() => {
        router.push("/");
      }, 1000);

      console.log("Registered:", { name, email, password });
    } catch (err) {
      console.error("Signup error:", err);
      setMessage(err.message || "Signup failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
        margin: "auto",
        marginTop: "80px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Signup</h2>

      {message && (
        <p style={{ color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
        required
      />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        required
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />

      <button type="submit">Signup</button>
    </form>
  );
}
