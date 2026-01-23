import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, total, shippingInfo } = body;

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order items are required" },
        { status: 400 }
      );
    }

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: "Valid total amount is required" },
        { status: 400 }
      );
    }

    // Validate products exist and have enough stock
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        shippingInfo: shippingInfo || {},
        items: {
          create: items.map((item: Record<string, unknown>) => ({
            productId: item.productId as string,
            quantity: item.quantity as number,
            price: item.price as number,
          })),
        },
      },
      include: {
        items: {
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

    // Update product stock and User info
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Update User profile with latest shipping info
    if (userId) {
      try {
        await prisma.user.update({
          where: { id: userId },
          data: {
            phoneNumber: shippingInfo.phoneNumber,
            address: shippingInfo.address,
            city: shippingInfo.city,
            name: shippingInfo.fullName,
          },
        });
      } catch (userUpdateError) {
        console.error("Failed to update user profile:", userUpdateError);
        // We don't fail the order if the user profile update fails
      }
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    const err = error as Record<string, unknown>;
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: (err.message as string) || "Failed to create order" },
      { status: 500 }
    );
  }
}
