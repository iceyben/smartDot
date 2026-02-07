import { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string
            role: string
            phoneNumber?: string | null
            address?: string | null
            city?: string | null
        } & DefaultSession["user"]
    }

    interface User {
        role?: string
        phoneNumber?: string | null
        address?: string | null
        city?: string | null
    }
}
