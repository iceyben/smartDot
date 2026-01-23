/**
 * Script to create categories directly
 * Run: npx tsx scripts/create-categories-direct.ts
 */

import prisma from "../app/lib/prisma";

const categories = [
  "Smartphones",
  "Speakers",
  "Headsets",
  "Lights",
  "Microphones",
  "VR Glasses",
];

async function createCategories() {
  try {
    console.log("🌱 Creating categories...\n");

    for (const categoryName of categories) {
      try {
        // Use upsert to create or skip if exists
        const category = await prisma.category.upsert({
          where: { name: categoryName },
          update: {}, // Don't update if exists
          create: { name: categoryName },
        });
        console.log(`✅ Category "${category.name}" ready`);
      } catch (error: any) {
        if (error.code === "P2002") {
          console.log(`⏭️  Category "${categoryName}" already exists`);
        } else {
          console.error(`❌ Error:`, error.message);
        }
      }
    }

    // List all categories
    const allCategories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    console.log(`\n✨ Done! Total categories: ${allCategories.length}`);
    console.log("\n📋 Available categories:");
    allCategories.forEach((cat) => {
      console.log(`   - ${cat.name}`);
    });
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    if (error.message.includes("DNS resolution")) {
      console.log("\n💡 Make sure your database is running and MONGODB_URI is set correctly");
    }
  } finally {
    await prisma.$disconnect();
  }
}

createCategories();
