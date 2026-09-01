import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding baseline accounts and categories for Tấn Đạt Smartphone...');

  // 1. Create Admin & Customer Accounts
  const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
  const hashedPasswordUser = await bcrypt.hash('user123', 10);

  await prisma.user.upsert({
    where: { email: 'led981388@gmail.com' },
    update: { role: 'ADMIN' },
    create: {
      email: 'led981388@gmail.com',
      password: hashedPasswordAdmin,
      name: 'Tấn Đạt Smartphone (Admin)',
      phone: '0935677775',
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@phoneweb.com' },
    update: { role: 'ADMIN' },
    create: {
      email: 'admin@phoneweb.com',
      password: hashedPasswordAdmin,
      name: 'Admin Phong Xuân',
      phone: '0935677775',
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'khachhang@gmail.com' },
    update: {},
    create: {
      email: 'khachhang@gmail.com',
      password: hashedPasswordUser,
      name: 'Khách Hàng',
      phone: '0987654321',
      role: 'USER',
    },
  });

  // 2. Categories
  const categories = [
    { name: 'iPhone (Apple)', slug: 'iphone' },
    { name: 'Samsung Galaxy', slug: 'samsung' },
    { name: 'Xiaomi', slug: 'xiaomi' },
    { name: 'OPPO', slug: 'oppo' },
    { name: 'Phụ Kiện Chính Hãng', slug: 'phu-kien' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
  }

  // 3. Discount Coupons
  const coupons = [
    {
      code: 'TANDAT200',
      discount: 200000,
      type: 'FIXED',
      minOrder: 5000000,
      description: 'Giảm ngay 200.000đ cho đơn hàng từ 5.000.000đ tại Tấn Đạt',
    },
    {
      code: 'TANDAT500',
      discount: 500000,
      type: 'FIXED',
      minOrder: 15000000,
      description: 'Giảm ngay 500.000đ cho đơn hàng điện thoại flagship từ 15.000.000đ',
    },
    {
      code: 'FREESHIP',
      discount: 50000,
      type: 'FIXED',
      minOrder: 0,
      description: 'Miễn phí giao hàng tận nơi toàn quốc',
    },
  ];

  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }

  console.log('Seed completed: Accounts and coupons are ready. Product inventory is currently empty.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
