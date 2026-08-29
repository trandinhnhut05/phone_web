import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding rich smartphone data for Tấn Đạt Smartphone...');

  // 1. Create Admin & Customer Accounts
  const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
  const hashedPasswordUser = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@phoneweb.com' },
    update: {},
    create: {
      email: 'admin@phoneweb.com',
      password: hashedPasswordAdmin,
      name: 'Tấn Đạt Smartphone (Admin)',
      phone: '0935677775',
      role: 'ADMIN',
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'khachhang@gmail.com' },
    update: {},
    create: {
      email: 'khachhang@gmail.com',
      password: hashedPasswordUser,
      name: 'Nguyễn Văn Long',
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

  const iphoneCat = await prisma.category.findUnique({ where: { slug: 'iphone' } });
  const samsungCat = await prisma.category.findUnique({ where: { slug: 'samsung' } });
  const xiaomiCat = await prisma.category.findUnique({ where: { slug: 'xiaomi' } });
  const oppoCat = await prisma.category.findUnique({ where: { slug: 'oppo' } });

  // 3. Flagship Products with Rich Specs Sheet
  const products = [
    {
      name: 'iPhone 15 Pro Max 256GB Titan Tự Nhiên',
      slug: 'iphone-15-pro-max-256gb',
      brand: 'Apple',
      price: 29490000,
      oldPrice: 34990000,
      storage: '256GB',
      ram: '8GB',
      stock: 15,
      sold: 48,
      categoryId: iphoneCat?.id,
      colors: ['Titan Tự Nhiên', 'Titan Xanh', 'Titan Đen', 'Titan Trắng'],
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Khung viền Titanium chuẩn hàng không vũ trụ siêu nhẹ và bền bỉ',
        'Chip Apple A17 Pro 3nm đỉnh cao chiến game đồ họa AAA mượt mà',
        'Camera tiềm vọng zoom quang học 5x sắc nét tới từng chi tiết',
        'Nút Action Button tùy biến đa năng và cổng sạc Type-C truyền dữ liệu 10Gbps',
      ],
      specs: {
        'Màn hình': '6.7 inch, Super Retina XDR OLED, 120Hz ProMotion, Dynamic Island, độ sáng đỉnh 2000 nits',
        'Hệ điều hành': 'iOS 18 (Hỗ trợ Apple Intelligence)',
        'Camera sau': 'Chính 48MP (f/1.78, OIS) + Góc rộng 12MP + Telephoto 12MP Zoom 5x',
        'Camera trước': '12MP TrueDepth, Autofocus, Quay video 4K 60fps',
        'Chipset / CPU': 'Apple A17 Pro 6 nhân (3nm cao cấp nhất)',
        'RAM & Bộ nhớ': '8GB RAM - 256GB ROM chuẩn NVMe tốc độ cao',
        'Pin & Sạc': '4.422 mAh, Sạc nhanh 20W Type-C (50% trong 30 phút), Sạc không dây MagSafe 15W',
        'SIM & Kết nối': '5G, Wi-Fi 6E, Bluetooth 5.3, Hỗ trợ 2 eSIM hoặc 1 Nano SIM + 1 eSIM',
        'Chất liệu & Kháng nước': 'Khung Titan chuẩn hàng không, Mặt lưng kính mờ, Kháng nước IP68 (6m trong 30 phút)',
        'Trọng lượng': '221 gram',
      },
      inBox: ['Điện thoại iPhone 15 Pro Max', 'Cáp sạc Type-C bện dù cao cấp', 'Sách hướng dẫn', 'Cây lấy SIM', 'Tặng ốp lưng & dán cường lực tại Tấn Đạt'],
      warranty: '12 Tháng chính hãng, 1 đổi 1 trong 30 ngày đầu, Bảo hành pin và ép kính ưu đãi trọn đời.',
      description: 'iPhone 15 Pro Max là siêu phẩm smartphone cao cấp nhất của Apple với khung vỏ Titanium siêu bền, hệ thống camera 5x đẳng cấp thế giới cùng chip A17 Pro thế hệ mới.',
    },
    {
      name: 'Samsung Galaxy S24 Ultra 5G 12GB/256GB AI Phone',
      slug: 'samsung-galaxy-s24-ultra-5g',
      brand: 'Samsung',
      price: 26990000,
      oldPrice: 31990000,
      storage: '256GB',
      ram: '12GB',
      stock: 12,
      sold: 35,
      categoryId: samsungCat?.id,
      colors: ['Xám Titan', 'Đen Titan', 'Tím Titan', 'Vàng Titan'],
      images: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Galaxy AI quyền năng: Khoanh vùng tìm kiếm, Phiên dịch trực tiếp cuộc gọi',
        'Màn hình phẳng Dynamic AMOLED 2X chống chói Corning Gorilla Armor',
        'Camera siêu phân giải 200MP Mắt Thần Bóng Đêm cùng công nghệ ProVisual',
        'Bút S-Pen tích hợp đa nhiệm, ghi chú thông minh mọi lúc mọi nơi',
      ],
      specs: {
        'Màn hình': '6.8 inch Dynamic AMOLED 2X, QHD+ (3120 x 1440), 120Hz thích ứng, 2600 nits',
        'Hệ điều hành': 'Android 14, giao diện One UI 6.1 (Cam kết cập nhật 7 năm)',
        'Camera sau': '200MP (OIS) + 50MP (Tele 5x OIS) + 10MP (Tele 3x) + 12MP (Góc siêu rộng)',
        'Camera trước': '12MP Dual Pixel AF',
        'Chipset / CPU': 'Snapdragon 8 Gen 3 for Galaxy (4nm ép xung)',
        'RAM & Bộ nhớ': '12GB LPDDR5X - 256GB UFS 4.0',
        'Pin & Sạc': '5.000 mAh, Sạc siêu nhanh 45W, Sạc không dây 15W, Chia sẻ pin không dây',
        'Tiện ích': 'Bút S-Pen tích hợp, Khung viền Titanium, Chuẩn kháng nước kháng bụi IP68',
        'Trọng lượng': '232 gram',
      },
      inBox: ['Điện thoại Galaxy S24 Ultra kèm bút S-Pen', 'Cáp sạc Type-C sang Type-C', 'Cây lấy SIM', 'Tặng dán màn hình chống trầy tại shop'],
      warranty: '12 Tháng chính hãng Samsung Việt Nam, Bảo hành 1 đổi 1 trong 30 ngày.',
      description: 'Galaxy S24 Ultra mở ra kỷ nguyên quyền năng AI trên smartphone. Camera 200MP xuất sắc cùng khung Titanium sang trọng.',
    },
    {
      name: 'Xiaomi 14 Ultra 5G Leica Camera 16GB/512GB',
      slug: 'xiaomi-14-ultra-5g',
      brand: 'Xiaomi',
      price: 24490000,
      oldPrice: 28990000,
      storage: '512GB',
      ram: '16GB',
      stock: 8,
      sold: 21,
      categoryId: xiaomiCat?.id,
      colors: ['Đen Da Thuần Chay', 'Trắng Gốm'],
      images: [
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Hệ thống ống kính quang học huyền thoại Leica Vario-Summilux',
        'Cảm biến 1 inch Sony LYT-900 với khẩu độ biến thiên vô cấp F/1.63 - F/4.0',
        'Chip Snapdragon 8 Gen 3 kết hợp tản nhiệt chất lỏng tuần hoàn IceLoop',
        'Sạc siêu tốc HyperCharge 90W có dây & 80W không dây',
      ],
      specs: {
        'Màn hình': '6.73 inch LTPO AMOLED 2K (1440 x 3200), 120Hz, 3000 nits, Dolby Vision',
        'Hệ điều hành': 'Xiaomi HyperOS (Android 14)',
        'Camera sau': '4 camera 50MP Leica: 50MP 1 inch + 50MP Tele 3.2x + 50MP Tiềm vọng 5x + 50MP Góc rộng',
        'Camera trước': '32MP HDR',
        'Chipset / CPU': 'Qualcomm Snapdragon 8 Gen 3 (4nm)',
        'RAM & Bộ nhớ': '16GB RAM LPDDR5X - 512GB ROM UFS 4.0',
        'Pin & Sạc': '5.000 mAh, Sạc nhanh 90W (đầy 100% trong 33 phút), Sạc không dây 80W',
        'Trọng lượng': '219.8 gram, Kháng nước chuẩn IP68',
      },
      inBox: ['Điện thoại Xiaomi 14 Ultra', 'Củ sạc siêu nhanh 90W chính hãng', 'Cáp sạc Type-C', 'Ốp lưng chính hãng', 'Cây lấy SIM'],
      warranty: '18 Tháng chính hãng, 1 đổi 1 trong 30 ngày.',
      description: 'Xiaomi 14 Ultra là đỉnh cao nhiếp ảnh di động hợp tác cùng Leica với cảm biến 1 inch và ống kính tiềm vọng chuyên nghiệp.',
    },
    {
      name: 'OPPO Find X7 Ultra 5G Chụp Chân Dung Đỉnh Cao',
      slug: 'oppo-find-x7-ultra',
      brand: 'OPPO',
      price: 21990000,
      oldPrice: 25990000,
      storage: '256GB',
      ram: '12GB',
      stock: 10,
      sold: 19,
      categoryId: oppoCat?.id,
      colors: ['Nâu Da Đại Dương', 'Xanh Lam', 'Đen Midnight'],
      images: [
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Hệ thống 2 camera tiềm vọng kép đầu tiên trên thế giới hợp tác Hasselblad',
        'Màn hình cong tràn cạnh siêu sáng 4500 nits rực rỡ dưới ánh nắng',
        'Sạc nhanh SuperVOOC 100W nạp đầy pin trong 26 phút',
      ],
      specs: {
        'Màn hình': '6.82 inch LTPO AMOLED, 120Hz, Độ sáng kỷ lục 4500 nits',
        'Hệ điều hành': 'ColorOS 14 (Android 14)',
        'Camera sau': '4 camera 50MP Hasselblad: 50MP 1 inch LYT-900 + 50MP Tiềm vọng 3x + 50MP Tiềm vọng 6x + 50MP Góc rộng',
        'Camera trước': '32MP 4K Selfie',
        'Chipset / CPU': 'Snapdragon 8 Gen 3',
        'RAM & Bộ nhớ': '12GB RAM - 256GB ROM',
        'Pin & Sạc': '5.000 mAh, SuperVOOC 100W, Sạc không dây 50W AirVOOC',
        'Trọng lượng': '221 gram',
      },
      inBox: ['Máy OPPO Find X7 Ultra', 'Củ sạc SuperVOOC 100W', 'Cáp sạc', 'Ốp lưng dẻo', 'Cây chọc SIM'],
      warranty: '12 Tháng chính hãng, 1 đổi 1 trong 30 ngày.',
      description: 'OPPO Find X7 Ultra khẳng định vị thế nhiếp ảnh chân dung hàng đầu với hệ thống camera tiềm vọng kép Hasselblad sắc sảo.',
    },
  ];

  for (const prod of products) {
    const createdProd = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        highlights: prod.highlights,
        specs: prod.specs,
        inBox: prod.inBox,
        warranty: prod.warranty,
        oldPrice: prod.oldPrice,
      },
      create: prod,
    });

    // Add 2 realistic customer reviews for each product
    await prisma.review.createMany({
      data: [
        {
          productId: createdProd.id,
          userName: 'Anh Hoàng (Phong Điền)',
          userPhone: '0905***123',
          rating: 5,
          comment: 'Mua máy tại Tấn Đạt Smartphone rất yên tâm. Thợ dán sẵn cường lực, tặng ốp lưng xịn và hướng dẫn chuyển dữ liệu từ máy cũ qua cực kỳ nhiệt tình. Máy nguyên seal chuẩn chỉ!',
          verified: true,
        },
        {
          productId: createdProd.id,
          userName: 'Chị Minh Thư (TP. Huế)',
          userPhone: '0935***888',
          rating: 5,
          comment: 'Giao hàng hỏa tốc trong ngày về Huế. Máy đẹp nguyên bản, chụp ảnh siêu nét và pin rất trâu. Chế độ bảo hành 1 đổi 1 rất an tâm!',
          verified: true,
        },
      ],
      skipDuplicates: true,
    });
  }

  // 4. Create Discount Coupons
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

  console.log('Seed completed successfully with rich specs, customer reviews, and coupons!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
