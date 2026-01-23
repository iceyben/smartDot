import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/app/lib/prisma"
import { NextAuthOptions } from "next-auth"
import dns from "node:dns"
import bcrypt from "bcryptjs"

// Fix for AggregateError (internalConnectMultiple) in Node.js 18+
// This forces Node.js to prefer IPv4 over IPv6 when resolving hostnames,
// which often resolves connectivity issues with Google OAuth endpoints.
dns.setDefaultResultOrder("ipv4first");

export const authOptions: NextAuthOptions = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adapter: PrismaAdapter(prisma as any), // Type assertion required by Prisma adapter
    debug: false, // Disable debug in production
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            httpOptions: {
                timeout: 60000, // Increased timeout to 60 seconds
            },
            allowDangerousEmailAccountLinking: true,
        }),
        // Email/Password provider for admin login
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<string, unknown> | undefined) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                try {
                    // Find user by email
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string },
                    });

                    if (!user) {
                        throw new Error("Invalid email or password");
                    }

                    // Only allow admin and users with password set
                    if (!user.password) {
                        throw new Error("This account uses a different sign-in method");
                    }

                    // Verify password
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password as string,
                        user.password || ""
                    );

                    if (!isPasswordValid) {
                        throw new Error("Invalid email or password");
                    }

                    return {
                        id: user.id,
                        email: user.email || undefined,
                        name: user.name || undefined,
                        image: user.image || undefined,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any;
                } catch (error) {
                    throw error;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                token.role = (user as any).role || 'USER';
            }
            return token;
        },
        async session({ session, token }) {
            if (session && session.user && token) {
                session.user.id = (token.id as string) || '';
                session.user.email = (token.email as string) || session.user.email || '';
                session.user.role = (token.role as string) || 'USER';
                const userSession = session.user as Record<string, unknown>;
                userSession.phoneNumber = null;
                userSession.address = null;
                userSession.city = null;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}
