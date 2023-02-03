export const TabMeetingRoom = [
  {
    name: 'Người họp',
    key: 'meeting_people',
    sequence: 1,
  },
  {
    name: 'Khách mời',
    key: 'meeting_customer',
    sequence: 2,
  },
  {
    name: 'Nội dung',
    key: 'meeting_content',
    sequence: 3,
  },
  {
    name: 'Dịch vụ',
    key: 'meeting_service',
    sequence: 4,
  },
];

export const ButtonsAddCancel = [
  {
    name: 'Thêm',
    key: 'add',
  },
  {
    name: 'Hủy',
    key: 'cancel',
  },
];
export const ButtonsSave = [
  {
    name: 'Lưu',
    key: 'save',
  },
];

export const ButtonsEditCancel = [
  {
    name: 'Lưu',
    key: 'edit',
  },
  {
    name: 'Xoá',
    key: 'remove',
  },
  {
    name: 'Hủy',
    key: 'cancel',
  },
];

export const ButtonsEdit = [
  {
    name: 'Thay đổi',
    key: 'edit',
  },
  {
    name: 'Xoá',
    key: 'remove',
  },
];

export const ActionChoiceFile = [
  {key: 'image', name: 'image', icon: 'image'},
  {key: 'file', name: 'file', icon: 'file-outline'},
];

export const Buttons = [
  {name: 'Lưu', key: 'save'},
  {name: 'Gửi', key: 'send'},
  {name: 'Đóng', key: 'close'},
];
export const ButtonsApply = [
  {name: 'Gửi', key: 'send'},
  {
    name: 'Đóng',
    key: 'cancel',
  },
];
export const UpdateButton = [
  {name: 'Cập nhật', key: 'confirm_update'},
  {name: 'Hủy', key: 'cancel_edit'},
];

export const TabBookingCar = [
  {name: 'Hành khách', key: 'passenger'},
  {name: 'Người đi cùng', key: 'go_with_passenger'},
  {name: 'Xe và tài xế', key: 'vehicle_and_driver'},
  {name: 'Lộ trình', key: 'routine'},
];

export const StationerySynthesisTab = [
  {name: 'Danh sách đăng ký', key: 'registrations'},
  {name: 'Danh sách VPP', key: 'stationeries'},
];

export const ModelWithIcon = {
  // nhân sự
  'hr.leave.parent': {
    icon: 'power',
    type: 'Feather',
    parent: 'NoFooter',
    screen: 'ViewSabbatical',
  },
  'hr.list.employee.going.on.business': {
    icon: 'card-travel',
    type: 'MaterialIcons',
    parent: 'NoFooter',
    screen: 'ViewBusinessTravel',
  },
  'hr.employee.overtime.parent': {
    icon: 'clock-alert-outline',
    type: 'MaterialCommunityIcons',
    parent: 'NoFooter',
    screen: 'ViewOvertime',
  },
  'hr.work.entry': {
    icon: 'file-document-edit-outline',
    type: 'MaterialCommunityIcons',
    parent: 'NoFooter',
    screen: 'TimeSheetConfirmScreen',
  },
  'hr.synthetic.stationery': {
    icon: 'bookshelf',
    type: 'MaterialCommunityIcons',
    parent: 'NoFooter',
    screen: 'StationeryViewScreen',
  },
  // 'documents.document': {
  //     icon: 'document-attach-outline',
  //     type: 'Ionicons',
  //     parent: 'NoFooter',
  //     screen: '',
  // },
  // 'hr.employee.have.child': {
  //     icon: 'child-care',
  //     type: 'MaterialIcons',
  //     parent: 'NoFooter',
  //     screen: 'ViewChild',
  // },
  // 'hr.express.delivery': {
  //     icon: 'box',
  //     type: 'FontAwesome5',
  //     parent: 'NoFooter',
  //     screen: 'ViewExpressDelivery',
  // },
  // 'hr.shuttle.bus': {
  //     icon: 'bus-alt',
  //     type: 'FontAwesome5',
  //     parent: 'NoFooter',
  //     screen: 'ViewBookCar',
  // },
  // 'hr.employee.going.on.business': {
  //     icon: 'card-travel',
  //     type: 'MaterialIcons',
  //     parent: 'NoFooter',
  //     screen: 'ViewBusinessTravel',
  // },
  // 'hr.register.meeting.room': {
  //     icon: 'account-group',
  //     type: 'MaterialCommunityIcons',
  //     parent: 'NoFooter',
  //     screen: 'ViewMeetingRooms',
  // },
  // Bán hàng
  'sale.order': {
    icon: 'account-group',
    type: 'MaterialCommunityIcons',
    parent: 'NoFooter',
    screen: 'DetailOrderScreen',
  },
  'purchase.order': {
    icon: 'account-group',
    type: 'MaterialCommunityIcons',
    parent: 'NoFooter',
    screen: 'DetailPurchaseOrder',
  },
  // phê duyệt
  'approval.request': {
    icon: 'account-group',
    type: 'MaterialCommunityIcons',
    parent: 'NoFooter',
    screen: 'DetailApprove',
  },
};

