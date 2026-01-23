import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Cleaning up User data...");

    // Find users with invalid emailVerified (where it might be stored as boolean/invalid string in MongoDB)
    // Since Prisma is failing to even fetch them, we might need to use raw commands if possible, 
    // but let's try a simpler approach if we can get past the fetching error.

    // If we can't fetch them, we can try to update all users to null emailVerified first if it's broken
    try {
        const users = await prisma.$runCommandRaw({
            update: "user",
            updates: [
                {
                    q: { emailVerified: { $type: "bool" } },
                    u: { $set: { emailVerified: null } },
                    multi: true
                },
                {
                    q: { emailVerified: "false" },
                    u: { $set: { emailVerified: null } },
                    multi: true
                }
            ]
        });
        console.log("Cleanup result:", users);
    } catch (error) {
        console.error("Cleanup failed:", error);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
