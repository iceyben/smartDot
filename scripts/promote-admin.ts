import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const email = process.argv[2];
    if (!email) {
        console.error("Please provide an email address.");
        process.exit(1);
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.error(`User with email ${email} not found.`);
        process.exit(1);
    }

    const updatedUser = await prisma.user.update({
        where: { email },
        data: { role: "ADMIN" },
    });

    console.log(`Successfully promoted ${email} to ADMIN.`);
    console.log(updatedUser);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
