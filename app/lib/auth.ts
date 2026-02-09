import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/app/lib/prisma"

import { NextAuthOptions } from "next-auth"
import bcrypt from "bcryptjs"
import { Adapter } from "next-auth/adapters"

// Type assertion for Prisma adapter
const adapter = PrismaAdapter(prisma) as unknown as Adapter

import NextAuth from "next-auth"

export const authOptions: NextAuthOptions = {
    adapter,
    debug: process.env.NODE_ENV === 'development',
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: "openid email profile",
                },
            },
            httpOptions: {
                timeout: 60000,  // Increased timeout for better reliability
            },
            allowDangerousEmailAccountLinking: true,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: 'USER',
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "admin@example.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required")
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email.toLowerCase().trim()
                        },
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            image: true,
                            password: true,
                            role: true
                        }
                    })

                    if (!user || !user.password) {
                        // Hash a dummy password to prevent timing attacks
                        await bcrypt.hash('dummy-password', 10)
                        throw new Error("Invalid email or password")
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )

                    if (!isPasswordValid) {
                        throw new Error("Invalid email or password")
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        role: user.role || 'USER'
                    }
                } catch (error) {
                    console.error('Authentication error:', error)
                    throw new Error("Authentication failed. Please try again.")
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login/error',
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // Update session every 24 hours
    },
    cookies: {
        sessionToken: {
            name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 30 * 24 * 60 * 60 // 30 days
            }
        }
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user.id
                token.role = (user as { role?: string }).role || 'USER'
            }

            // Update token from session if needed
            if (trigger === "update" && session) {
                token = { ...token, ...session }
            }

            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string

                // Add additional user properties without database calls for performance
                const userSession = session.user as Record<string, unknown>
                userSession.phoneNumber = null
                userSession.address = null
                userSession.city = null
            }
            return session
        },
        async signIn({ user, account, profile }) {
            // Allow all sign-in attempts
            if (user) {
                console.log('User signed in:', { id: user.id, email: user.email, provider: account?.provider });
                return true;
            }
            return false;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    useSecureCookies: process.env.NODE_ENV === 'production',
    logger: {
        error(code, metadata) {
            console.error({ code, metadata })
        },
        warn(code) {
            console.warn({ code })
        },
        debug(code, metadata) {
            console.debug({ code, metadata })
        }
    }
}

export const { auth, signIn, signOut } = NextAuth(authOptions)