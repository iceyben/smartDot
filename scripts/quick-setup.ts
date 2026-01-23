#!/usr/bin/env node

/**
 * Quick Admin Setup Script
 * This creates the admin account with predefined credentials for testing
 */

async function quickSetup() {
  // Import inside function to avoid ESM issues
  const { PrismaClient } = await import("@prisma/client");
  const bcrypt = await import("bcryptjs");

  const prisma = new PrismaClient();

  console.log("\n🔐 Quick Admin Setup\n");

  const adminEmail = "admin.smartdot@gmail.com";
  const adminPassword = "Bruce@12345";
  const adminName = "Bruce";

  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      if (existingUser.password) {
        console.log(`✅ Admin account already exists with password: ${adminEmail}`);
        console.log(`🔑 Role: ${existingUser.role}`);
      } else {
        console.log(`⚠️  Account exists but has no password. Updating...`);
        
        // Hash password
        const hashedPassword = await bcrypt.default.hash(adminPassword, 12);
        
        // Update user with password
        const updated = await prisma.user.update({
          where: { email: adminEmail },
          data: { 
            password: hashedPassword,
            role: "ADMIN"
          },
        });
        
        console.log(`✅ Admin account updated with password!`);
        console.log(`📧 Email: ${updated.email}`);
        console.log(`🔑 Password: ${adminPassword}`);
        console.log(`🏷️  Role: ${updated.role}`);
      }
      console.log(`\n🌐 Login: http://localhost:3000/login`);
      console.log(`📊 Admin: http://localhost:3000/admin\n`);
      return;
    }

    // Hash password
    console.log("🔒 Hashing password...");
    const hashedPassword = await bcrypt.default.hash(adminPassword, 12);

    // Create admin
    console.log("📝 Creating admin account...");
    const admin = await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });

    console.log("\n✅ Admin account created successfully!\n");
    console.log("📋 Credentials:");
    console.log(`   📧 Email: ${admin.email}`);
    console.log(`   🔑 Password: ${adminPassword}`);
    console.log(`   👤 Name: ${admin.name}`);
    console.log(`   🏷️  Role: ${admin.role}`);
    console.log("\n🔗 URLs:");
    console.log(`   🌐 Login: http://localhost:3000/login`);
    console.log(`   📊 Admin: http://localhost:3000/admin\n`);
    console.log("⚠️  Remember to change this password after first login!\n");

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

quickSetup().then(() => process.exit(0));
