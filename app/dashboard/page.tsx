import { FaRegUserCircle } from "react-icons/fa";
import Card from "../dashboard/components/Card";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaCircleNotch } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";

export default function Page() {
     return (
          <div className="rounded-lg">
               <div className="grid grid-cols-2 mb-6 ">
                    <div className=" flex items-center">
                         <h1>Dashboard </h1>
                    </div>
                    <div className=" flex items-center justify-end space-x-2">
                         <FaRegUserCircle className="text-2xl  " />
                         <h2>Admin </h2>
                    </div>
               </div>
               <hr className=" border-0 bg-gray-200 h-0.5 " />
               <div className="grid grid-cols-1 md:grid-cols-3">
                    <Card
                         title="Sales"
                         value="5848"
                         icon={<BsGraphUpArrow className="font-extrabold" />}
                    />

                    <Card
                         title="Sales"
                         value="5848"
                         icon={<FaCircleNotch className="font-extrabold" />}
                    />

                    <Card
                         title="Sales"
                         value="5848"
                         icon={<IoBagHandleSharp className="font-extrabold" />}
                    />
               </div>
          </div>
     );
}
