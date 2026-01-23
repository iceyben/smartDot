"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
     const { data: session, status } = useSession();
     const router = useRouter();

     useEffect(() => {
          if (status === "authenticated") {
               router.push("/dashboard");
          }
     }, [status, router]);

     if (status === "loading") {
          return (
               <div className="flex justify-center items-center h-screen bg-gray-50">
                    <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
               </div>
          );
     }
     return (
          <div className="flex justify-center items-center py-10 px-4 min-h-[80vh]">
               <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                         <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                         <p className="text-gray-500 mt-2">Join SmartDotCom for the best deals</p>
                    </div>

                    <form className="space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                   <input
                                        type="text"
                                        placeholder="John"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                   <input
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                                   />
                              </div>
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                              <input
                                   type="email"
                                   placeholder="name@example.com"
                                   className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                              />
                         </div>
                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                              <input
                                   type="password"
                                   placeholder="••••••••"
                                   className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                              />
                         </div>

                         <div className="pt-2">
                              <label className="flex items-start gap-2 cursor-pointer text-xs text-gray-500 mb-4">
                                   <input type="checkbox" className="mt-0.5 rounded text-green-600 focus:ring-green-500" />
                                   <span>By creating an account, you agree to our <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>.</span>
                              </label>

                              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-200 uppercase tracking-wide">
                                   Create Account
                              </button>
                         </div>
                    </form>

                    <div className="relative my-8">
                         <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-200"></div>
                         </div>
                         <div className="relative flex justify-center text-sm">
                              <span className="px-2 bg-white text-gray-500">Or continue with</span>
                         </div>
                    </div>

                    <button
                         onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                         className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl border border-gray-200 transition-all shadow-md active:scale-[0.98] cursor-pointer"
                    >
                         <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                         Sign up with Google
                    </button>

                    <div className="mt-8 text-center border-t pt-6">
                         <p className="text-gray-600">
                              Already have an account?{" "}
                              <Link href="/login" className="text-green-600 font-bold hover:underline">
                                   Sign in
                              </Link>
                         </p>
                    </div>
               </div>
          </div>
     );
}
