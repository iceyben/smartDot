import React, { ReactNode } from "react";
import AdminSideNav from "./components/AdminSideNav";
import { getAdminSession } from "@/app/lib/admin-auth";

interface Props {
  children: ReactNode;
}

const AdminLayout = async ({ children }: Props) => {
  // This will redirect if user is not authenticated or not an admin
  await getAdminSession();

  return (
    <div className="flex h-screen w-full flex-col md:flex-row md:overflow-hidden bg-gray-50">
      <div className="w-full flex-none md:w-64 bg-white border-r border-gray-200">
        <AdminSideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto bg-gray-50 p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
