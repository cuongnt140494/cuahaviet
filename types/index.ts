// Thông số cửa cuốn
export interface DoorSpecifications {
  model: string;
  thickness: string; // Độ dày nan
  maxSize: string; // Kích thước tối đa (WxH)
  colors: string[]; // Mã màu
  includedItems: string; // Tiêu chuẩn sp đồng bộ
  material?: string; // Chất liệu
}

// Thông số motor
export interface MotorSpecifications {
  model: string;
  voltage: string; // Điện áp định mức
  power: string; // Công suất định mức
  torque: string; // Mô-men đầu ra
  maxHeight: string; // Chiều cao nâng tối đa
  warranty: string; // Bảo hành
}

// Thông số lưu điện
export interface UPSSpecifications {
  model: string;
  capacity: string; // Dung lượng
  voltage: string; // Điện áp
  compatibility: string; // Tương thích
}

// Thông số phụ kiện
export interface AccessorySpecifications {
  model: string;
  type: string; // Loại
  compatibility?: string; // Tương thích
}

export type ProductSpecifications =
  | DoorSpecifications
  | MotorSpecifications
  | UPSSpecifications
  | AccessorySpecifications;

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  series: Series;
  price: number; // Giá
  wholesalePrice?: number; // Ưu đãi (giá ưu đãi)
  unit: string; // Đơn vị tính (m², bộ, cái)
  images: string[];
  description: string;
  shortDesc?: string; // Mô tả ngắn (tagline)
  specifications: ProductSpecifications;
  features: string[];
  colors?: ColorOption[]; // Màu sắc có sẵn
  inStock: boolean;
}

export interface ColorOption {
  code: string;
  name: string;
  hex?: string;
}

// Phân loại theo loại sản phẩm
export type Category =
  | "cua-cuon-tam-lien"
  | "cua-cuon-khe-thoang"
  | "cua-cuon-dac-biet"
  | "motor"
  | "luu-dien"
  | "phu-kien";

// Phân loại theo dòng sản phẩm
export type Series =
  // Tấm liền
  | "al68"
  | "austroll-cb"
  | "austroll-ap"
  | "austroll-tm"
  | "austroll-ec"
  | "austroll-ecn"
  // Khe thoáng
  | "bigos"
  | "combi"
  | "super"
  | "eco"
  // Đặc biệt
  | "sieu-truong"
  | "truot-tran"
  | "austvision"
  | "austgrill"
  // Motor
  | "motor-s"
  | "motor-ak"
  | "motor-ah"
  | "motor-ax"
  | "motor-arg"
  | "motor-ahv"
  // Lưu điện
  | "ups-z"
  | "ups-e"
  | "ups-p"
  | "ups-ad"
  // Phụ kiện
  | "phu-kien-khac";

export const categoryLabels: Record<Category, string> = {
  "cua-cuon-tam-lien": "Cửa cuốn tấm liền",
  "cua-cuon-khe-thoang": "Cửa cuốn khe thoáng",
  "cua-cuon-dac-biet": "Cửa cuốn đặc biệt",
  "motor": "Bộ tời (Motor)",
  "luu-dien": "Bộ lưu điện UPS",
  "phu-kien": "Phụ kiện",
};

export const seriesLabels: Record<Series, string> = {
  // Tấm liền
  "al68": "AL68 - Nan nhôm",
  "austroll-cb": "Austroll CB",
  "austroll-ap": "Austroll AP",
  "austroll-tm": "Austroll TM",
  "austroll-ec": "Austroll EC",
  "austroll-ecn": "Austroll ECN",
  // Khe thoáng
  "bigos": "Bigos - Siêu trường",
  "combi": "Combi - Thẩm mỹ",
  "super": "Super - Bền bỉ",
  "eco": "Eco - Tiết kiệm",
  // Đặc biệt
  "sieu-truong": "Siêu trường ST100",
  "truot-tran": "Trượt trần Overhead",
  "austvision": "Austvision - Trong suốt",
  "austgrill": "Austgrill - Khớp thoáng",
  // Motor
  "motor-s": "Motor S - Cao cấp",
  "motor-ak": "Motor AK",
  "motor-ah": "Motor AH",
  "motor-ax": "Motor AX - Nhật Bản",
  "motor-arg": "Motor ARG - Tấm liền",
  "motor-ahv": "Motor AHV - Trượt trần",
  // Lưu điện
  "ups-z": "Lưu điện Z",
  "ups-e": "Lưu điện E",
  "ups-p": "Lưu điện P",
  "ups-ad": "Lưu điện AD",
  // Phụ kiện
  "phu-kien-khac": "Phụ kiện khác",
};

// Bảng màu Austdoor
export const austdoorColors: Record<string, ColorOption> = {
  "#01": { code: "#01", name: "Trắng ngà", hex: "#F5F5DC" },
  "#02": { code: "#02", name: "Vàng kem", hex: "#FFFDD0" },
  "#03": { code: "#03", name: "Cafe", hex: "#6F4E37" },
  "#04": { code: "#04", name: "Xanh ngọc", hex: "#40E0D0" },
  "#05": { code: "#05", name: "Ghi sáng", hex: "#A9A9A9" },
  "#06": { code: "#06", name: "Xanh lá", hex: "#228B22" },
  "#07": { code: "#07", name: "Ghi đậm", hex: "#696969" },
  "#08": { code: "#08", name: "Vân gỗ", hex: "#8B4513" },
  "#15": { code: "#15", name: "Trắng sữa", hex: "#FFFAFA" },
  "#16": { code: "#16", name: "Ghi đậm", hex: "#505050" },
  "#24": { code: "#24", name: "Cafe nâu", hex: "#5C4033" },
  "#25": { code: "#25", name: "Ghi xám", hex: "#808080" },
  "#26": { code: "#26", name: "Xám xanh", hex: "#708090" },
  "#28": { code: "#28", name: "Nâu cát", hex: "#C4A484" },
};

export interface CartItem {
  product: Product;
  quantity: number;
}

// Blog types
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: PostCategory;
  author: string;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
}

export type PostCategory =
  | "huong-dan"
  | "tin-tuc"
  | "kien-thuc"
  | "bao-tri";

export const postCategoryLabels: Record<PostCategory, string> = {
  "huong-dan": "Hướng dẫn",
  "tin-tuc": "Tin tức",
  "kien-thuc": "Kiến thức",
  "bao-tri": "Bảo trì",
};
