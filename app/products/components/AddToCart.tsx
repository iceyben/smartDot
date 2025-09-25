import React, { useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa6";

const AddToCart = () => {
     const [added, setAdded] = useState(false);

     const handleClick = () => {
          setAdded(true);

          // (optional) revert back to plus after a short delay
          //setTimeout(() => setAdded(false), 2000);
     };

     return (
          <button
               onClick={handleClick}
               className="flex flex-col items-center justify-center p-1 cursor-pointer  rounded-lg hover:bg-gray-100 transition bg-amber-300  "
          >
               {added ? (
                    <FaCheck className="text-green-500" />
               ) : (
                    <FaPlus className="text-black  " />
               )}
          </button>
     );
};

export default AddToCart;
