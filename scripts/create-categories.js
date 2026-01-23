/**
 * Simple script to create categories
 * Run this when your database is connected: node scripts/create-categories.js
 * Or use: npx prisma studio and create categories manually
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  "Smartphones",
  "Speakers",
  "Headsets",
  "Lights",
  "Microphones",
  "VR Glasses",
];

async function createCategories() {
  console.log('🌱 Creating categories...\n');

  for (const categoryName of categories) {
    try {
      const category = await prisma.category.upsert({
        where: { name: categoryName },
        update: {},
        create: { name: categoryName },
      });
      console.log(`✅ Category "${category.name}" ready`);
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⏭️  Category "${categoryName}" already exists`);
      } else {
        console.error(`❌ Error creating "${categoryName}":`, error.message);
      }
    }
  }

  const allCategories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  console.log(`\n✨ Categories ready! Total: ${allCategories.length}`);
  console.log('\n📋 Available categories:');
  allCategories.forEach(cat => {
    console.log(`   - ${cat.name}`);
  });

  await prisma.$disconnect();
}

createCategories();
