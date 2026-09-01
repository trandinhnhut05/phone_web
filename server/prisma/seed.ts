import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding rich smartphone data for Tấn Đạt Smartphone...');

  // 1. Create Admin & Customer Accounts
  const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
  const hashedPasswordUser = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
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

  // 3. Full iPhone Lineup (iPhone 11 -> iPhone 15 Series) + Flagships
  const products = [
    // ==================== IPHONE 15 SERIES ====================
    {
      name: 'iPhone 15 Pro Max 256GB Titan Tự Nhiên',
      slug: 'iphone-15-pro-max-256gb',
      brand: 'Apple',
      price: 28990000,
      oldPrice: 34990000,
      storage: '256GB',
      ram: '8GB',
      stock: 15,
      sold: 68,
      categoryId: iphoneCat?.id,
      colors: ['Titan Tự Nhiên', 'Titan Xanh', 'Titan Đen', 'Titan Trắng'],
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Khung viền Titanium chuẩn hàng không vũ trụ siêu nhẹ và bền bỉ',
        'Chip Apple A17 Pro 3nm đỉnh cao chiến game đồ họa AAA',
        'Camera tiềm vọng zoom quang học 5x sắc nét',
        'Nút Action Button tùy biến và cổng sạc USB Type-C tốc độ cao',
      ],
      specs: {
        'Màn hình': '6.7 inch, Super Retina XDR OLED, 120Hz ProMotion, Dynamic Island, 2000 nits',
        'Hệ điều hành': 'iOS 18 (Hỗ trợ Apple Intelligence)',
        'Camera sau': '48MP chính (OIS) + 12MP góc rộng + 12MP Tele 5x',
        'Chipset / CPU': 'Apple A17 Pro 6 nhân (3nm)',
        'RAM & Bộ nhớ': '8GB RAM - 256GB ROM NVMe',
        'Pin & Sạc': '4.422 mAh, Sạc nhanh 20W Type-C, MagSafe 15W',
      },
      inBox: ['iPhone 15 Pro Max', 'Cáp Type-C bện dù', 'Sách hướng dẫn', 'Tặng ốp lưng & cường lực tại Tấn Đạt'],
      warranty: '12 Tháng chính hãng, 1 đổi 1 trong 30 ngày.',
      description: 'iPhone 15 Pro Max là siêu phẩm đỉnh cao của Apple với khung viền Titan và camera tiềm vọng 5x.',
    },
    {
      name: 'iPhone 15 Pro 128GB Titan Tự Nhiên',
      slug: 'iphone-15-pro-128gb',
      brand: 'Apple',
      price: 24490000,
      oldPrice: 28990000,
      storage: '128GB',
      ram: '8GB',
      stock: 12,
      sold: 45,
      categoryId: iphoneCat?.id,
      colors: ['Titan Tự Nhiên', 'Titan Xanh', 'Titan Đen', 'Titan Trắng'],
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Khung viền Titanium nhẹ nhất từng có trên dòng Pro',
        'Màn hình 6.1 inch 120Hz ProMotion siêu mượt',
        'Chip A17 Pro mạnh mẽ hàng đầu thế giới',
      ],
      specs: {
        'Màn hình': '6.1 inch, Super Retina XDR OLED, 120Hz ProMotion, Dynamic Island',
        'Chipset / CPU': 'Apple A17 Pro (3nm)',
        'RAM & Bộ nhớ': '8GB RAM - 128GB ROM',
        'Camera sau': '48MP + 12MP + 12MP Tele 3x',
        'Pin': '3.274 mAh, Type-C sạc nhanh',
      },
      inBox: ['Máy iPhone 15 Pro', 'Cáp sạc Type-C', 'Tặng dán cường lực'],
      warranty: '12 Tháng chính hãng, 1 đổi 1 trong 30 ngày.',
      description: 'iPhone 15 Pro nhỏ gọn, khung vỏ Titanium thời thượng và sức mạnh chip A17 Pro vượt trội.',
    },
    {
      name: 'iPhone 15 Plus 128GB',
      slug: 'iphone-15-plus-128gb',
      brand: 'Apple',
      price: 21990000,
      oldPrice: 25990000,
      storage: '128GB',
      ram: '6GB',
      stock: 10,
      sold: 38,
      categoryId: iphoneCat?.id,
      colors: ['Hồng Pastel', 'Xanh Mint', 'Vàng', 'Xanh Dương', 'Đen'],
      images: [
        'https://images.unsplash.com/photo-1695048065057-0a4a58406ca7?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Màn hình lớn 6.7 inch hiển thị Dynamic Island sống động',
        'Thời lượng pin trâu nhất trên toàn bộ thế hệ iPhone 15',
        'Mặt lưng kính pha màu mờ mịn độc đáo',
      ],
      specs: {
        'Màn hình': '6.7 inch Super Retina XDR OLED, Dynamic Island',
        'Chipset / CPU': 'Apple A16 Bionic 6 nhân',
        'Camera sau': '48MP chính + 12MP góc rộng',
        'Pin': '4.383 mAh, Pin cực trâu lên tới 26 giờ xem video',
      },
      inBox: ['iPhone 15 Plus', 'Cáp sạc Type-C', 'Tặng kèm phụ kiện'],
      warranty: '12 Tháng chính hãng, 1 đổi 1 trong 30 ngày.',
      description: 'iPhone 15 Plus sở hữu màn hình lớn, thời lượng pin ấn tượng cùng cụm Dynamic Island đa năng.',
    },
    {
      name: 'iPhone 15 128GB Chính Hãng',
      slug: 'iphone-15-128gb',
      brand: 'Apple',
      price: 18990000,
      oldPrice: 22990000,
      storage: '128GB',
      ram: '6GB',
      stock: 20,
      sold: 95,
      categoryId: iphoneCat?.id,
      colors: ['Hồng Pastel', 'Xanh Lá', 'Vàng', 'Xanh Dương', 'Đen'],
      images: [
        'https://images.unsplash.com/photo-1695048065057-0a4a58406ca7?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Mặt lưng kính pha màu nguyên bản trẻ trung',
        'Dynamic Island thông minh tiện ích',
        'Camera 48MP chụp chi tiết siêu sắc nét',
        'Cổng Type-C tiện lợi',
      ],
      specs: {
        'Màn hình': '6.1 inch Super Retina XDR, Dynamic Island',
        'Chipset / CPU': 'Apple A16 Bionic',
        'Camera': '48MP + 12MP',
        'Pin': '3.349 mAh',
      },
      inBox: ['iPhone 15', 'Cáp sạc Type-C', 'Tặng dán cường lực & ốp lưng'],
      warranty: '12 Tháng chính hãng, 1 đổi 1 trong 30 ngày.',
      description: 'iPhone 15 mang đến diện mạo mới với Dynamic Island và màu sắc pastel ngọt ngào.',
    },

    // ==================== IPHONE 14 SERIES ====================
    {
      name: 'iPhone 14 Pro Max 128GB Tím Deep Purple',
      slug: 'iphone-14-pro-max-128gb',
      brand: 'Apple',
      price: 22490000,
      oldPrice: 27990000,
      storage: '128GB',
      ram: '6GB',
      stock: 14,
      sold: 110,
      categoryId: iphoneCat?.id,
      colors: ['Tím Deep Purple', 'Vàng Gold', 'Đen Space Black', 'Bạc Silver'],
      images: [
        'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Màu Tím Deep Purple huyền thoại cực kỳ sang trọng',
        'Dynamic Island tương tác thông minh',
        'Màn hình 120Hz Always-On Display sáng 2000 nits',
        'Camera 48MP cảm biến lớn chụp đêm đỉnh cao',
      ],
      specs: {
        'Màn hình': '6.7 inch Super Retina XDR OLED 120Hz ProMotion',
        'Chipset / CPU': 'Apple A16 Bionic (4nm)',
        'Camera': '48MP + 12MP + 12MP Tele 3x',
        'Pin': '4.323 mAh, Sạc nhanh Lightning',
      },
      inBox: ['iPhone 14 Pro Max', 'Cáp sạc', 'Tặng ốp lưng & dán full'],
      warranty: '12 Tháng tại Tấn Đạt, 1 đổi 1 trong 30 ngày.',
      description: 'iPhone 14 Pro Max là mẫu máy được ưa chuộng bậc nhất với sắc tím Deep Purple và màn hình Dynamic Island.',
    },
    {
      name: 'iPhone 14 Pro 128GB',
      slug: 'iphone-14-pro-128gb',
      brand: 'Apple',
      price: 18990000,
      oldPrice: 23990000,
      storage: '128GB',
      ram: '6GB',
      stock: 10,
      sold: 55,
      categoryId: iphoneCat?.id,
      colors: ['Tím Deep Purple', 'Vàng Gold', 'Đen Space Black', 'Bạc Silver'],
      images: [
        'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Màn hình Dynamic Island 120Hz sắc nét trong thân máy 6.1 inch',
        'Khung thép không gỉ cao cấp sáng bóng',
      ],
      specs: {
        'Màn hình': '6.1 inch OLED 120Hz ProMotion',
        'Chipset': 'Apple A16 Bionic',
        'Camera': '48MP + 12MP + 12MP Tele 3x',
      },
      inBox: ['Máy iPhone 14 Pro', 'Cáp sạc', 'Tặng phụ kiện'],
      warranty: '12 Tháng uy tín.',
      description: 'iPhone 14 Pro chuẩn sang trọng, thiết kế gọn gàng và camera 48MP xuất sắc.',
    },
    {
      name: 'iPhone 14 128GB Quốc Tế',
      slug: 'iphone-14-128gb',
      brand: 'Apple',
      price: 14990000,
      oldPrice: 18990000,
      storage: '128GB',
      ram: '6GB',
      stock: 18,
      sold: 85,
      categoryId: iphoneCat?.id,
      colors: ['Xanh Blue', 'Tím Nhạt', 'Đen Midnight', 'Trắng Starlight', 'Đỏ'],
      images: [
        'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Chip A15 Bionic 5 nhân GPU mượt mà',
        'Chế độ quay video Action Mode chống rung như gimbal',
      ],
      specs: {
        'Màn hình': '6.1 inch Super Retina XDR OLED',
        'Chipset': 'Apple A15 Bionic (5 GPU)',
        'Camera': '12MP kép',
      },
      inBox: ['iPhone 14', 'Cáp sạc', 'Tặng cường lực'],
      warranty: '12 Tháng chính hãng, 1 đổi 1 trong 30 ngày.',
      description: 'iPhone 14 giá tốt, hiệu năng bền bỉ, quay chụp mượt mà.',
    },

    // ==================== IPHONE 13 SERIES ====================
    {
      name: 'iPhone 13 Pro Max 128GB Sierra Blue',
      slug: 'iphone-13-pro-max-128gb',
      brand: 'Apple',
      price: 16990000,
      oldPrice: 21990000,
      storage: '128GB',
      ram: '6GB',
      stock: 22,
      sold: 140,
      categoryId: iphoneCat?.id,
      colors: ['Xanh Sierra Blue', 'Xanh Alpine Green', 'Vàng Gold', 'Graphite'],
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Màu Sierra Blue thanh lịch được yêu thích nhất',
        'Màn hình 120Hz ProMotion đầu tiên trên iPhone',
        'Thời lượng pin siêu bền bỉ dùng thoải mái 2 ngày',
        'Camera quay phim điện ảnh Cinematic Mode',
      ],
      specs: {
        'Màn hình': '6.7 inch Super Retina XDR OLED 120Hz ProMotion',
        'Chipset': 'Apple A15 Bionic (5 nhân GPU)',
        'Camera': '3 camera 12MP (Chính + Góc rộng + Tele 3x)',
        'Pin': '4.352 mAh cực kỳ trâu',
      },
      inBox: ['iPhone 13 Pro Max', 'Cáp sạc', 'Tặng ốp & dán cường lực trọn đời'],
      warranty: '12 Tháng bảo hành máy, bảo hành pin chu đáo.',
      description: 'iPhone 13 Pro Max là biểu tượng pin trâu, màn hình 120Hz mượt mà và màu xanh Sierra Blue quý phái.',
    },
    {
      name: 'iPhone 13 128GB',
      slug: 'iphone-13-128gb',
      brand: 'Apple',
      price: 12490000,
      oldPrice: 15990000,
      storage: '128GB',
      ram: '4GB',
      stock: 25,
      sold: 160,
      categoryId: iphoneCat?.id,
      colors: ['Hồng Pink', 'Xanh Blue', 'Đen Midnight', 'Trắng Starlight', 'Xanh Lá'],
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Cụm camera đặt chéo đặc trưng',
        'Màu hồng pastel cực kỳ hút khách',
        'Chip A15 Bionic cân mượt mọi tác vụ và game',
      ],
      specs: {
        'Màn hình': '6.1 inch Super Retina XDR OLED',
        'Chipset': 'Apple A15 Bionic',
        'Camera': '12MP kép Sensor-shift OIS',
      },
      inBox: ['iPhone 13', 'Cáp sạc', 'Tặng dán full màn'],
      warranty: '12 Tháng bảo hành, 1 đổi 1 trong 30 ngày.',
      description: 'iPhone 13 thiết kế trẻ trung, camera chéo tinh tế, giá cả cực kỳ hợp lý.',
    },

    // ==================== IPHONE 12 SERIES ====================
    {
      name: 'iPhone 12 Pro Max 128GB Pacific Blue',
      slug: 'iphone-12-pro-max-128gb',
      brand: 'Apple',
      price: 13490000,
      oldPrice: 17990000,
      storage: '128GB',
      ram: '6GB',
      stock: 16,
      sold: 180,
      categoryId: iphoneCat?.id,
      colors: ['Xanh Pacific Blue', 'Vàng Gold', 'Graphite', 'Silver'],
      images: [
        'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Khung viền thép vuông vức Ceramic Shield đẳng cấp',
        'Camera 3 mắt hỗ trợ cảm biến LiDAR quét 3D',
        'Màn hình lớn 6.7 inch sắc nét sống động',
      ],
      specs: {
        'Màn hình': '6.7 inch OLED Super Retina XDR',
        'Chipset': 'Apple A14 Bionic (5nm)',
        'Camera': '3 camera 12MP + Cảm biến LiDAR',
        'Pin': '3.687 mAh, Hỗ trợ sạc nhanh 20W & MagSafe',
      },
      inBox: ['iPhone 12 Pro Max', 'Cáp sạc', 'Tặng combo ốp lưng + cường lực'],
      warranty: '12 Tháng bảo hành tại Tấn Đạt Smartphone.',
      description: 'iPhone 12 Pro Max mở đầu cho kỷ nguyên viền phẳng sang trọng, màn hình lớn sắc nét.',
    },
    {
      name: 'iPhone 12 64GB / 128GB',
      slug: 'iphone-12-128gb',
      brand: 'Apple',
      price: 8990000,
      oldPrice: 12990000,
      storage: '128GB',
      ram: '4GB',
      stock: 20,
      sold: 210,
      categoryId: iphoneCat?.id,
      colors: ['Xanh Biển', 'Tím Purple', 'Trắng', 'Đen', 'Xanh Lá', 'Đỏ'],
      images: [
        'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Màn hình OLED viền mỏng cao cấp',
        'Thiết kế phẳng vuông vức siêu nhẹ và gọn gàng',
        'Hỗ trợ kết nối 5G tốc độ cao',
      ],
      specs: {
        'Màn hình': '6.1 inch OLED Super Retina XDR',
        'Chipset': 'Apple A14 Bionic',
        'Camera': '12MP kép chụp đêm Night Mode trên mọi camera',
      },
      inBox: ['iPhone 12', 'Cáp sạc', 'Tặng dán cường lực'],
      warranty: '12 Tháng bảo hành 1 đổi 1 trong 30 ngày.',
      description: 'iPhone 12 là chiếc smartphone quốc dân với màn hình OLED đẹp, viền vuông và giá siêu mềm.',
    },

    // ==================== IPHONE 11 SERIES ====================
    {
      name: 'iPhone 11 Pro Max 64GB / 256GB',
      slug: 'iphone-11-pro-max-256gb',
      brand: 'Apple',
      price: 9990000,
      oldPrice: 13990000,
      storage: '256GB',
      ram: '4GB',
      stock: 25,
      sold: 320,
      categoryId: iphoneCat?.id,
      colors: ['Xanh Midnight Green', 'Vàng Gold', 'Space Gray', 'Silver'],
      images: [
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Màu Midnight Green trứ danh một thời',
        'Cụm 3 camera góc rộng, siêu rộng và tele 2x',
        'Thời lượng pin siêu trâu và độ bền cực cao',
      ],
      specs: {
        'Màn hình': '6.5 inch OLED Super Retina XDR',
        'Chipset': 'Apple A13 Bionic',
        'Camera': '3 camera 12MP',
        'Pin': '3.969 mAh',
      },
      inBox: ['iPhone 11 Pro Max', 'Cáp sạc', 'Tặng ốp & cường lực'],
      warranty: '12 Tháng bảo hành chu đáo.',
      description: 'iPhone 11 Pro Max với cụm 3 camera Midnight Green và pin cực trâu là lựa chọn hoàn hảo trong tầm giá dưới 10 triệu.',
    },
    {
      name: 'iPhone 11 64GB / 128GB Quốc Tế',
      slug: 'iphone-11-128gb',
      brand: 'Apple',
      price: 6490000,
      oldPrice: 8990000,
      storage: '128GB',
      ram: '4GB',
      stock: 30,
      sold: 450,
      categoryId: iphoneCat?.id,
      colors: ['Tím Pastel', 'Xanh Mint', 'Vàng', 'Đen', 'Trắng', 'Đỏ'],
      images: [
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1000&q=80',
      ],
      highlights: [
        'Chiếc iPhone quốc dân bán chạy nhất mọi thời đại',
        'Camera kép chụp góc siêu rộng cực đẹp',
        'Mức giá cực kỳ sinh viên và người dùng phổ thông',
      ],
      specs: {
        'Màn hình': '6.1 inch Liquid Retina HD',
        'Chipset': 'Apple A13 Bionic',
        'Camera': '12MP kép',
        'Pin': '3.110 mAh',
      },
      inBox: ['iPhone 11', 'Cáp sạc', 'Tặng dán cường lực'],
      warranty: '12 Tháng bảo hành uy tín tại Tấn Đạt.',
      description: 'iPhone 11 là sự lựa chọn số 1 trong phân khúc phổ thông với độ bền vượt thời gian và chi phí tối ưu.',
    },

    // ==================== OTHER FLAGSHIPS ====================
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
      ],
      highlights: [
        'Galaxy AI quyền năng: Khoanh vùng tìm kiếm, Phiên dịch trực tiếp cuộc gọi',
        'Camera 200MP Mắt Thần Bóng Đêm',
        'Bút S-Pen tích hợp đa nhiệm',
      ],
      specs: {
        'Màn hình': '6.8 inch Dynamic AMOLED 2X, QHD+, 120Hz, 2600 nits',
        'Chipset': 'Snapdragon 8 Gen 3 for Galaxy',
        'RAM & Bộ nhớ': '12GB - 256GB',
        'Pin': '5.000 mAh, Sạc siêu nhanh 45W',
      },
      inBox: ['Galaxy S24 Ultra kèm bút S-Pen', 'Cáp Type-C', 'Tặng dán màn hình'],
      warranty: '12 Tháng chính hãng Samsung.',
      description: 'Galaxy S24 Ultra quyền năng AI, camera 200MP xuất sắc cùng khung viền Titanium sang trọng.',
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
        'Cảm biến 1 inch Sony LYT-900',
        'Sạc nhanh 90W HyperCharge',
      ],
      specs: {
        'Màn hình': '6.73 inch LTPO AMOLED 2K, 120Hz, 3000 nits',
        'Chipset': 'Qualcomm Snapdragon 8 Gen 3',
        'RAM & Bộ nhớ': '16GB - 512GB',
      },
      inBox: ['Xiaomi 14 Ultra', 'Củ sạc 90W', 'Cáp sạc', 'Ốp lưng'],
      warranty: '18 Tháng chính hãng.',
      description: 'Xiaomi 14 Ultra là đỉnh cao nhiếp ảnh di động hợp tác cùng Leica.',
    },
  ];

  for (const prod of products) {
    const createdProd = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        price: prod.price,
        oldPrice: prod.oldPrice,
        storage: prod.storage,
        ram: prod.ram,
        highlights: prod.highlights,
        specs: prod.specs,
        inBox: prod.inBox,
        warranty: prod.warranty,
        images: prod.images,
        colors: prod.colors,
        description: prod.description,
      },
      create: prod,
    });

    // Add realistic customer reviews for each product
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

  console.log('Seed completed successfully with full iPhone 11 -> iPhone 15 series lineup!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
