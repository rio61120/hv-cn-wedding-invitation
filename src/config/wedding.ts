/**
 * Wedding Configuration Data
 * Exactly matching the wedding invitation card provided by the user:
 * Groom: Hoàng Quốc Việt
 * Bride: Ngô Thị Cẩm Nhung
 * Lễ Nạp Tài: 9:00 Thứ Ba 24.11.2026 tại Tư Gia Nhà Gái
 * Lễ Thành Hôn: 9:00 Chủ Nhật 29.11.2026 tại Tư Gia Nhà Trai
 */

export interface EventDetail {
  title: string;
  subTitle: string;
  time: string;
  dayOfWeek: string;
  solarDate: string;
  lunarDate: string;
  venueName: string;
  address: string;
  googleMapsUrl: string;
}

export interface WeddingData {
  couple: {
    groomName: string;
    brideName: string;
    groomFullName: string;
    brideFullName: string;
    groomShort: string;
    brideShort: string;
    monogram: string;
    hashtag: string;
    title: string;
  };
  date: {
    saveTheDate: string;
    dayOfWeek: string;
    day: string;
    month: string;
    year: string;
    time: string;
    lunarDate: string;
    isoDateTime: string;
    countdownTarget: string;
    calendarMonthName: string;
    selectedDay: number;
    napTaiDay: number;
  };
  events: {
    napTai: EventDetail;
    thanhHon: EventDetail;
  };
  venue: {
    name: string;
    address: string;
    mapQuery: string;
    googleMapsUrl: string;
  };
  families: {
    bride: {
      label: string;
      father: string;
      mother: string;
      address: string;
    };
    groom: {
      label: string;
      father: string;
      mother: string;
      address: string;
    };
  };
  quotes: {
    bride: {
      role: string;
      name: string;
      quote: string;
    };
    groom: {
      role: string;
      name: string;
      quote: string;
    };
  };
  timeline: Array<{
    time: string;
    date: string;
    title: string;
    description: string;
    type: 'welcome' | 'ceremony' | 'banquet';
  }>;
  gratitude: {
    heading: string;
    body: string;
    scriptHighlight: string;
    closing: string;
  };
  photos: {
    hero: string;
    intimate: string;
    bride: string;
    decor: string;
    ceremony: string;
  };
}

