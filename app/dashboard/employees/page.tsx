import React from "react";
import EmployeeCard from "./components/Card";

const Page = () => {
     return (
          <div className="bg-white">
               <h1>Employees Page</h1>
               <div className=" px-5 ">
                    {/* Employee cards will go here */}
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
