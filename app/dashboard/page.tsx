import Card from "../dashboard/components/Card";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaCircleNotch } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import Image from "next/image";
import { auth } from "@/app/lib/auth"; // adjust the import path to your setup
import { redirect } from "next/navigation";
import { headers } from "next/headers";



export default async function Page() {
     const session = await auth.api.getSession({
          headers: await headers(),  // pass request headers
        });
      
        if (!session) {
          redirect("/login");
        }
     return (
          <div className="rounded-lg">
               <div className="grid grid-cols-2 mb-6 ">
                    <div className=" flex flex-col">
                         <h1>Dashboard </h1>
                         <p className="text-[11px] font-medium text-slate-400">
                              Welcome back {session.user.name}!
                         </p>
                    </div>
                    <div className=" flex items-center justify-end space-x-2">
                         <h2> {session.user.email}</h2>
                         <Image
                              className="h-8 w-8 rounded-full object-cover"
                              width={198}
                              height={194}
                              src="/employee.png"
                              alt="employee"
                         />
                    </div>
               </div>
               <hr className=" border-0 bg-gray-200 h-0.5 " />
               <div className="grid grid-cols-1 md:grid-cols-3">
                    <Card
                         title="Total Orders"
                         value="5848"
                         icon={<BsGraphUpArrow className="font-extrabold" />}
                    />

                    <Card
                         title="Sales"
                         value="5848"
                         icon={<FaCircleNotch className="font-extrabold" />}
                    />

                    <Card
                         title="Total Revenue"
                         value={`$${7848}`}
                         icon={<IoBagHandleSharp className="font-extrabold" />}
                    />
               </div>
          </div>
     );
}