export const weddingConfig: WeddingData = {
  couple: {
    groomName: "HOÀNG VIỆT",
    brideName: "CẨM NHUNG",
    groomFullName: "Hoàng Quốc Việt",
    brideFullName: "Ngô Thị Cẩm Nhung",
    groomShort: "Việt",
    brideShort: "Nhung",
    monogram: "VN",
    hashtag: "#VietNhungWedding",
    title: "Việt & Nhung Wedding",
  },
  date: {
    saveTheDate: "29.11.2026",
    dayOfWeek: "CHỦ NHẬT",
    day: "29",
    month: "THÁNG MƯỜI MỘT",
    year: "2026",
    time: "9:00",
    lunarDate: "Tức ngày 21 tháng 10 năm Bính Ngọ",
    isoDateTime: "2026-11-29T09:00:00+07:00",
    countdownTarget: "2026-11-29T09:00:00+07:00",
    calendarMonthName: "Tháng 11",
    selectedDay: 29,
    napTaiDay: 24,
  },
  events: {
    napTai: {
      title: "LỄ NẠP TÀI",
      subTitle: "Ăn hỏi & Đón dâu",
      time: "9:00",
      dayOfWeek: "THỨ BA",
      solarDate: "24.11.2026",
      lunarDate: "Tức ngày 16 tháng 10 năm Bính Ngọ",
      venueName: "TƯ GIA NHÀ GÁI",
      address: "Lô 37, TĐC 05, MBQH 1606 (KĐT Núi Long), P. Hạc Thành, Thanh Hóa",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=KĐT+Núi+Long+Hạc+Thành+Thanh+Hóa",
    },
    thanhHon: {
      title: "LỄ THÀNH HÔN",
      subTitle: "Hôn lễ chính thức",
      time: "9:00",
      dayOfWeek: "CHỦ NHẬT",
      solarDate: "29.11.2026",
      lunarDate: "Tức ngày 21 tháng 10 năm Bính Ngọ",
      venueName: "TƯ GIA NHÀ TRAI",
      address: "Số Nhà 19, Khu Phố Nam Sơn Rừng Thông, P. Đông Sơn, Thanh Hóa",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Khu+Phố+Nam+Sơn+Rừng+Thông+Đông+Sơn+Thanh+Hóa",
    },
  },
  venue: {
    name: "TƯ GIA NHÀ TRAI",
    address: "Số Nhà 19, Khu Phố Nam Sơn Rừng Thông, P. Đông Sơn, Thanh Hóa",
    mapQuery: "Khu Phố Nam Sơn Rừng Thông, P. Đông Sơn, Thanh Hóa",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Khu+Phố+Nam+Sơn+Rừng+Thông+Đông+Sơn+Thanh+Hóa",
  },
  families: {
    bride: {
      label: "NHÀ GÁI",
      father: "Ông: Ngô Quang Chính",
      mother: "Bà: Đỗ Thị Oanh",
      address: "Lô 37, TĐC 05, MBQH 1606 (KĐT Núi Long), P. Hạc Thành, Thanh Hóa",
    },
    groom: {
      label: "NHÀ TRAI",
      father: "Ông: Hoàng Quốc Khánh",
      mother: "Bà: Đỗ Thị Hiền",
      address: "Số Nhà 19, Khu Phố Nam Sơn Rừng Thông, P. Đông Sơn, Thanh Hóa",
    },
  },
  quotes: {
    bride: {
      role: "Cô dâu",
      name: "NGÔ THỊ CẨM NHUNG",
      quote: "Cảm ơn anh đã đến, kiên nhẫn yêu thương và cùng em xây đắp tổ ấm. Từ ngày có anh bên cạnh, em biết mình đã tìm thấy một nơi chốn bình yên và trọn vẹn nhất để sẻ chia suốt cuộc đời.",
    },
    groom: {
      role: "Chú rể",
      name: "HOÀNG QUỐC VIỆT",
      quote: "Cảm ơn em đã bước vào cuộc đời anh và làm cho mọi khoảnh khắc trở nên ý nghĩa. Ngay từ giây phút đầu tiên, anh đã biết em chính là người phụ nữ anh muốn che chở và yêu thương trọn vẹn mãi mãi.",
    },
  },
  timeline: [
    {
      time: "09:00",
      date: "24.11.2026",
      title: "LỄ NẠP TÀI",
      description: "Nghi lễ ăn hỏi & trao sính lễ tại Tư gia nhà Gái",
      type: "welcome",
    },
    {
      time: "09:00",
      date: "29.11.2026",
      title: "LỄ THÀNH HÔN",
      description: "Hôn lễ thiêng liêng rước dâu tại Tư gia nhà Trai",
      type: "ceremony",
    },
    {
      time: "11:00",
      date: "29.11.2026",
      title: "KHAI TIỆC MỪNG",
      description: "Dùng bữa cơm thân mật chung vui cùng hai bên gia đình",
      type: "banquet",
    },
  ],
  gratitude: {
    heading: "Thank You",
    body: "Cảm ơn quý khách và bạn bè thân hữu đã dành tình cảm cho vợ chồng chúng mình! Sự hiện diện của quý khách là niềm vinh hạnh to lớn nhất đối với gia đình chúng tôi.",
    scriptHighlight: "Trân trọng kính mời!",
    closing: "Việt & Nhung",
  },
  photos: {
    hero: "/assets/gallery/_optimized/IMG_0779.webp",
    intimate: "/assets/gallery/_optimized/IMG_0778.webp",
    bride: "/assets/gallery/_optimized/IMG_0776.webp",
    decor: "/assets/gallery/_optimized/IMG_1992.webp",
    ceremony: "/assets/gallery/_optimized/05-ceremony.webp",
  },
};