export const TabDelivery = [
  {name: 'Thông tin người gửi', key: 'sender_information'},
  {name: 'Thông tin người nhận', key: 'receiver_information'},
];

export const dataHome = [
  {
    title:
      'Sáng 20/9, Tỉnh ủy, HĐND, UBND tỉnh, Tập đoàn Thành Công và Hyundai Motor (Hàn Quốc) phối hợp tổ chức lễ động thổ dự án đầu tư xây dựng nhà máy Hyundai Thành Công số 2 (HTMV 2) tại Khu công nghiệp Gián Khẩu, huyện Gia Viễn. Đây là công trình chào mừng Đại hội đại biểu Đảng bộ tỉnh Ninh Bình lần thứ XXII nhiệm kỳ 2020 - 2025.',
    content:
      'Đến dự có đồng chí Nguyễn Thị Thanh, UVBCH Trung ương Đảng, Phó Trưởng Ban tổ chức TW, Phó trưởng Ban Công tác Đại biểu của Quốc Hội; đồng chí Nguyễn Thị Thu Hà, UVBCH Trung ương Đảng, Bí thư Tỉnh ủy, Trưởng đoàn ĐBQH tỉnh; các đồng chí Thường trực Tỉnh ủy; lãnh đạo một số Bộ, ngành trung ương; đại sứ Hàn Quốc tại Việt Nam, các đồng chí trong BTV Tỉnh ủy, lãnh đạo HĐND, UBND, Đoàn ĐBQH tỉnh, các sở, ban, ngành của tỉnh, thường trực huyện ủy Gia Viễn và các đối tác của Tập đoàn Thành Công',
    images: [
      {
        uri: 'https://picsum.photos/800/500',
      },
      {
        uri: 'https://picsum.photos/seed/picsum/800/500',
      },
      {
        uri: 'https://picsum.photos/seed/picsum/800/500',
      },
    ],
    post_date: '15-09-2020',
  },
  {
    title:
      'Sáng 20/9, Tỉnh ủy, HĐND, UBND tỉnh, Tập đoàn Thành Công và Hyundai Motor (Hàn Quốc) phối hợp tổ chức lễ động thổ dự án đầu tư xây dựng nhà máy Hyundai Thành Công số 2 (HTMV 2) tại Khu công nghiệp Gián Khẩu, huyện Gia Viễn. Đây là công trình chào mừng Đại hội đại biểu Đảng bộ tỉnh Ninh Bình lần thứ XXII nhiệm kỳ 2020 - 2025.',
    content:
      'Đến dự có đồng chí Nguyễn Thị Thanh, UVBCH Trung ương Đảng, Phó Trưởng Ban tổ chức TW, Phó trưởng Ban Công tác Đại biểu của Quốc Hội; đồng chí Nguyễn Thị Thu Hà, UVBCH Trung ương Đảng, Bí thư Tỉnh ủy, Trưởng đoàn ĐBQH tỉnh; các đồng chí Thường trực Tỉnh ủy; lãnh đạo một số Bộ, ngành trung ương; đại sứ Hàn Quốc tại Việt Nam, các đồng chí trong BTV Tỉnh ủy, lãnh đạo HĐND, UBND, Đoàn ĐBQH tỉnh, các sở, ban, ngành của tỉnh, thường trực huyện ủy Gia Viễn và các đối tác của Tập đoàn Thành Công',
    images: [
      {
        uri: 'https://picsum.photos/800/500',
      },
      {
        uri: 'https://picsum.photos/seed/picsum/800/500',
      },
      {
        uri: 'https://picsum.photos/seed/picsum/800/500',
      },
    ],
    post_date: '15-09-2020',
  },
  {
    title:
      'Sáng 20/9, Tỉnh ủy, HĐND, UBND tỉnh, Tập đoàn Thành Công và Hyundai Motor (Hàn Quốc) phối hợp tổ chức lễ động thổ dự án đầu tư xây dựng nhà máy Hyundai Thành Công số 2 (HTMV 2) tại Khu công nghiệp Gián Khẩu, huyện Gia Viễn. Đây là công trình chào mừng Đại hội đại biểu Đảng bộ tỉnh Ninh Bình lần thứ XXII nhiệm kỳ 2020 - 2025.',
    content:
      'Đến dự có đồng chí Nguyễn Thị Thanh, UVBCH Trung ương Đảng, Phó Trưởng Ban tổ chức TW, Phó trưởng Ban Công tác Đại biểu của Quốc Hội; đồng chí Nguyễn Thị Thu Hà, UVBCH Trung ương Đảng, Bí thư Tỉnh ủy, Trưởng đoàn ĐBQH tỉnh; các đồng chí Thường trực Tỉnh ủy; lãnh đạo một số Bộ, ngành trung ương; đại sứ Hàn Quốc tại Việt Nam, các đồng chí trong BTV Tỉnh ủy, lãnh đạo HĐND, UBND, Đoàn ĐBQH tỉnh, các sở, ban, ngành của tỉnh, thường trực huyện ủy Gia Viễn và các đối tác của Tập đoàn Thành Công',
    images: [
      {
        uri: 'https://picsum.photos/800/500',
      },
      {
        uri: 'https://picsum.photos/seed/picsum/800/500',
      },
      {
        uri: 'https://picsum.photos/seed/picsum/800/500',
      },
    ],
    post_date: '15-09-2020',
  },
];

