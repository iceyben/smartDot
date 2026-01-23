/**
 * Script to set a user as admin
 * Usage: npx tsx scripts/set-admin.ts <user-email>
 */

import prisma from "../app/lib/prisma";

async function setAdminRole(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "admin" },
    });

    console.log(`✅ Success! User "${user.email}" is now an admin.`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`\n🌐 You can now access the admin panel at: http://localhost:3000/admin`);
  } catch (error: any) {
    if (error.code === "P2025") {
      console.error(`❌ Error: User with email "${email}" not found.`);
      console.log(`   Please sign up first at: http://localhost:3000/signup`);
    } else {
      console.error("❌ Error setting admin role:", error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

const email = process.argv[2];

if (!email) {
  console.log("📝 Usage: npx tsx scripts/set-admin.ts <user-email>");
  console.log("\nExample:");
  console.log("  npx tsx scripts/set-admin.ts admin@example.com");
  process.exit(1);
}

setAdminRole(email);
