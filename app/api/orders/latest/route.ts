import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(null);
        }

        const lastOrder = await prisma.order.findFirst({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                shippingInfo: true,
            },
        });

        return NextResponse.json(lastOrder);
    } catch (error) {
        console.error("Error fetching latest order:", error);
        return NextResponse.json(
            { error: "Failed to fetch latest order" },
            { status: 500 }
        );
    }
}
