// app/dashboard/layout.tsx
import { ReactNode } from "react";
import SideNav from "./components/SideNav";

interface Props {
  children: ReactNode;
}

const layout = async ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row md:overflow-hidden rounded-lg bg-green-300 py-10 px-10">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto bg-white p-4 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default layout;
