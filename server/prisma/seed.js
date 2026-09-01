import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding iPhone 11-15 database for Tấn Đạt Smartphone...');

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

    const categories = [
        { name: 'iPhone (Apple)', slug: 'iphone' },
        { name: 'Samsung Galaxy', slug: 'samsung' },
        { name: 'Xiaomi', slug: 'xiaomi' },
        { name: 'OPPO', slug: 'oppo' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: { name: cat.name },
            create: cat,
        });
    }

    const catIphone = await prisma.category.findUnique({ where: { slug: 'iphone' } });
    const catSamsung = await prisma.category.findUnique({ where: { slug: 'samsung' } });
    const catXiaomi = await prisma.category.findUnique({ where: { slug: 'xiaomi' } });

    const productsData = [
        // IPHONE 15 SERIES
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
            categoryId: catIphone.id,
            colors: ['Titan Tự Nhiên', 'Titan Xanh', 'Titan Đen', 'Titan Trắng'],
            images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 15 Pro Max khung Titan chuẩn hàng không, camera zoom quang học 5x, chip A17 Pro siêu tốc.',
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
            categoryId: catIphone.id,
            colors: ['Titan Tự Nhiên', 'Titan Xanh', 'Titan Đen', 'Titan Trắng'],
            images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 15 Pro 6.1 inch nhỏ gọn, màn 120Hz ProMotion mượt mà, chip A17 Pro.',
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
            categoryId: catIphone.id,
            colors: ['Hồng Pastel', 'Xanh Mint', 'Vàng', 'Xanh Dương', 'Đen'],
            images: ['https://images.unsplash.com/photo-1695048065057-0a4a58406ca7?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 15 Plus màn hình lớn 6.7 inch, Dynamic Island, pin trâu số 1 thị trường.',
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
            categoryId: catIphone.id,
            colors: ['Hồng Pastel', 'Xanh Lá', 'Vàng', 'Xanh Dương', 'Đen'],
            images: ['https://images.unsplash.com/photo-1695048065057-0a4a58406ca7?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 15 kính pha màu trẻ trung, Dynamic Island thông minh, camera 48MP sắc nét.',
        },

        // IPHONE 14 SERIES
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
            categoryId: catIphone.id,
            colors: ['Tím Deep Purple', 'Vàng Gold', 'Đen Space Black', 'Bạc Silver'],
            images: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 14 Pro Max màu tím huyền thoại, màn hình Dynamic Island Always-On, camera 48MP.',
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
            categoryId: catIphone.id,
            colors: ['Tím Deep Purple', 'Vàng Gold', 'Đen Space Black', 'Bạc Silver'],
            images: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 14 Pro 6.1 inch Dynamic Island 120Hz ProMotion cao cấp.',
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
            categoryId: catIphone.id,
            colors: ['Xanh Blue', 'Tím Nhạt', 'Đen Midnight', 'Trắng Starlight'],
            images: ['https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 14 chip A15 Bionic 5 nhân GPU mượt mà, Action Mode chống rung đỉnh cao.',
        },

        // IPHONE 13 SERIES
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
            categoryId: catIphone.id,
            colors: ['Xanh Sierra Blue', 'Xanh Alpine Green', 'Vàng Gold', 'Graphite'],
            images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 13 Pro Max màn 120Hz ProMotion siêu mượt, thời lượng pin trâu 2 ngày.',
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
            categoryId: catIphone.id,
            colors: ['Hồng Pink', 'Xanh Blue', 'Đen Midnight', 'Trắng Starlight'],
            images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 13 camera đặt chéo ấn tượng, chip A15 Bionic mạnh mẽ, màu hồng pastel hot.',
        },

        // IPHONE 12 SERIES
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
            categoryId: catIphone.id,
            colors: ['Xanh Pacific Blue', 'Vàng Gold', 'Graphite', 'Silver'],
            images: ['https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 12 Pro Max viền thép vuông vức Ceramic Shield, 3 camera có cảm biến LiDAR.',
        },
        {
            name: 'iPhone 12 128GB',
            slug: 'iphone-12-128gb',
            brand: 'Apple',
            price: 8990000,
            oldPrice: 12990000,
            storage: '128GB',
            ram: '4GB',
            stock: 20,
            sold: 210,
            categoryId: catIphone.id,
            colors: ['Xanh Biển', 'Tím Purple', 'Trắng', 'Đen', 'Xanh Lá', 'Đỏ'],
            images: ['https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 12 màn hình OLED viền mỏng, kết nối 5G, giá thành siêu hấp dẫn.',
        },

        // IPHONE 11 SERIES
        {
            name: 'iPhone 11 Pro Max 256GB',
            slug: 'iphone-11-pro-max-256gb',
            brand: 'Apple',
            price: 9990000,
            oldPrice: 13990000,
            storage: '256GB',
            ram: '4GB',
            stock: 25,
            sold: 320,
            categoryId: catIphone.id,
            colors: ['Xanh Midnight Green', 'Vàng Gold', 'Space Gray', 'Silver'],
            images: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 11 Pro Max 3 camera Midnight Green, pin trâu bền bỉ giá dưới 10 triệu.',
        },
        {
            name: 'iPhone 11 128GB Quốc Tế',
            slug: 'iphone-11-128gb',
            brand: 'Apple',
            price: 6490000,
            oldPrice: 8990000,
            storage: '128GB',
            ram: '4GB',
            stock: 30,
            sold: 450,
            categoryId: catIphone.id,
            colors: ['Tím Pastel', 'Xanh Mint', 'Vàng', 'Đen', 'Trắng', 'Đỏ'],
            images: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'],
            description: 'iPhone 11 chiếc điện thoại quốc dân bền bỉ, camera kép góc rộng và giá rẻ nhất.',
        },

        // OTHER
        {
            name: 'Samsung Galaxy S24 Ultra 5G 256GB',
            slug: 'samsung-galaxy-s24-ultra-5g',
            brand: 'Samsung',
            price: 26990000,
            oldPrice: 31990000,
            storage: '256GB',
            ram: '12GB',
            stock: 12,
            sold: 35,
            categoryId: catSamsung.id,
            images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'],
            colors: ['Xám Titan', 'Đen Titan', 'Tím Titan', 'Vàng Titan'],
            description: 'Galaxy S24 Ultra khung Titan, camera 200MP Mắt Thần Bóng Đêm và quyền năng AI.',
        },
    ];

    for (const prod of productsData) {
        await prisma.product.upsert({
            where: { slug: prod.slug },
            update: prod,
            create: prod,
        });
    }

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
