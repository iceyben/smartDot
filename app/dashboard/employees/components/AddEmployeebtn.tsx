import React from "react";
import { FaPlus } from "react-icons/fa6";

interface AddEmployeebtnProps {
     onClick: () => void;
}

const AddEmployeebtn = ({ onClick }: AddEmployeebtnProps) => {
     return (
          <div className="flex justify-between items-center px-6 py-2">
               <h1>Employees</h1>
               <button
                    onClick={onClick}
                    className="flex items-center justify-center space-x-2 bg-amber-300 px-2 py-1 rounded-md hover:bg-amber-400 cursor-pointer"
               >
                    <FaPlus />
                    <p>Add Employee</p>
               </button>
          </div>
     );
};

export default AddEmployeebtn;
