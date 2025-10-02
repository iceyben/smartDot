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

// Schema with validation
const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

const Signup = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpValues) => {
    setError(null);
    const { confirmPassword, ...submitData } = data;

    try {
      const res = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!res.ok) {
        let message = "Signup failed";
        try {
          const errorData = await res.json();
          message = errorData.message || message;
        } catch (e) {
          // Could not parse error body
        }
        throw new Error(message);
      }

      router.push("/dashboard"); // Or wherever you want to redirect
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:py-15 md:px-20 md:h-110 transition-all duration-300">
      {/* Left side: Login CTA */}
      <div className="bg-green-600 flex flex-col text-center py-5 md:pt-10 rounded-lg text-white">
        <h2 className="md:text-4xl font-extrabold pb-6">Welcome Back!</h2>
        <p className="pb-10">
          To keep connected with us please login with your personal info
        </p>
        <Link href="/login">
          <button className="cursor-pointer bg-transparent m-auto px-10 py-2 rounded-2xl font-medium text-center uppercase border border-white transition duration-300 hover:bg-white hover:text-green-600">
            Login
          </button>
        </Link>
      </div>

      {/* Right side: Signup Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-slate-200 rounded-r-lg text-center pb-5 space-y-3"
      >
        <h2 className="text-2xl font-extrabold pt-5 capitalize">
          Create Account
        </h2>
        <span>
          <FaFacebookF className="inline text-blue-600 text-2xl mx-2 cursor-pointer" />
          <FcGoogle className="inline text-2xl mx-2 cursor-pointer" />
          <BsApple className="inline text-2xl mx-2 cursor-pointer" />
        </span>
        <p className="text-[13px] font-semibold pb-3">
          or use your email for registration
        </p>

        <div className="flex flex-col mx-25 space-y-2 px-10">
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="bg-slate-100 px-2 py-2 text-sm rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="bg-slate-100 px-2 py-2 text-sm rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="bg-slate-100 px-2 py-2 text-sm rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="bg-slate-100 px-2 py-2 text-sm rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {error && (
          <div role="alert" className="text-sm text-red-600 px-10">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer bg-amber-500 m-auto px-10 py-2 rounded-2xl font-medium text-center uppercase border border-white disabled:opacity-50"
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
