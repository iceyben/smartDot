import React from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";



const Login = () => {
     return (
          <div className="grid grid-cols-1 md:grid-cols-2 md:py-15 md:px-20 md:h-110 transition-all duration-300 ">
               <form
                    action=""
                    className="flex flex-col bg-slate-200 rounded-l-lg text-center py-5 space-y-3 "
               >
                    <h2 className="text-2xl font-extrabold pt-3 capitalize">
                         Log in
                    </h2>
                    <span>
                         <FaFacebookF className="inline text-blue-600 text-2xl mx-2 cursor-pointer" />
                         <FcGoogle className="inline text-2xl mx-2 cursor-pointer" />
                         <BsApple className="inline text-2xl mx-2 cursor-pointer" />
                    </span>
                    <p className="text-[13px] font-semibold pb-3">
                         or use your account
                    </p>
                    <div className="flex flex-col mx-25 space-y-2 ">
                         <input
                              type="email"
                              placeholder="Email"
                              className="bg-slate-100 px-2 py-2 text-sm"
                         />
                         <input
                              type="password"
                              placeholder="Password"
                              className="bg-slate-100 px-2 py-2 text-sm"
                         />
                         <p className="text-[11px] hover:text-blue-500 hover:underline cursor-pointer">
                              Forgot your password?
                         </p>
                    </div>
                    <button className="bg-amber-500 m-auto px-10 py-2 rounded-2xl font-medium text-center uppercase border-1 border-white cursor-pointer">
                         Log In
                    </button>
               </form>
               <div className="bg-green-600 flex flex-col  text-center py-5 md:pt-10 rounded-lg text-white  ">
                    <h2 className="md:text-4xl  font-extrabold pb-6">
                         You Need An Acount!
                    </h2>
                    <p className="pb-10">
                         Enter your personal details and start now!
                    </p>

                    <Link href="/auth/signup">
                         <button className="cursor-pointer bg-transparent m-auto px-10 py-2 rounded-2xl font-medium text-center uppercase border-1 border-white transition duration-300 hover:bg-white hover:text-green-600">
                              Sign up
                         </button>
                    </Link>
               </div>
          </div>
     );
};

export default Login;
