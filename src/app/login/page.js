"use client";
import Image from "next/image";
import { useState } from "react";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      window.location.href = "/home";
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center">
      <Image src="/bg.jpg" alt="bg" fill className="object-cover -z-10" />

      <div
        className="relative bg-[#fffef5] w-full max-w-sm rounded-sm shadow-2xl px-10 py-12"
        style={{
          backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, #d4c9b0 31px, #d4c9b0 32px)`,
          boxShadow: "4px 4px 0 #d4c9b0, 8px 8px 0 #e8e0cc",
        }}
      >
        <div className="absolute top-0 bottom-0 left-16 w-px bg-red-300/60" />

        <div className="relative pl-6 flex flex-col gap-6">
          <h1 className="text-2xl font-medium text-gray-700">
            Welcome po, my nigga
          </h1>
          <input
            type="text"
            placeholder="username"
            className="bg-transparent border-b border-gray-400 outline-none text-gray-700 placeholder:text-gray-400 py-1"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            placeholder="password"
            className="bg-transparent border-b border-gray-400 outline-none text-gray-700 placeholder:text-gray-400 py-1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button 
          className="mt-2 w-full rounded-full border-2 border-gray-400 py-2 text-gray-700 hover:border-red-300 transition-colors"
          onClick={handleLogin}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;