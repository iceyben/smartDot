/**
 * Script to add/reset password for a user
 * Usage: npx tsx scripts/add-password.ts <email> <password>
 */

import prisma from '../app/lib/prisma';
import bcrypt from 'bcryptjs';

async function addPassword(email: string, password: string) {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user
        const user = await prisma.user.update({
            where: { email: email.toLowerCase().trim() },
            data: { password: hashedPassword },
        });

        console.log(`✅ Password set successfully for: ${user.email}`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Role: ${user.role}`);
        console.log(`\n🔐 You can now login with email and password at: http://localhost:3000/login`);
    } catch (error) {
        if ((error as { code?: string }).code === "P2025") {
            console.error(`❌ Error: User with email "${email}" not found.`);
        } else {
            const err = error as Error;
            console.error("Error setting password:", err.message);
        }
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.log("📝 Usage: npx tsx scripts/add-password.ts <email> <password>");
    console.log("\nExample:");
    console.log("  npx tsx scripts/add-password.ts user@example.com MySecurePassword123");
    process.exit(1);
}

if (password.length < 6) {
    console.log("❌ Password must be at least 6 characters long");
    process.exit(1);
}

addPassword(email, password);
