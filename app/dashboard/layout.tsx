import React, { Children, ReactNode } from "react";
import SideNav from "./components/SideNav";
interface Props {
  Children: ReactNode;
}
const layout = ({ Children }: Props) => {
  return (
    <div>
      <SideNav />
      {Children}
    </div>
  );
};

export default layout;
