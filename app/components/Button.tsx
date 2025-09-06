import React from "react";

interface Props {
  btnName: string;
}

const Button = ({btnName }: Props) => {
  return (
    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
      {btnName}
    </button>
  );
};

export default Button;
