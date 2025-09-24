import React from "react";
import Link from "next/link";

const Signup = () => {
     return (
          <div className="grid grid-cols-1 md:grid-cols-2 md:py-15 md:px-20 md:h-110 transition-all duration-300 ">
               <div className="bg-green-600 flex flex-col  text-center py-5 md:pt-10 rounded-lg text-white ">
                    <h2 className="md:text-4xl  font-extrabold pb-6">
                         Welcome Back!
                    </h2>
                    <p className="pb-10">
                         To keep connected with us please login with your
                         personal info
                    </p>

                    <Link href="/auth/login">
                         <button className="cursor-pointer bg-transparent m-auto px-10 py-2 rounded-2xl font-medium text-center uppercase border-1 border-white transition duration-300 hover:bg-white hover:text-green-600">
                              Login
                         </button>
                    </Link>
               </div>
               <form
                    action=""
                    className="flex flex-col bg-slate-200 rounded-r-lg text-center pb-5 space-y-3"
               >
                    <h2 className="text-2xl font-extrabold pt-5 capitalize">
                         Create Account
                    </h2>
                    <span>Icons here</span>
                    <p className="text-[13px] font-semibold pb-3">
                         or use your email for registration
                    </p>
                    <div className="flex flex-col mx-25 space-y-2 ">
                         <input
                              type="text"
                              placeholder="Name"
                              className="bg-slate-100 px-2 py-2 text-sm"
                         />
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
                    </div>
                    <button className="cursor-pointer bg-amber-500 m-auto px-10 py-2 rounded-2xl font-medium text-center uppercase border-1 border-white">
                         Sign up
                    </button>
               </form>
          </div>
     );
};

export default Signup;
