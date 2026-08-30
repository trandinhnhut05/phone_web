export interface District {
  name: string;
  wards: string[];
}

export interface Province {
  name: string;
  districts: District[];
}

export const VIETNAM_PROVINCES: Province[] = [
  {
    name: 'Thừa Thiên Huế',
    districts: [
      {
        name: 'Huyện Phong Điền (Cửa hàng Tấn Đạt)',
        wards: [
          'Xã Phong Xuân (Chợ Phong Xuân)',
          'Thị trấn Phong Điền',
          'Xã Phong An',
          'Xã Phong Hiền',
          'Xã Phong Hòa',
          'Xã Phong Mỹ',
          'Xã Phong Sơn',
          'Xã Phong Thu',
          'Xã Phong Chương',
          'Xã Phong Bình',
          'Xã Điền Hải',
          'Xã Điền Hòa',
          'Xã Điền Lộc',
          'Xã Điền Môn',
          'Xã Điền Hương',
        ],
      },
      {
        name: 'Thành phố Huế',
        wards: [
          'Phường Vĩnh Ninh',
          'Phường Phú Nhuận',
          'Phường Phú Hội',
          'Phường Phú Nhuận',
          'Phường Xuân Phú',
          'Phường Phước Vĩnh',
          'Phường Trường An',
          'Phường An Cựu',
          'Phường An Đông',
          'Phường An Tây',
          'Phường Vỹ Dạ',
          'Phường Thuận Lộc',
          'Phường Thuận Thành',
          'Phường Tây Lộc',
          'Phường Kim Long',
          'Phường Hương Sơ',
          'Phường Hương Long',
          'Phường Thủy Xuân',
          'Phường Thủy Biều',
        ],
      },
      {
        name: 'Thị xã Hương Trà',
        wards: ['Phường Tứ Hạ', 'Phường Hương Văn', 'Phường Hương Vân', 'Phường Hương Chữ', 'Xã Hương Bình', 'Xã Hương Toàn'],
      },
      {
        name: 'Thị xã Hương Thủy',
        wards: ['Phường Phú Bài', 'Phường Thủy Châu', 'Phường Thủy Dương', 'Phường Thủy Lương', 'Phường Thủy Phương'],
      },
      {
        name: 'Huyện Quảng Điền',
        wards: ['Thị trấn Sịa', 'Xã Quảng An', 'Xã Quảng Thành', 'Xã Quảng Thọ', 'Xã Quảng Phước', 'Xã Quảng Vinh'],
      },
      {
        name: 'Huyện Phú Vang',
        wards: ['Thị trấn Phú Đa', 'Xã Phú An', 'Xã Phú Mỹ', 'Xã Phú Thuận', 'Xã Phú Hải', 'Xã Vinh An'],
      },
      {
        name: 'Huyện Phú Lộc',
        wards: ['Thị trấn Phú Lộc', 'Thị trấn Lăng Cô', 'Xã Lộc An', 'Xã Lộc Điền', 'Xã Lộc Thủy', 'Xã Lộc Vĩnh'],
      },
      {
        name: 'Huyện A Lưới',
        wards: ['Thị trấn A Lưới', 'Xã A Ngo', 'Xã Hồng Bắc', 'Xã Hồng Vân', 'Xã Hương Phong'],
      },
      {
        name: 'Huyện Nam Đông',
        wards: ['Thị trấn Khe Tre', 'Xã Hương Phú', 'Xã Hương Lộc', 'Xã Thượng Lộ'],
      },
    ],
  },
  {
    name: 'Thành phố Đà Nẵng',
    districts: [
      { name: 'Quận Hải Châu', wards: ['Phường Hải Châu I', 'Phường Thạch Thang', 'Phường Hòa Cường Bắc', 'Phường Hòa Cường Nam'] },
      { name: 'Quận Thanh Khê', wards: ['Phường Vĩnh Trung', 'Phường Tân Chính', 'Phường Thạc Gián', 'Phường Chính Gián'] },
      { name: 'Quận Sơn Trà', wards: ['Phường An Hải Bắc', 'Phường An Hải Tây', 'Phường Phước Mỹ', 'Phường Thọ Quang'] },
      { name: 'Quận Ngũ Hành Sơn', wards: ['Phường Mỹ An', 'Phường Khuê Mỹ', 'Phường Hòa Quý', 'Phường Hòa Hải'] },
      { name: 'Quận Liên Chiểu', wards: ['Phường Hòa Khánh Bắc', 'Phường Hòa Khánh Nam', 'Phường Hòa Minh'] },
      { name: 'Quận Cẩm Lệ', wards: ['Phường Khuê Trung', 'Phường Hòa Thọ Đông', 'Phường Hòa Xuân'] },
    ],
  },
  {
    name: 'Tỉnh Quảng Trị',
    districts: [
      { name: 'Thành phố Đông Hà', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 5', 'Phường Đông Lễ', 'Phường Đông Lương'] },
      { name: 'Thị xã Quảng Trị', wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường An Đôn'] },
      { name: 'Huyện Hải Lăng', wards: ['Thị trấn Diên Sanh', 'Xã Hải Ba', 'Xã Hải Chánh', 'Xã Hải Quy', 'Xã Hải Phong'] },
      { name: 'Huyện Triệu Phong', wards: ['Thị trấn Ái Tử', 'Xã Triệu An', 'Xã Triệu Thượng', 'Xã Triệu Thành'] },
      { name: 'Huyện Gio Linh', wards: ['Thị trấn Gio Linh', 'Thị trấn Cửa Việt', 'Xã Gio Quang', 'Xã Gio Mai'] },
      { name: 'Huyện Vĩnh Linh', wards: ['Thị trấn Hồ Xá', 'Thị trấn Cửa Tùng', 'Xã Vĩnh Thạch', 'Xã Vĩnh Kim'] },
      { name: 'Huyện Cam Lộ', wards: ['Thị trấn Cam Lộ', 'Xã Cam Chính', 'Xã Cam Nghĩa', 'Xã Cam Tuyền'] },
    ],
  },
  {
    name: 'Tỉnh Quảng Bình',
    districts: [
      { name: 'Thành phố Đồng Hới', wards: ['Phường Hải Đình', 'Phường Đồng Mỹ', 'Phường Nam Lý', 'Phường Bắc Lý'] },
      { name: 'Huyện Lệ Thủy', wards: ['Thị trấn Kiến Giang', 'Xã An Thủy', 'Xã Phong Thủy', 'Xã Cam Thủy'] },
      { name: 'Huyện Quảng Ninh', wards: ['Thị trấn Quán Hàu', 'Xã Võ Ninh', 'Xã Gia Ninh', 'Xã Duy Ninh'] },
      { name: 'Thị xã Ba Đồn', wards: ['Phường Ba Đồn', 'Phường Quảng Thọ', 'Phường Quảng Thuận'] },
    ],
  },
  {
    name: 'Tỉnh Quảng Nam',
    districts: [
      { name: 'Thành phố Tam Kỳ', wards: ['Phường An Mỹ', 'Phường An Xuân', 'Phường Phước Hòa', 'Phường Tân Thạnh'] },
      { name: 'Thành phố Hội An', wards: ['Phường Minh An', 'Phường Cẩm Phô', 'Phường Tân An', 'Phường Cửa Đại'] },
      { name: 'Thị xã Điện Bàn', wards: ['Phường Vĩnh Điện', 'Phường Điện Ngọc', 'Phường Điện Nam Trung'] },
    ],
  },
  {
    name: 'Thành phố Hà Nội',
    districts: [
      { name: 'Quận Ba Đình', wards: ['Phường Điện Biên', 'Phường Đội Cấn', 'Phường Kim Mã', 'Phường Giảng Võ'] },
      { name: 'Quận Hoàn Kiếm', wards: ['Phường Hàng Bạc', 'Phường Hàng Đào', 'Phường Hàng Bài', 'Phường Tràng Tiền'] },
      { name: 'Quận Cầu Giấy', wards: ['Phường Dịch Vọng', 'Phường Nghĩa Đô', 'Phường Quan Hoa', 'Phường Trung Hòa'] },
      { name: 'Quận Đống Đa', wards: ['Phường Ô Chợ Dừa', 'Phường Láng Hạ', 'Phường Láng Thượng', 'Phường Khâm Thiên'] },
      { name: 'Quận Hai Bà Trưng', wards: ['Phường Bách Khoa', 'Phường Minh Khai', 'Phường Trương Định', 'Phường Đồng Tâm'] },
      { name: 'Quận Nam Từ Liêm', wards: ['Phường Mỹ Đình 1', 'Phường Mỹ Đình 2', 'Phường Mễ Trì', 'Phường Trung Văn'] },
    ],
  },
  {
    name: 'Thành phố Hồ Chí Minh',
    districts: [
      { name: 'Quận 1', wards: ['Phường Bến Nghé', 'Phường Bến Thành', 'Phường Đa Kao', 'Phường Tân Định'] },
      { name: 'Quận 3', wards: ['Phường Võ Thị Sáu', 'Phường 1', 'Phường 2', 'Phường 3', 'Phường 4'] },
      { name: 'Thành phố Thủ Đức', wards: ['Phường Thảo Điền', 'Phường An Phú', 'Phường Bình Thọ', 'Phường Linh Trung'] },
      { name: 'Quận Bình Thạnh', wards: ['Phường 1', 'Phường 2', 'Phường 14', 'Phường 25', 'Phường 26'] },
      { name: 'Quận Tân Bình', wards: ['Phường 1', 'Phường 2', 'Phường 4', 'Phường 12', 'Phường 13'] },
      { name: 'Quận 7', wards: ['Phường Tân Phong', 'Phường Phú Mỹ', 'Phường Tân Kiểng', 'Phường Tân Quy'] },
    ],
  },
  {
    name: 'Tỉnh/Thành khác (Toàn quốc)',
    districts: [
      { name: 'Khu vực Trung tâm Huyện/Thị xã', wards: ['Thị trấn Trung tâm', 'Phường Trung tâm', 'Xã/Khu vực khác'] },
    ],
  },
];
