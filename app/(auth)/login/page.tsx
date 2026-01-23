"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState<"google" | "credentials">("google");

  useEffect(() => {
    if (status === "authenticated") {
      const isAdmin = session?.user?.role === "ADMIN";
      router.push(isAdmin ? "/admin" : "/dashboard");
    }
  }, [status, router, session]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result?.ok) {
        setError(result?.error || "Login failed");
        return;
      }

      router.push("/admin");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signIn("google", { 
        callbackUrl: "/auth/callback",
        redirect: false,
      });
      
      if (!result?.ok) {
        setError(`Google sign-in failed: ${result?.error || "Unknown error"}`);
        return;
      }
      
      router.push(result.url || "/auth/callback");
    } catch (err) {
      setError("Google sign-in failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">SmartDot</h1>
          <p className="text-gray-500 mt-2">Welcome Back</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Login Method Toggle */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setLoginMethod("google")}
            className={`flex-1 py-2 rounded-md font-medium transition-all ${
              loginMethod === "google"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
          >
            Google
          </button>
          <button
            onClick={() => setLoginMethod("credentials")}
            className={`flex-1 py-2 rounded-md font-medium transition-all ${
              loginMethod === "credentials"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
          >
            Email & Password
          </button>
        </div>

        {/* Google Login */}
        {loginMethod === "google" && (
          <form className="space-y-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 disabled:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl border border-gray-200 transition-all shadow-md active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              {loading ? "Connecting to Google..." : "Sign in with Google"}
            </button>
          </form>
        )}

        {/* Email & Password Login */}
        {loginMethod === "credentials" && (
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-200 uppercase tracking-wide disabled:shadow-none"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        )}

        <div className="mt-8 text-center border-t pt-6">
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-green-600 font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
