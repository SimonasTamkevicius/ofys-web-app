"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/custom-components/generic/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <motion.div
        initial={{ scale: 1.3 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/contactbg1.png"
          alt="Luxury Costa Rica Property"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      <Navbar />
      <div className="flex flex-1 items-center justify-center z-10">
        <motion.div
          className="w-full max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-card p-8 rounded-2xl shadow-2xl border border-border h-full">
            <h1 className="text-3xl font-head font-bold mb-8 text-center text-primary drop-shadow">
              Admin Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block font-medium text-foreground mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 font-body"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block font-medium text-foreground mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 font-body"
                />
              </div>
              <motion.div
                className="flex justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="submit"
                  className="relative overflow-hidden px-8 py-4 rounded-xl text-primary-foreground font-head font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl w-full max-w-xs"
                  style={{
                    background: "linear-gradient(to right, #85277F, #9E3A95)",
                  }}
                >
                  Login
                </button>
              </motion.div>
              {error && (
                <p className="mt-4 text-center text-destructive font-medium">
                  {error}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
