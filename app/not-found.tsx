import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center p-auto space-y-4">
      <h1 className="text-[10em] ">404</h1>
      <p>The page you are looking for doesn&apos;t exist or has been moved</p>

      <Link
        href="/"
        className="bg-green-300 px-4 py-2 rounded-2xl font-medium flex items-center justify-center "
      >
        Go home{" "}
        <FaLongArrowAltRight className=" pl-2 text-lg items-center font-medium " />
      </Link>
    </div>
  );
};

export default NotFound;
