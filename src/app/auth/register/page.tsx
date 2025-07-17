"use client";

import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"
import { useState } from "react"

export default function RegisterPage() {
  const [role, setRole] = useState<"TALENT" | "HIRER" | null>(null);
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create your account
          </p>
        </div>
        {role === null ? (
          <div className="flex flex-col gap-4">
            <button
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-200"
              onClick={() => setRole("TALENT")}
            >
              Register as Talent
            </button>
            <button
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-200"
              onClick={() => setRole("HIRER")}
            >
              Register as Hirer
            </button>
          </div>
        ) : (
          <RegisterForm role={role} />
        )}
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign in
          </Link>
        </p>
      </div>
    </div>
  )
} 