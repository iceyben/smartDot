import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client";
import { error } from "console";
import { Role } from "@/app/generated/prisma";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json([users]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validate = schema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json({ error: validate.error.issues }, { status: 404 });
  }
  return NextResponse.json(
    { id: 1, email: body.email, Role: body.Role },
    { status: 200 }
  );
}
