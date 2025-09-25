"use client"; // needed because we’re using useState in the page

import React, { useState } from "react";
import EmployeeCard from "./components/Card";
import AddEmployeebtn from "./components/AddEmployeebtn";
import Popup from "./components/Popup";

const Page = () => {
     const [showPopup, setShowPopup] = useState(false);

     return (
          <div className="bg-white">
               {/* Pass click handler into button */}
               <AddEmployeebtn onClick={() => setShowPopup(true)} />

               {/* Popup */}
               <Popup show={showPopup} onClose={() => setShowPopup(false)}>
                    <form action="" className="flex flex-col space-y-3">
                         <p className="text-center text-[11px] font-medium">
                              Create a New Employee
                         </p>
                         <input
                              type="text"
                              placeholder="Enter Full Name"
                              className="text-sm border-2 border-slate-300 px-3 py-2 rounded-md"
                         />
                         <input
                              type="email"
                              placeholder="Enter Email"
                              className="text-sm border-2 border-slate-300 px-3 py-2 rounded-md"
                         />
                         <input
                              type="phone"
                              placeholder="Phone"
                              className="text-sm border-2 border-slate-300 px-3 py-2 rounded-md"
                         />
                         <input
                              type="date"
                              placeholder="Start Date "
                              className="text-sm border-2 border-slate-300 px-3 py-2 rounded-md"
                         />
                         <input
                              type="password"
                              placeholder="Password"
                              className="text-sm border-2 border-slate-300 px-3 py-2 rounded-md"
                         />
                         <input
                              type="password"
                              placeholder="Confirm Password"
                              className="text-sm border-2 border-slate-300 px-3 py-2 rounded-md"
                         />
                         <button className="bg-amber-400 px-3 py-1 rounded-md text-white hover:bg-amber-600">
                              {" "}
                              Register Now{" "}
                         </button>
                    </form>
               </Popup>

               {/* Employee cards */}
               <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 px-5">
                    <EmployeeCard
                         src="/employee.png"
                         alt="employee photo"
                         position="Sales Person"
                         phone="+250-943-883-349"
                         email="example@gmail.com"
                         name="John Kollie"
                    />

                    <EmployeeCard
                         src="/employee.png"
                         alt="employee photo"
                         position="Sales Person"
                         phone="+250-943-883-349"
                         email="example@gmail.com"
                         name="John Kollie"
                    />

                    <EmployeeCard
                         src="/employee.png"
                         alt="employee photo"
                         position="Sales Person"
                         phone="+250-943-883-349"
                         email="example@gmail.com"
                         name="John Kollie"
                    />
               </div>
          </div>
     );
};

export default Page;
