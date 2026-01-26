// SEO Configuration for Cửa Hà Việt
// This file contains all SEO-related constants and configurations

export const siteConfig = {
  // Basic Info
  name: "Cửa Hà Việt",
  shortName: "Cửa Hà Việt",
  tagline: "Đại lý cửa cuốn Austdoor chính hãng tại Hà Nội",
  description:
    "Cửa Hà Việt - Đại lý phân phối cửa cuốn Austdoor chính hãng số 1 tại Hà Nội. Chuyên cung cấp cửa cuốn khe thoáng, tấm liền, motor, bộ lưu điện với giá tốt nhất. Bảo hành 5 năm, lắp đặt tận nơi.",

  // URLs
  url: "https://cuahaviet.vn",
  ogImage: "https://cuahaviet.vn/images/og-image.jpg",

  // Contact Info
  phone: "0919086272",
  phoneFormatted: "0919 086 272",
  email: "contact@cuahaviet.vn",

  // Address
  address: {
    street: "123 Đường ABC",
    district: "Quận Cầu Giấy",
    city: "Hà Nội",
    country: "Việt Nam",
    postalCode: "100000",
    full: "123 Đường ABC, Quận Cầu Giấy, Hà Nội, Việt Nam",
  },

  // Geo coordinates (Hanoi center approximation)
  geo: {
    latitude: 21.0285,
    longitude: 105.8542,
  },

  // Business Info
  business: {
    foundingDate: "2014",
    priceRange: "$$",
    openingHours: "Mo-Su 08:00-18:00",
    openingHoursText: "8:00 - 18:00 (Thứ 2 - Chủ nhật)",
    serviceArea: "Hà Nội",
    currencies: ["VND"],
    languages: ["vi"],
  },

  // Social Links
  social: {
    facebook: "https://facebook.com/cuahaviet",
    youtube: "https://youtube.com/@cuahaviet",
    zalo: "https://zalo.me/0919086272",
  },

  // Branding
  brand: {
    primaryColor: "#2563eb",
    logo: "https://cuahaviet.vn/images/logo.png",
  },

  // Keywords
  keywords: [
    "cửa cuốn Austdoor",
    "cửa cuốn Hà Nội",
    "đại lý cửa cuốn",
    "cửa cuốn khe thoáng",
    "cửa cuốn tấm liền",
    "motor cửa cuốn",
    "bộ lưu điện cửa cuốn",
    "cửa cuốn chính hãng",
    "lắp đặt cửa cuốn",
    "sửa chữa cửa cuốn",
    "cửa cuốn giá rẻ",
    "cửa cuốn bảo hành 5 năm",
  ],

  // Author
  author: {
    name: "Cửa Hà Việt",
    url: "https://cuahaviet.vn",
  },

  // Verification (replace with actual values)
  verification: {
    google: "", // Google Search Console
    yandex: "",
    bing: "",
  },
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: "Cửa Hà Việt - Đại lý cửa cuốn Austdoor chính hãng tại Hà Nội",
    description:
      "Cửa Hà Việt - Đại lý cửa cuốn Austdoor số 1 Hà Nội. Cửa cuốn khe thoáng, tấm liền, motor, lưu điện chính hãng. Bảo hành 5 năm. Gọi ngay 0919 086 272!",
    keywords: "cửa cuốn Austdoor, đại lý cửa cuốn Hà Nội, cửa cuốn chính hãng, lắp đặt cửa cuốn",
  },
  products: {
    title: "Sản phẩm cửa cuốn Austdoor | Cửa Hà Việt",
    description:
      "Đầy đủ các dòng cửa cuốn Austdoor: khe thoáng, tấm liền, motor, bộ lưu điện UPS, phụ kiện. Giá tốt nhất Hà Nội, bảo hành 5 năm.",
    keywords: "sản phẩm cửa cuốn, cửa cuốn khe thoáng, cửa cuốn tấm liền, motor cửa cuốn, lưu điện UPS",
  },
  about: {
    title: "Giới thiệu Cửa Hà Việt - Đại lý Austdoor chính hãng",
    description:
      "Cửa Hà Việt - Hơn 10 năm kinh nghiệm phân phối cửa cuốn Austdoor tại Hà Nội. 1000+ công trình, đội ngũ kỹ thuật chuyên nghiệp, bảo hành 5 năm.",
    keywords: "giới thiệu Cửa Hà Việt, đại lý Austdoor, lịch sử công ty, đội ngũ kỹ thuật",
  },
  contact: {
    title: "Liên hệ Cửa Hà Việt | Hotline: 0919 086 272",
    description:
      "Liên hệ Cửa Hà Việt để được tư vấn miễn phí về cửa cuốn Austdoor. Hotline: 0919 086 272. Email: contact@cuahaviet.vn. Showroom tại Hà Nội.",
    keywords: "liên hệ cửa cuốn, tư vấn cửa cuốn, hotline cửa cuốn, showroom cửa cuốn Hà Nội",
  },
  blog: {
    title: "Tin tức & Kiến thức cửa cuốn | Cửa Hà Việt",
    description:
      "Cập nhật tin tức, hướng dẫn chọn mua, cách bảo trì cửa cuốn Austdoor. Kiến thức hữu ích từ chuyên gia.",
    keywords: "tin tức cửa cuốn, hướng dẫn cửa cuốn, bảo trì cửa cuốn, kiến thức cửa cuốn",
  },
  cart: {
    title: "Giỏ hàng | Cửa Hà Việt",
    description: "Xem giỏ hàng và tiến hành đặt hàng cửa cuốn Austdoor tại Cửa Hà Việt.",
  },
  compare: {
    title: "So sánh sản phẩm | Cửa Hà Việt",
    description: "So sánh các sản phẩm cửa cuốn Austdoor để chọn loại phù hợp nhất cho công trình của bạn.",
  },
};

// Helper function to generate full title
export function generateTitle(pageTitle: string): string {
  if (pageTitle.includes("Cửa Hà Việt")) {
    return pageTitle;
  }
  return `${pageTitle} | Cửa Hà Việt`;
}

// Helper function to generate canonical URL
export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}

// Helper function to generate OpenGraph image URL
export function generateOgImageUrl(path?: string): string {
  if (path) {
    return `${siteConfig.url}${path}`;
  }
  return siteConfig.ogImage;
}
