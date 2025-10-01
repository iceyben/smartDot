"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";

// Validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      // On successful login, redirect to dashboard or home
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:py-15 md:px-20 md:h-110 transition-all duration-300 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-slate-200 rounded-l-lg text-center py-5 space-y-3 "
      >
        <h2 className="text-2xl font-extrabold pt-3 capitalize">Log in</h2>
        <span>
          <FaFacebookF className="inline text-blue-600 text-2xl mx-2 cursor-pointer" />
          <FcGoogle className="inline text-2xl mx-2 cursor-pointer" />
          <BsApple className="inline text-2xl mx-2 cursor-pointer" />
        </span>
        <p className="text-[13px] font-semibold pb-3">
          or use your account
        </p>

        <div className="flex flex-col mx-25 space-y-2 px-10">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="bg-slate-100 px-2 py-2 text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="bg-slate-100 px-2 py-2 text-sm"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          <p className="text-[11px] hover:text-blue-500 hover:underline cursor-pointer text-right">
            Forgot your password?
          </p>
        </div>

        {error && (
          <div role="alert" className="text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-amber-500 m-auto px-10 py-2 rounded-2xl font-medium text-center uppercase border-1 border-white cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div className="bg-green-600 flex flex-col text-center py-5 md:pt-10 rounded-lg text-white">
        <h2 className="md:text-4xl font-extrabold pb-6">
          You Need An Account!
        </h2>
        <p className="pb-10">
          Enter your personal details and start now!
        </p>

        <Link href="/signup">
          <button className="cursor-pointer bg-transparent m-auto px-10 py-2 rounded-2xl font-medium text-center uppercase border-1 border-white transition duration-300 hover:bg-white hover:text-green-600">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
