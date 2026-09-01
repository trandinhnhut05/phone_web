import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding rich tech articles for Tấn Đạt Smartphone...');

  const blogPosts = [
    {
      title: 'Khi Nào Nên Ép Kính Thay Vì Thay Toàn Bộ Màn Hình iPhone? (Tiết Kiệm Đến 80% Chi Phí)',
      slug: 'khi-nao-nen-ep-kinh-iphone-tiet-kiem-chi-phi',
      category: 'Kinh nghiệm sửa chữa',
      summary: 'Phân biệt vỡ mặt kính ngoài và hỏng phôi màn hình cảm ứng trong, giúp bạn chọn đúng dịch vụ ép kính tiết kiệm hàng triệu đồng tại Tấn Đạt Smartphone.',
      image: '/images/repair/ep_kinh.jpg',
      published: true,
      views: 1250,
      content: `
# Khi Nào Nên Ép Kính Thay Vì Thay Màn Hình iPhone?

Khi chiếc iPhone vô tình bị rơi vỡ, điều khiến người dùng lo lắng nhất chính là **chi phí sửa chữa**. Màn hình iPhone chính hãng, đặc biệt là các dòng iPhone 12, 13, 14, 15 Pro Max, có giá thay mới từ vài triệu đến gần chục triệu đồng.

Tuy nhiên, **không phải lúc nào vỡ màn hình cũng phải thay cả cụm màn đắt đỏ**. Nếu biết cách phân biệt, bạn chỉ cần **ép kính** với mức giá chỉ bằng 10 - 20% chi phí thay mới!

---

## 1. Cấu tạo màn hình iPhone gồm những gì?
Màn hình iPhone hiện đại gồm 3 lớp chính:
1. **Lớp kính ngoài cùng (Glass / Ceramic Shield):** Bảo vệ màn hình, chịu lực tác động trực tiếp.
2. **Lớp cảm ứng (Touch Digitizer):** Nhận diện thao tác vuốt, chạm của ngón tay.
3. **Lớp phôi hiển thị (OLED / LCD Display):** Hiển thị hình ảnh, màu sắc, độ sáng.

---

## 2. Dấu hiệu bạn CHỈ CẦN ÉP KÍNH (Tiết kiệm tối đa):
- Mặt kính bên ngoài bị nứt, rạn chân chim hoặc vỡ vụn.
- **Màn hình bên trong vẫn hiển thị rõ nét 100%**, không có sọc kẻ (sọc xanh, sọc hồng), không có đốm đen mực chảy, không bị chớp giật.
- **Cảm ứng vẫn vuốt chạm mượt mà**, không bị liệt điểm hay nhảy loạn.

> 💡 **Tại Tấn Đạt Smartphone:** Dịch vụ ép kính sử dụng máy hút chân không chuyên dụng, keo OCA chuẩn nhà máy giúp giữ lại **phôi màn hình Zin gốc của Apple**, bảo hành bọt keo 12 tháng!

---

## 3. Khi nào BẮT BUỘC phải thay cả bộ màn hình?
- Màn hình xuất hiện sọc dọc, sọc ngang nhiều màu.
- Màn hình bị loang mực tím, chảy đốm đen che khuất tầm nhìn.
- Màn hình tối đen hoàn toàn dù máy vẫn rung, đổ chuông khi có cuộc gọi.
- Màn hình bị chớp tắt liên tục, mất hiển thị True Tone.

---

## 4. Bảng giá ưu đãi ép kính tại Tấn Đạt Smartphone (Chợ Phong Xuân, Huế):
- Ép kính iPhone 12 / 12 Pro: **Chỉ từ 400.000đ** (Giá gốc 500k, giảm ngay 100k).
- Ép kính iPhone 13 / 13 Pro: **Chỉ từ 500.000đ**.
- Ép kính iPhone 14 Pro Max: **Chỉ từ 700.000đ**.
- Ép kính iPhone 15 Pro Max: **Chỉ từ 1.100.000đ**.

👉 Quý khách có thể trực tiếp ngồi xem kỹ thuật viên bóc tách và ép kính lấy ngay sau 45 - 60 phút. Liên hệ Hotline: **093 567 7775** để được kiểm tra màn hình miễn phí!
      `,
    },
    {
      title: 'Sàng IC Cảm Ứng iPhone Là Gì? Vì Sao Cần Sàng IC Khi Thay Cảm Ứng?',
      slug: 'sang-ic-cam-ung-iphone-la-gi-vi-sao-can-sang-ic',
      category: 'Kỹ thuật chuyên sâu',
      summary: 'Tìm hiểu bí quyết kỹ thuật sàng IC gốc sang cảm ứng mới để iPhone không bị báo thông báo "Màn hình không chính hãng" và giữ trọn độ mượt mà 100%.',
      image: '/images/repair/sang_ic.jpg',
      published: true,
      views: 980,
      content: `
# Sàng IC Cảm Ứng iPhone Là Gì? Vì Sao Nên Chọn Thợ Tay Nghề Cao?

Từ các thế hệ **iPhone X, XS, 11 cho đến iPhone 12, 13, 14, 15**, Apple đã tích hợp chip mã hóa (Security IC) gắn liền với từng bo mạch chủ và màn hình gốc.

Khi cảm ứng bị liệt, nếu thợ chỉ thay cảm ứng thông thường mà không **sàng chip IC gốc**, máy sẽ xuất hiện cảnh báo *"Không thể xác minh màn hình chính hãng"* trong phần Cài đặt và tính năng True Tone có thể bị vô hiệu hóa.

---

## 1. Kỹ thuật "Sàng IC" là làm những gì?
1. Kỹ thuật viên dùng kính hiển vi và máy khò hàn nhiệt độ chuẩn bóc tách **con chip IC cảm ứng gốc** trên cáp màn hình cũ.
2. Làm sạch chân chì, đổ lại chân chì BGA mới siêu nhỏ bằng khuôn dập chuyên dụng.
3. Hàn chính xác con chip IC gốc này sang lớp cảm ứng mới thay thế.

---

## 2. Lợi ích khi thay cảm ứng bao gồm Sàng IC tại Tấn Đạt:
- **Không báo lỗi màn hình:** Máy nhận diện 100% như linh kiện xuất xưởng, hiển thị lịch sử linh kiện nguyên bản.
- **Giữ trọn độ nhạy cảm ứng:** Không có hiện tượng giật lag, đơ khi chơi game hoặc gõ bàn phím tốc độ cao.
- **Bảo hành 3 tháng an tâm:** Toàn bộ chi phí sàng IC đã được bao gồm trọn gói trong bảng giá, không phụ thu thêm bất kỳ khoản nào!

---

## 3. Bảng giá thay cảm ứng bao sàng IC tại Tấn Đạt Smartphone:
- iPhone X / XS / XR: **400.000đ** (Giá gốc 500k).
- iPhone XS Max: **500.000đ** (Giá gốc 600k).
- iPhone 11: **400.000đ** | 11 Pro: **500.000đ** | 11 Pro Max: **600.000đ**.
- iPhone 12 / 12 Pro: **600.000đ**.

Hãy mang máy đến ngay **Tấn Đạt Smartphone - Chợ Phong Xuân, Phong Điền, TP. Huế** hoặc gọi **093 567 7775** để được hỗ trợ kiểm tra chi tiết!
      `,
    },
    {
      title: 'Thay Nắp Lưng Kính Cắt Mắt Camera iPhone: Giải Pháp Làm Mới Không Cần Bung Máy',
      slug: 'thay-nap-lung-kinh-cat-mat-camera-iphone',
      category: 'Tư vấn linh kiện',
      summary: 'Công nghệ thay kính lưng cắt mắt CNC giúp giữ zin thân máy, chống bụi bẩn và khít đẹp 100% như ban đầu sau khi rơi vỡ.',
      image: '/images/repair/thay_lung.jpg',
      published: true,
      views: 1420,
      content: `
# Thay Nắp Lưng Kính Cắt Mắt Camera iPhone — Bí Quyết Giữ Zin Máy

Mặt lưng kính là một trong những điểm sang trọng nhất trên iPhone từ đời iPhone 8 Plus đến iPhone 15 Pro Max. Tuy nhiên, chỉ một cú rơi trên mặt đường bê tông cũng có thể khiến mặt lưng rạn nứt chằng chịt, làm giảm thẩm mỹ và có nguy cơ đứt tay người dùng.

Trước đây, để thay nắp lưng, thợ phải tháo toàn bộ linh kiện máy, tháo cụm camera ra khỏi khung sườn. Nhưng với công nghệ **kính lưng cắt mắt CNC**, mọi thứ đã trở nên an toàn và nhanh chóng hơn rất nhiều!

---

## 1. "Kính lưng cắt mắt" là gì?
Kính lưng cắt mắt là loại mặt kính được gia công với **lỗ camera lớn hơn một cách chính xác theo chuẩn CNC**, vừa khít với vành camera kim loại của Apple.
- Kỹ thuật viên có thể bóc tách lớp kính vỡ và dán kính lưng mới vào **mà không cần tháo cụm camera zin của máy**.
- Giúp hạn chế tối đa nguy cơ bụi lọt vào ống kính camera hay đứt cáp sạc không dây MagSafe.

---

## 2. Ưu điểm vượt trội:
- **Thời gian siêu nhanh:** Hoàn thành chỉ sau 30 - 45 phút, quý khách có thể ngồi uống trà và nhận máy liền.
- **Khít đẹp từng milimet:** Kính cao cấp có độ mờ nhám và bóng bẩy chuẩn 100% theo từng màu sắc (Sierra Blue, Deep Purple, Titan Tự Nhiên, Midnight Green...).
- **Bảo hành khít keo trọn đời:** Cam kết không hở viền, không ọp ẹp khi cầm nắm.

---

## 3. Mức giá ưu đãi đặc biệt tại Tấn Đạt:
- iPhone 8 Plus / X / XS: **Chỉ 150.000đ** (Giá gốc 250k).
- iPhone 11 Pro / 11 Pro Max: **Chỉ 300.000đ** (Giá gốc 400k).
- iPhone 12 / 13 / 14 Series: **Chỉ 300.000đ - 500.000đ**.
- iPhone 15 Series: Liên hệ hotline để nhận giá ưu đãi tốt nhất khu vực.
      `,
    },
    {
      title: 'Top 5 Mẹo Tối Ưu Thời Lượng Pin iPhone Giúp Máy Chạy Mát Và Bền Bỉ Hơn',
      slug: 'top-5-meo-toi-uu-thoi-luong-pin-iphone',
      category: 'Mẹo hay công nghệ',
      summary: 'Bí quyết thiết lập tính năng sạc pin tối ưu hóa, quản lý làm mới ứng dụng nền và tắt định vị ẩn giúp kéo dài tuổi thọ pin iPhone của bạn.',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
      published: true,
      views: 2100,
      content: `
# 5 Mẹo Tối Ưu Pin iPhone Cực Đỉnh Ai Cũng Nên Biết

Pin iPhone bị tụt nhanh và máy nhanh nóng là vấn đề phổ biến của nhiều người dùng sau một thời gian sử dụng. Dưới đây là 5 mẹo đơn giản do kỹ thuật viên Tấn Đạt Smartphone tổng hợp giúp bạn kéo dài thời lượng pin đáng kể:

---

## 1. Bật tính năng "Sạc pin được tối ưu hóa"
- Vào **Cài đặt > Pin > Tình trạng pin & Sạc**.
- Bật **Sạc pin được tối ưu hóa** (hoặc giới hạn 80% trên iPhone 15 series).
- Tính năng này giúp máy học thói quen sạc qua đêm của bạn và làm chậm quá trình lão hóa hóa học của cell pin.

---

## 2. Quản lý "Làm mới ứng dụng trong nền"
Nhiều ứng dụng như mạng xã hội, game tự động tải dữ liệu liên tục gây hao pin ngầm:
- Vào **Cài đặt > Cài đặt chung > Làm mới ứng dụng trong nền**.
- Chọn **Tắt** hoặc chỉ cho phép các ứng dụng nhắn tin quan trọng như Zalo, Messenger.

---

## 3. Tắt định vị của các ứng dụng không cần thiết
- Vào **Cài đặt > Quyền riêng tư & Bảo mật > Dịch vụ định vị**.
- Chuyển các ứng dụng mua sắm, giải trí sang chế độ **"Khi dùng ứng dụng"** thay vì "Luôn luôn".

---

## 4. Sử dụng chế độ nền tối (Dark Mode) cho màn hình OLED
Với các dòng từ iPhone X trở lên sử dụng màn hình OLED, các điểm ảnh màu đen sẽ tắt hoàn toàn:
- Bật **Giao diện tối** trong **Cài đặt > Màn hình & Độ sáng** để tiết kiệm tới 30% điện năng tiêu thụ màn hình.

---

## 5. Thay pin chính hãng khi độ chai vượt quá 20%
Khi Dung lượng tối đa của pin dưới **80%**, máy sẽ bắt đầu giật lag do cơ chế giảm hiệu năng để tránh sập nguồn. Đừng ngần ngại mang máy đến **Tấn Đạt Smartphone** để được thay pin dung lượng chuẩn / dung lượng cao với chế độ bảo hành 12 tháng!
      `,
    },
    {
      title: 'Đánh Giá Chi Tiết iOS 18: Các Tính Năng Đáng Giá Nhất Bạn Nên Thử Ngay',
      slug: 'danh-gia-chi-tiet-ios-18-tinh-nang-moi',
      category: 'Tin tức công nghệ',
      summary: 'Tùy biến màn hình chính tự do, khóa ứng dụng bằng Face ID, trung tâm điều khiển thế hệ mới và những nâng cấp đỉnh cao trên iOS 18.',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
      published: true,
      views: 1850,
      content: `
# Khám Phá iOS 18: Bản Cập Nhật Thay Đổi Toàn Diện Trải Nghiệm iPhone

Apple vừa chính thức phát hành phiên bản **iOS 18** mang đến làn gió mới cho người dùng iPhone với hàng loạt tính năng tùy biến mạnh mẽ nhất từ trước đến nay.

---

## 1. Tự do sắp xếp biểu tượng màn hình chính
Sau nhiều năm chờ đợi, người dùng iOS 18 giờ đây có thể:
- Đặt icon ứng dụng ở bất kỳ vị trí nào trên màn hình để không che mất hình nền.
- Tự do đổi màu sắc icon theo tông màu tối (Dark Mode) hoặc phối màu đơn sắc (Tinted) cực cá tính.

---

## 2. Khóa và ẩn ứng dụng riêng tư bằng Face ID
- Bạn có thể nhấn giữ bất kỳ ứng dụng nào và chọn **"Yêu cầu Face ID"**.
- Ứng dụng sẽ bị khóa hoàn toàn, thậm chí có thể ẩn vào thư mục bảo mật mà người ngoài không thể nhìn thấy.

---

## 3. Trung tâm điều khiển (Control Center) được thiết kế lại
- Nhiều trang điều khiển riêng biệt (Phát nhạc, Kết nối, Nhà thông minh).
- Cho phép thay đổi kích thước các nút bấm to nhỏ tùy thích.
- Đổi được 2 phím tắt Đèn pin và Camera ngoài màn hình khóa thành bất kỳ tính năng nào khác.

---

## 4. Danh sách các máy được nâng cấp lên iOS 18:
Toàn bộ các dòng máy từ **iPhone XR, iPhone XS, iPhone 11 series cho đến iPhone 15, iPhone 16 series** đều được hỗ trợ cập nhật mượt mà!

> 💬 Nếu gặp khó khăn khi nâng cấp iOS hoặc máy bị treo táo, hãy ghé ngay **Tấn Đạt Smartphone** để được kỹ thuật viên hỗ trợ nâng cấp phần mềm an toàn và miễn phí!
      `,
    },
    {
      title: 'Cách Nhận Biết iPhone Nguyên Bản Chuẩn Zin Khi Mua Điện Thoại Cũ Tại Huế',
      slug: 'cach-kiem-tra-iphone-cu-nguyen-ban-chuan-zin',
      category: 'Kinh nghiệm mua sắm',
      summary: 'Hướng dẫn 7 bước test máy chuẩn thợ từ kiểm tra True Tone, 3uTools, áp suất kháng nước đến camera và độ chai pin thực tế.',
      image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80',
      published: true,
      views: 3100,
      content: `
# Cẩm Nang 7 Bước Test iPhone Cũ Nguyên Bản Cho Người Mới

Mua iPhone đã qua sử dụng là giải pháp thông minh giúp tiết kiệm từ vài triệu đến hàng chục triệu đồng. Tuy nhiên, thị trường có rất nhiều loại máy dựng, máy qua sửa chữa kém chất lượng. Dưới đây là cẩm nang 7 bước kiểm tra giúp bạn chọn được chiếc iPhone chuẩn zin:

---

## Bước 1: Kiểm tra ngoại hình và ốc đít
- 2 ốc đuôi sườn máy phải còn nguyên vẹn, không bị toét cạnh hay có dấu hiệu vặn mở ẩu.
- Viền màn hình phải khít đều, không có keo thừa phòi ra ngoài.

---

## Bước 2: Kiểm tra màn hình và tính năng True Tone
- Kéo thanh độ sáng màn hình xuống và kiểm tra xem có biểu tượng **True Tone** hay không.
- Nhấn giữ một icon trên màn hình chính và rê khắp các góc màn hình để kiểm tra xem có bị đứt điểm cảm ứng ở đâu không.

---

## Bước 3: Kiểm tra Face ID / Touch ID
- Vào **Cài đặt > Face ID & Mật mã**, thử thiết lập nhận diện khuôn mặt 2 lần. Face ID phải nhận diện nhanh nhạy trong mọi góc độ.

---

## Bước 4: Kiểm tra Camera và Micro
- Mở Camera chuyển qua lại giữa các ống kính (0.5x, 1x, 2x, 3x, 5x) xem có bị đơ giật hay rung lag không.
- Quay một đoạn video bằng camera trước và sau, sau đó bật loa nghe lại để kiểm tra micro thu âm có trong trẻo không.

---

## Bước 5: Kiểm tra pin và số lần sạc
- Vào **Cài đặt > Pin > Tình trạng pin**. Pin zin thường có độ chai tỷ lệ thuận với ngoại hình và năm sản xuất của máy.

---

## Bước 6: Kiểm tra tài khoản iCloud ẩn
- Yêu cầu người bán đặt lại dòng 2: **Cài đặt > Cài đặt chung > Chuyển hoặc đặt lại iPhone > Xóa tất cả nội dung và cài đặt**. Sau khi kích hoạt lại vào màn hình chính mới chứng minh máy sạch 100% không dính iCloud ẩn hay MDM.

---

## Bước 7: Mua tại địa chỉ uy tín có bảo hành rõ ràng
Tại **Tấn Đạt Smartphone (Chợ Phong Xuân, Phong Điền, TP. Huế)**, mỗi chiếc máy bán ra đều được:
- Kiểm tra nghiêm ngặt qua 32 bước test tiêu chuẩn.
- Cam kết máy nguyên bản 100%, bảo hành 12 tháng và bao test 1 đổi 1 trong 30 ngày đầu.
- Hỗ trợ thu cũ đổi mới lên đời với giá trợ giá cao nhất.

📞 Hotline tư vấn: **093 567 7775**
      `,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log(`Successfully seeded ${blogPosts.length} rich tech articles!`);
}

main()
  .catch((e) => {
    console.error('Error seeding blog posts:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
