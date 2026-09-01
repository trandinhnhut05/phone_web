import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing all phone products from database...');

  // Delete OrderItems associated with products first if any
  await prisma.orderItem.deleteMany({});
  // Delete Reviews associated with products
  await prisma.review.deleteMany({});
  // Delete all Products
  const deleteResult = await prisma.product.deleteMany({});

  console.log(`Deleted ${deleteResult.count} products successfully! Database products are now empty.`);
}

main()
  .catch((e) => {
    console.error('Error clearing products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
