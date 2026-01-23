import prisma from "@/app/lib/prisma";
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign } from "react-icons/fi";

export default async function AdminDashboard() {
  const welcomeName = "Admin";

  // Fetch statistics
  const [totalProducts, totalOrders, totalRevenue, totalUsers] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true },
    }),
    prisma.user.count(),
  ]);

  const revenue = totalRevenue._sum.total || 0;
  const pendingOrders = await prisma.order.count({
    where: { status: "PENDING" },
  });

  const stats = [
    {
      title: "Total Products",
      value: totalProducts.toString(),
      icon: FiPackage,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: FiShoppingBag,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toString(),
      icon: FiShoppingBag,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Total Revenue",
      value: `$${revenue.toFixed(2)}`,
      icon: FiDollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Users",
      value: totalUsers.toString(),
      icon: FiUsers,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {welcomeName}</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`text-2xl ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
        <RecentOrdersPreview />
      </div>
    </div>
  );
}

async function RecentOrdersPreview() {
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        take: 1,
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (recentOrders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No orders yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-gray-600 font-medium">Order ID</th>
            <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
            <th className="text-left py-3 px-4 text-gray-600 font-medium">Items</th>
            <th className="text-left py-3 px-4 text-gray-600 font-medium">Total</th>
            <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
            <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <span className="font-mono text-xs text-gray-900">
                  #{order.id.slice(-8).toUpperCase()}
                </span>
              </td>
              <td className="py-3 px-4">
                <div>
                  <p className="font-medium text-gray-900">
                    {order.user?.name || "Guest"}
                  </p>
                  <p className="text-xs text-gray-500">{order.user?.email || "-"}</p>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-700">
                {order.items[0]?.product.name || "N/A"}
                {order.items.length > 1 && ` +${order.items.length - 1} more`}
              </td>
              <td className="py-3 px-4 font-semibold text-gray-900">
                ${order.total.toFixed(2)}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "COMPLETED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-600 text-xs">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
