#!/usr/bin/env node

/**
 * Setup First Admin Account
 * Usage: npx ts-node scripts/setup-admin.ts
 *
 * This script creates the first admin account with email and password
 */

import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupAdmin() {
  console.log("\n🔐 SmartDot Admin Setup\n");
  console.log("This will create your first admin account with email and password.\n");

  try {
    // Get input
    const name = await question("Enter admin full name: ");
    const email = await question("Enter admin email: ");
    const password = await question("Enter admin password (min 8 chars): ");
    const confirmPassword = await question("Confirm password: ");

    // Validation
    if (!name || !email || !password) {
      console.error("❌ All fields are required");
      process.exit(1);
    }

    if (password.length < 8) {
      console.error("❌ Password must be at least 8 characters");
      process.exit(1);
    }

    if (password !== confirmPassword) {
      console.error("❌ Passwords do not match");
      process.exit(1);
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error(`❌ Email "${email}" is already registered`);
      process.exit(1);
    }

    // Hash password
    console.log("\n🔒 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    console.log("📝 Creating admin account...");
    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });

    console.log("\n✅ Admin account created successfully!\n");
    console.log("📧 Email: " + admin.email);
    console.log("👤 Name: " + admin.name);
    console.log("🔑 Role: " + admin.role);
    console.log("\n🌐 Login at: http://localhost:3000/login");
    console.log("📊 Admin Panel: http://localhost:3000/admin\n");

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

setupAdmin().then(() => process.exit(0));
