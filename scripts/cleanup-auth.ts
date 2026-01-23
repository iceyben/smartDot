import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Cleaning up auth collections...");
    try {
        await prisma.account.deleteMany({});
        await prisma.session.deleteMany({});
        // Keep users if possible, or clear them if they are from a different system
        // await prisma.user.deleteMany({});
        console.log("Cleanup done.");
    } catch (e) {
        console.error("Error cleaning up:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
