// app/api/auth/logout/route.ts
import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import {headers} from "next/headers"

export const POST = async () => {
  const session = await auth.api.getSession({
           headers: await headers(),  // pass request headers
         });
        // <-- this clears the session
  return NextResponse.json({ success: true });
};
