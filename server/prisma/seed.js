import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
    console.log('🌱 Đang khởi tạo dữ liệu mẫu (Seeding database)...');
    // 1. Clean existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.user.deleteMany();
    // 2. Create Users
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);
    const admin = await prisma.user.create({
        data: {
            email: 'admin@phoneweb.com',
            password: adminPassword,
            name: 'Quản trị viên',
            role: 'ADMIN',
            phone: '0988888888',
        },
    });
    const customer = await prisma.user.create({
        data: {
            email: 'khachhang@gmail.com',
            password: userPassword,
            name: 'Nguyễn Văn A',
            role: 'USER',
            phone: '0912345678',
        },
    });
    console.log('✅ Đã tạo tài khoản: Admin (admin@phoneweb.com / admin123) & Khách hàng (khachhang@gmail.com / user123)');
    // 3. Create Categories
    const catIphone = await prisma.category.create({
        data: { name: 'iPhone (Apple)', slug: 'iphone' },
    });
    const catSamsung = await prisma.category.create({
        data: { name: 'Samsung Galaxy', slug: 'samsung' },
    });
    const catXiaomi = await prisma.category.create({
        data: { name: 'Xiaomi', slug: 'xiaomi' },
    });
    const catOppo = await prisma.category.create({
        data: { name: 'OPPO', slug: 'oppo' },
    });
    console.log('✅ Đã tạo các danh mục thương hiệu');
    // 4. Create 8 Products
    const productsData = [
        {
            name: 'iPhone 16 Pro Max 256GB',
            slug: 'iphone-16-pro-max-256gb',
            brand: 'Apple',
            price: 34990000,
            oldPrice: 36990000,
            storage: '256GB',
            ram: '8GB',
            stock: 45,
            sold: 120,
            categoryId: catIphone.id,
            images: [
                'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
            ],
            colors: ['Titan Sa Mạc', 'Titan Tự Nhiên', 'Titan Trắng', 'Titan Đen'],
            description: 'iPhone 16 Pro Max sở hữu màn hình Super Retina XDR 6.9 inch, chip Apple A18 Pro cực đỉnh với công nghệ Apple Intelligence và nút Camera Control tiện dụng.',
        },
        {
            name: 'iPhone 15 128GB',
            slug: 'iphone-15-128gb',
            brand: 'Apple',
            price: 19490000,
            oldPrice: 22990000,
            storage: '128GB',
            ram: '6GB',
            stock: 30,
            sold: 250,
            categoryId: catIphone.id,
            images: [
                'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80',
            ],
            colors: ['Hồng Pastel', 'Xanh Lá', 'Vàng', 'Xanh Dương', 'Đen'],
            description: 'Thiết kế mặt lưng kính pha màu bền bỉ, Dynamic Island thông minh và camera chính 48MP cho ảnh chụp độ phân giải siêu cao.',
        },
        {
            name: 'Samsung Galaxy S25 Ultra 5G 512GB',
            slug: 'samsung-galaxy-s25-ultra-512gb',
            brand: 'Samsung',
            price: 33990000,
            oldPrice: 37990000,
            storage: '512GB',
            ram: '12GB',
            stock: 25,
            sold: 88,
            categoryId: catSamsung.id,
            images: [
                'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
            ],
            colors: ['Xám Titan', 'Đen Titan', 'Tím Titan', 'Vàng Titan'],
            description: 'Siêu phẩm Snapdragon 8 Elite for Galaxy kết hợp cùng Galaxy AI thế hệ mới, camera 200MP zoom siêu phân giải và bút S-Pen tích hợp.',
        },
        {
            name: 'Samsung Galaxy Z Fold 6 256GB',
            slug: 'samsung-galaxy-z-fold-6-256gb',
            brand: 'Samsung',
            price: 41990000,
            oldPrice: 43990000,
            storage: '256GB',
            ram: '12GB',
            stock: 15,
            sold: 42,
            categoryId: catSamsung.id,
            images: [
                'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
            ],
            colors: ['Xám Kim Loại', 'Hồng Rose', 'Xanh Navy'],
            description: 'Thiết kế gập mỏng nhẹ nhất từ trước đến nay, đa nhiệm cùng lúc 3 ứng dụng mượt mà với sức mạnh trí tuệ nhân tạo Galaxy AI.',
        },
        {
            name: 'Xiaomi 15 Pro 5G 256GB',
            slug: 'xiaomi-15-pro-256gb',
            brand: 'Xiaomi',
            price: 21990000,
            oldPrice: 24490000,
            storage: '256GB',
            ram: '12GB',
            stock: 50,
            sold: 65,
            categoryId: catXiaomi.id,
            images: [
                'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
            ],
            colors: ['Bạc Titan', 'Xanh Ngọc', 'Đen Huyền Bí'],
            description: 'Hệ thống 3 camera Leica 50MP đỉnh cao quang học, vi xử lý Snapdragon 8 Elite cùng viên pin khủng 6100mAh sạc siêu nhanh 90W.',
        },
        {
            name: 'Xiaomi Redmi Note 14 Pro+ 5G',
            slug: 'xiaomi-redmi-note-14-pro-plus',
            brand: 'Xiaomi',
            price: 8990000,
            oldPrice: 9990000,
            storage: '256GB',
            ram: '8GB',
            stock: 80,
            sold: 310,
            categoryId: catXiaomi.id,
            images: [
                'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80',
            ],
            colors: ['Tím Tử Đằng', 'Xanh Băng Tuyết', 'Đen Bóng Đêm'],
            description: 'Màn hình OLED cong 1.5K 120Hz sắc nét, chuẩn kháng nước bụi IP68/IP69K siêu bền bỉ và camera 200MP chống rung OIS.',
        },
        {
            name: 'OPPO Find X8 Pro 5G 512GB',
            slug: 'oppo-find-x8-pro-512gb',
            brand: 'OPPO',
            price: 26990000,
            oldPrice: 29990000,
            storage: '512GB',
            ram: '16GB',
            stock: 20,
            sold: 55,
            categoryId: catOppo.id,
            images: [
                'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80',
            ],
            colors: ['Trắng Ngọc Trai', 'Đen Không Gian'],
            description: 'Hệ thống 2 camera tiềm vọng chuẩn Hasselblad, chip MediaTek Dimensity 9400 tiến trình 3nm và phím bấm thao tác nhanh Quick Button.',
        },
        {
            name: 'OPPO Reno 12 Pro 5G 256GB',
            slug: 'oppo-reno-12-pro-256gb',
            brand: 'OPPO',
            price: 12490000,
            oldPrice: 13990000,
            storage: '256GB',
            ram: '12GB',
            stock: 35,
            sold: 140,
            categoryId: catOppo.id,
            images: [
                'https://images.unsplash.com/photo-1533228896884-6a8f931280d6?auto=format&fit=crop&w=800&q=80',
            ],
            colors: ['Bạc Tinh Vân', 'Nâu Hoàng Hôn'],
            description: 'Chuyên gia chân dung AI đỉnh cao với tính năng xóa vật thể AI Eraser 2.0, thiết kế dòng chảy ngân hà siêu mỏng nhẹ quyến rũ.',
        },
    ];
    for (const prod of productsData) {
        await prisma.product.create({ data: prod });
    }
    console.log(`✅ Đã tạo ${productsData.length} sản phẩm điện thoại mẫu`);
    // 5. Create Sample Blog Posts
    const blogPosts = [
        {
            title: 'Đánh giá chi tiết iPhone 16 Pro Max: Đỉnh cao công nghệ và AI',
            slug: 'danh-gia-chi-tiet-iphone-16-pro-max',
            summary: 'Khám phá tất cả các nâng cấp vượt trội trên chiếc flagship mạnh mẽ nhất năm nay của Apple.',
            content: 'iPhone 16 Pro Max không chỉ mang đến màn hình lớn hơn 6.9 inch viền siêu mỏng mà còn là bước tiến lớn với Apple Intelligence...',
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
            category: 'Đánh giá',
            published: true,
            views: 1250,
        },
        {
            title: 'Top 5 điện thoại tầm trung đáng mua nhất đầu năm 2026',
            slug: 'top-5-dien-thoai-tam-trung-dang-mua-nhat-2026',
            summary: 'Tổng hợp những chiếc smartphone pin trâu, chụp ảnh đẹp với mức giá cực kỳ phải chăng cho học sinh, sinh viên.',
            content: 'Phân khúc tầm trung ngày càng sôi động với sự góp mặt của Redmi Note 14 series, Galaxy A series...',
            image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80',
            category: 'Tư vấn',
            published: true,
            views: 890,
        },
        {
            title: 'Mẹo tối ưu thời lượng pin trên điện thoại Android & iOS hiệu quả',
            slug: 'meo-toi-uu-thoi-luong-pin-dien-thoai',
            summary: 'Những mẹo đơn giản nhưng giúp kéo dài tuổi thọ và thời gian sử dụng pin mỗi ngày cho dế yêu của bạn.',
            content: 'Để pin điện thoại luôn trong tình trạng tốt nhất, bạn nên duy trì mức sạc từ 20% đến 80%...',
            image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
            category: 'Mẹo hay',
            published: true,
            views: 450,
        },
    ];
    for (const post of blogPosts) {
        await prisma.blogPost.create({ data: post });
    }
    console.log('✅ Đã tạo các bài viết blog mẫu');
    console.log('🎉 Hoàn tất Seed dữ liệu!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
