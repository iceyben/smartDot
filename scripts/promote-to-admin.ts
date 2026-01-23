#!/usr/bin/env node

/**
 * Promote User to Admin
 * Usage: npx ts-node scripts/promote-to-admin.ts <email>
 * 
 * Example:
 * npx ts-node scripts/promote-to-admin.ts user@example.com
 */

import prisma from "@/app/lib/prisma";

async function promoteToAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.error("❌ Error: Email is required");
    console.log("Usage: npx ts-node scripts/promote-to-admin.ts <email>");
    console.log("Example: npx ts-node scripts/promote-to-admin.ts admin@example.com");
    process.exit(1);
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      console.error(`❌ User with email "${email}" not found in database`);
      process.exit(1);
    }

    // Promote user to admin
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });

    console.log("✅ User promoted to admin successfully!");
    console.log(`📧 Email: ${updatedUser.email}`);
    console.log(`👤 Name: ${updatedUser.name}`);
    console.log(`🔑 Role: ${updatedUser.role}`);
    console.log(`📅 Created: ${updatedUser.createdAt}`);

  } catch (error) {
    console.error("❌ Error promoting user:", error);
    process.exit(1);
  }
}

promoteToAdmin().then(() => process.exit(0));
