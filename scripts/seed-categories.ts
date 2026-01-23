/**
 * Script to seed categories into the database
 * Usage: npx tsx scripts/seed-categories.ts
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

async function seedCategories() {
  try {
    console.log("🌱 Seeding categories...\n");

    for (const categoryName of categories) {
      // Check if category already exists
      const existing = await prisma.category.findUnique({
        where: { name: categoryName },
      });

      if (existing) {
        console.log(`⏭️  Category "${categoryName}" already exists`);
      } else {
        const category = await prisma.category.create({
          data: { name: categoryName },
        });
        console.log(`✅ Created category: "${category.name}"`);
      }
    }

    console.log("\n✨ Categories seeding completed!");
    
    // List all categories
    const allCategories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    
    console.log(`\n📋 Total categories in database: ${allCategories.length}`);
    allCategories.forEach((cat) => {
      console.log(`   - ${cat.name}`);
    });
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories();
