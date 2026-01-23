#!/usr/bin/env node

/**
 * Generate Admin Signup Tokens
 * Usage: npx ts-node scripts/generate-admin-token.ts [count]
 * 
 * Examples:
 * npx ts-node scripts/generate-admin-token.ts      # Generate 1 token
 * npx ts-node scripts/generate-admin-token.ts 5    # Generate 5 tokens
 */

import crypto from "crypto";
import fs from "fs";
import path from "path";

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

function main() {
  const count = parseInt(process.argv[2] || "1", 10);

  if (isNaN(count) || count < 1) {
    console.error("❌ Error: Count must be a positive number");
    process.exit(1);
  }

  console.log(`🔐 Generating ${count} admin signup token${count > 1 ? "s" : ""}...\n`);

  const tokens = [];
  for (let i = 0; i < count; i++) {
    tokens.push(generateToken());
  }

  // Display tokens
  tokens.forEach((token, index) => {
    console.log(`Token ${index + 1}:`);
    console.log(`  ${token}\n`);
  });

  // Create signup link template
  console.log("📋 Signup Links:\n");
  tokens.forEach((token, index) => {
    console.log(
      `Link ${index + 1}: http://localhost:3000/admin/signup?token=${token}`
    );
  });

  // Show how to use
  console.log("\n📝 To use these tokens, add to your .env.local:\n");
  console.log(`ADMIN_SIGNUP_TOKENS=${tokens.join(",")}\n`);

  // Optional: Show how to save to file
  console.log("💾 Tip: Save these tokens to a file:");
  console.log(`  echo "ADMIN_SIGNUP_TOKENS=${tokens.join(",")}" >> .env.local\n`);

  console.log("⚠️  Keep these tokens secure! Share only with intended admins.\n");
}

main();
