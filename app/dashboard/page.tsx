import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/app/lib/prisma";
import { FiMail, FiUser, FiCalendar, FiPackage } from "react-icons/fi";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = session.user.id;
  const userName = session.user.name || "User";
  const userEmail = session.user.email;
  const userImage = session.user.image || "/employee.png";

  // Fetch user's orders
  const orders = await prisma.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              images: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const latestShippingInfo = orders[0]?.shippingInfo as {
    fullName?: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
  } | null;

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="rounded-lg space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-full bg-gray-200 overflow-hidden border-2 border-green-500">
              <Image
                src={userImage}
                alt={userName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userName}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Welcome to your profile (Guest View)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="btn btn-ghost btn-sm text-gray-500 hover:text-green-600">
              Home
            </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>

            <div className="flex items-center gap-3 text-gray-700">
              <FiUser className="text-gray-400 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="font-medium">{userName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FiMail className="text-gray-400 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="font-medium">{userEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FiCalendar className="text-gray-400 text-xl" />
              <div>
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="font-medium">N/A</p>
              </div>
            </div>
          </div>

          {latestShippingInfo && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Default Address
              </h2>
              {/* ... same as before ... */}
            </div>
          )}
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FiPackage className="text-2xl text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <FiPackage className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No orders yet</p>
            <Link href="/products" className="text-green-600 hover:text-green-700 font-medium">
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