export const PhotoAlbums = [
  {
    id: 1,
    name: 'Trung thu 2020',
    total: 50,
    avatar: 'https://360.tcmotor.vn/wp-content/uploads/2020/09/MG_1720-1.png',
  },
  {
    id: 2,
    name: 'Đồng phục mới TC',
    total: 100,
    avatar: 'https://360.tcmotor.vn/wp-content/uploads/2020/09/MG_1758-1.png',
  },
  {
    id: 3,
    name: 'Đồng phục mới TC',
    total: 100,
    avatar:
      'https://360.tcmotor.vn/wp-content/uploads/2020/09/mockup-h%E1%BB%99p-b%C3%A1nh-trung.png',
  },
  {
    id: 4,
    name: 'Đồng phục mới TC',
    total: 100,
    avatar:
      'https://360.tcmotor.vn/wp-content/uploads/2020/09/banh-trung-thu-khach-san-daewoo-crystal.png',
  },
  {
    id: 5,
    name: 'Đồng phục mới TC',
    total: 100,
    avatar:
      'https://360.tcmotor.vn/wp-content/uploads/2020/09/mockup-h%E1%BB%99p-b%C3%A1nh-trung11.png',
  },
  {
    id: 6,
    name: 'Đồng phục mới TC',
    total: 100,
    avatar:
      'https://360.tcmotor.vn/wp-content/uploads/2020/09/z2098072845151_25f4f27bc3b8601f3c9726d69339ad0d-1536x1024.jpg',
  },
  {
    id: 7,
    name: 'Đồng phục mới TC',
    total: 100,
    avatar:
      'https://360.tcmotor.vn/wp-content/uploads/2020/09/z2098072845151_25f4f27bc3b8601f3c9726d69339ad0d-1536x1024.jpg',
  },
];
export const dataSearch = {
  data: [
    {name: 'Tìm theo tên', code: 'name'},
    {name: 'Tìm theo tên nhân viên kinh doanh', code: 'employee'},
    {name: 'Tìm theo số điện thoại', code: 'phone'},
    {name: 'Tìm theo website', code: 'website'},
    {name: 'Tìm theo email', code: 'email_from'},
  ],
  partner: [
    {name: 'Tìm theo tên khách hàng', code: 'name'},
    {name: 'Tìm theo số điện thoại', code: 'phone'},
  ],
};

export const ButtonSaveCancel = [
  {
    name: 'Lưu',
    key: 'save',
  },
  {
    name: 'Hủy bỏ',
    key: 'cancel',
  },
];

export const ButtonClose = [
  {
    name: 'Đóng',
    key: 'cancel',
  },
];

export const ButtonsEditClose = [
  {
    name: 'Thay đổi',
    key: 'edit',
  },
  {
    name: 'Huỷ',
    key: 'cancel',
  },
];

export const ButtonsApplyCancel = [
  {
    name: 'Áp dụng',
    key: 'add',
  },
  {
    name: 'Làm mới',
    key: 'cancel',
  },
];
