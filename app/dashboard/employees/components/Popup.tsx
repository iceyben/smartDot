"use client"; // needed in Next.js 13+ (app router) for stateful components

import React from "react";
interface PopupProps {
     show: boolean;
     onClose: () => void;
     children: React.ReactNode;
}

const Popup = ({ show, onClose, children }: PopupProps) => {
     if (!show) return null;

     return (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-50">
               <div className="bg-slate-200 rounded-2xl shadow-lg p-6 w-96  ">
                    <div className="flex justify-between items-start pb-4">
                         <h2>Employee Registration</h2>

                         <button
                              onClick={onClose}
                              className=" text-md cursor-pointer hover:bg-red-600 transition-colors duration-75 bg-amber-300 rounded-full hover:text-slate-200 px-1"
                         >
                              ✕
                         </button>
                    </div>
                    {children}
               </div>
          </div>
     );
};

export default Popup;
