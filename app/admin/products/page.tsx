import prisma from "@/app/lib/prisma";
import AdminProductsList from "./components/AdminProductsList";

export default async function AdminProductsPage() {
  // Fetch categories for filter
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
      </div>

      <AdminProductsList categories={categories} />
    </div>
  );
}
