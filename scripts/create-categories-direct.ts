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
        // Use $runCommandRaw for direct MongoDB insert.
        // Note: This is an insert, not an upsert. If a unique constraint exists, it will throw an error.
        // The collection name for Prisma model 'Category' is typically 'Category' or 'category'.
        // Assuming 'Category' as per Prisma's default collection naming for models.
        const result = await prisma.$runCommandRaw({
          insert: "Category", // Collection name
          documents: [{ name: categoryName }], // Document to insert
        }) as { n: number; ok: number };

        if (result.ok === 1) {
          console.log(`✅ Category "${categoryName}" ready`);
        } else {
          console.error(`❌ Failed to insert category "${categoryName}". Result:`, result);
        }
      } catch (error) {
        // P2002 is Prisma's unique constraint violation error code
        if ((error as { code?: string }).code === "P2002") {
          console.log(`⏭️  Category "${categoryName}" already exists`);
        } else {
          const err = error as Error;
          console.error(`❌ Error:`, err.message);
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
  } catch (error: unknown) { // Changed from any to unknown
    const err = error as Error; // Cast to Error for general error handling
    console.error("Error creating categories:", err.message);
    if (err.message.includes("DNS resolution")) {
      console.log("\n💡 Make sure your database is running and MONGODB_URI is set correctly");
    }
    process.exit(1); // Added process.exit(1)
  } finally {
    await prisma.$disconnect();
  }
}

createCategories();
