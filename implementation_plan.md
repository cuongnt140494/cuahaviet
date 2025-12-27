# 🏗️ KẾ HOẠCH DỰ ÁN - CỬA HÀ VIỆT

> **Website Thương Mại Điện Tử Chuyên Nghiệp**  
> Chuyên cung cấp Cửa Cuốn, Cửa Nhôm, Cửa Gỗ Composite tại Hà Nội

---

## 📊 THÔNG TIN DỰ ÁN

| Thông tin | Chi tiết |
|-----------|----------|
| **Doanh nghiệp** | Cửa Hà Việt |
| **Địa chỉ** | 46 Vũ Văn Cẩn, Hà Đông, Hà Nội |
| **Liên hệ** | 📞 0919086272 │ ✉️ cuahaviet@gmail.com |
| **Database** | JSON files (demo) → PostgreSQL + Prisma (production) |

---

## 🛠️ TECHNOLOGY STACK

| Layer | Technology | Version | Ghi chú |
|-------|-----------|---------|----------|
| **Framework** | Next.js (App Router) | 15.x | Latest stable |
| **Language** | TypeScript | 5.x | Type safety |
| **Styling** | Tailwind CSS | **4.x** | Latest stable |
| **UI Library** | shadcn/ui | Latest | Radix-based |
| **Database** | PostgreSQL | 16.x | Production |
| **ORM** | Prisma | 6.x | Type-safe ORM |
| **Auth** | NextAuth.js | v5 | Session-based |
| **Forms** | React Hook Form + Zod | Latest | Validation |
| **State** | TanStack Query | v5 | Server state |
| **Images** | **Local Storage** | - | `public/images/` |
| **Email** | Resend + React Email | - | Transactional |
| **Analytics** | Google Analytics 4 | - | + FB Pixel |
| **Deployment** | Vercel | - | Edge functions |

---

## 🔐 ENVIRONMENT VARIABLES

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cuahaviet"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_xxxxx"
ADMIN_EMAIL="cuahaviet@gmail.com"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXX"
NEXT_PUBLIC_FB_PIXEL_ID="xxxxxxx"

# Image Storage (Future - khi scale lên cloud)
# CLOUDINARY_CLOUD_NAME="your-cloud-name"
# CLOUDINARY_API_KEY="your-api-key"
# CLOUDINARY_API_SECRET="your-api-secret"
```

---

## 📸 IMAGE STORAGE

### Hiện tại: Local Storage
```
public/
├── images/
│   ├── products/      → Hình sản phẩm (upload từ Admin)
│   ├── categories/    → Hình danh mục
│   ├── projects/      → Gallery dự án
│   ├── banners/       → Hero banners
│   ├── posts/         → Thumbnails bài viết
│   ├── avatars/       → Avatar khách hàng
│   └── logo.png       → Logo công ty
```

**Xử lý Upload:**
- Max file size: 5MB
- Formats: JPG, PNG, WebP
- Auto resize: 1200px max width
- Thumbnail: 400px
- Unique filename: `{timestamp}-{random}.{ext}`

### Tương lai: Cloud Storage
Khi hệ thống scale lớn, chuyển sang:
- **Cloudinary** (recommended) - Free 25GB
- **Vercel Blob** - Tích hợp tốt với Vercel
- **AWS S3** - Enterprise level

---

## �📁 CẤU TRÚC DỰ ÁN

```
cuahaviet/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
└── src/
    ├── app/
    │   ├── (storefront)/
    │   │   ├── page.tsx                    # Trang chủ
    │   │   ├── san-pham/page.tsx           # Danh sách SP
    │   │   ├── san-pham/[slug]/page.tsx    # Chi tiết SP
    │   │   ├── danh-muc/[slug]/page.tsx    # Danh mục
    │   │   ├── du-an/page.tsx              # Portfolio
    │   │   ├── du-an/[slug]/page.tsx       # Chi tiết dự án
    │   │   ├── tin-tuc/page.tsx            # Blog
    │   │   ├── tin-tuc/[slug]/page.tsx     # Chi tiết bài viết
    │   │   ├── lien-he/page.tsx            # Liên hệ
    │   │   ├── bao-gia/page.tsx            # Form báo giá
    │   │   ├── so-sanh/page.tsx            # So sánh SP ⭐ NEW
    │   │   └── tinh-gia/page.tsx           # Tính giá ước lượng ⭐ NEW
    │   ├── admin/
    │   │   ├── page.tsx                    # Dashboard
    │   │   ├── products/                   # Quản lý SP
    │   │   ├── categories/                 # Quản lý danh mục
    │   │   ├── inquiries/                  # Yêu cầu báo giá
    │   │   ├── projects/                   # Dự án ⭐ NEW
    │   │   ├── posts/                      # Bài viết
    │   │   ├── testimonials/               # Đánh giá KH ⭐ NEW
    │   │   ├── faqs/                       # FAQ ⭐ NEW
    │   │   ├── banners/                    # Quản lý banner ⭐ NEW
    │   │   └── settings/                   # Cài đặt
    │   └── api/
    │       ├── products/
    │       ├── categories/
    │       ├── inquiries/
    │       ├── projects/
    │       ├── posts/
    │       ├── testimonials/
    │       ├── faqs/
    │       ├── banners/
    │       ├── upload/
    │       └── calculate-price/            # API tính giá ⭐ NEW
    ├── components/
    │   ├── ui/                             # shadcn/ui
    │   ├── storefront/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── HeroSection.tsx
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductGrid.tsx
    │   │   ├── QuoteForm.tsx
    │   │   ├── PriceCalculator.tsx         # ⭐ NEW
    │   │   ├── CompareProducts.tsx         # ⭐ NEW
    │   │   ├── FAQSection.tsx              # ⭐ NEW
    │   │   ├── TestimonialSection.tsx
    │   │   ├── FloatingCTA.tsx             # Zalo/Phone buttons
    │   │   └── ImageGallery.tsx
    │   └── admin/
    │       ├── Sidebar.tsx
    │       ├── DataTable.tsx
    │       ├── ProductForm.tsx
    │       └── PostEditor.tsx
    ├── lib/
    │   ├── prisma.ts
    │   ├── auth.ts
    │   ├── utils.ts
    │   └── validations.ts
    └── types/
```

---

## 🗄️ DATABASE SCHEMA

```prisma
// ========== CORE MODELS ==========

model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  image       String?
  icon        String?
  order       Int       @default(0)
  isActive    Boolean   @default(true)
  metaTitle   String?
  metaDescription String?
  products    Product[]
  faqs        FAQ[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id             String   @id @default(cuid())
  name           String
  slug           String   @unique
  description    String?
  features       String[]
  specifications Json?    // Dynamic specs theo category
  priceFrom      Decimal?
  priceTo        Decimal?
  unit           String   @default("VNĐ/m²")
  images         String[]
  thumbnail      String?
  videoUrl       String?
  categoryId     String
  category       Category @relation(fields: [categoryId], references: [id])
  isActive       Boolean  @default(true)
  isFeatured     Boolean  @default(false)
  viewCount      Int      @default(0)
  metaTitle      String?
  metaDescription String?
  keywords       String[]
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Inquiry {
  id          String        @id @default(cuid())
  name        String
  phone       String
  email       String?
  address     String?
  productId   String?
  productName String?
  message     String
  area        String?       // Diện tích (m2)
  width       Decimal?      // Chiều rộng (m) ⭐ NEW
  height      Decimal?      // Chiều cao (m) ⭐ NEW
  source      String        @default("website")
  status      InquiryStatus @default(PENDING)
  notes       String?
  // UTM Tracking ⭐ NEW
  utmSource   String?
  utmMedium   String?
  utmCampaign String?
  landingPage String?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

enum InquiryStatus {
  PENDING
  CONTACTED
  QUOTED
  WON
  LOST
  SPAM
}

// ========== PORTFOLIO ==========

model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String?
  location    String?
  client      String?
  projectType String?  // "Nhà phố", "Biệt thự", "Showroom"
  images      String[]
  thumbnail   String?
  area        String?
  year        Int?
  products    String[] // Product IDs
  isFeatured  Boolean  @default(false)
  isPublished Boolean  @default(true)
  viewCount   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// ========== BLOG ==========

model Post {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  excerpt     String?
  content     String
  thumbnail   String?
  tags        String[]
  isPublished Boolean   @default(false)
  isFeatured  Boolean   @default(false)
  viewCount   Int       @default(0)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// ========== ⭐ NEW MODELS ==========

model FAQ {
  id         String   @id @default(cuid())
  question   String
  answer     String
  categoryId String?
  category   Category? @relation(fields: [categoryId], references: [id])
  order      Int      @default(0)
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Testimonial {
  id           String   @id @default(cuid())
  customerName String
  location     String?
  content      String
  rating       Int      @default(5)
  avatar       String?
  projectId    String?
  isApproved   Boolean  @default(false)
  isFeatured   Boolean  @default(false)
  createdAt    DateTime @default(now())
}

model Banner {
  id        String    @id @default(cuid())
  title     String
  subtitle  String?
  image     String
  link      String?
  position  String    // "hero", "sidebar", "popup"
  order     Int       @default(0)
  startDate DateTime?
  endDate   DateTime?
  isActive  Boolean   @default(true)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model PriceConfig {
  id           String  @id @default(cuid())
  categorySlug String  @unique
  basePrice    Decimal // Giá cơ bản/m²
  minWidth     Decimal @default(1)
  maxWidth     Decimal @default(10)
  minHeight    Decimal @default(1)
  maxHeight    Decimal @default(6)
  // Hệ số điều chỉnh
  motorFactor  Decimal @default(1.2)  // +20% nếu có motor
  premiumFactor Decimal @default(1.3) // +30% cho dòng cao cấp
  isActive     Boolean @default(true)
  updatedAt    DateTime @updatedAt
}

// ========== SETTINGS ==========

model CompanyInfo {
  id           String @id @default("singleton")
  name         String @default("Cửa Hà Việt")
  phone        String @default("0919086272")
  email        String @default("cuahaviet@gmail.com")
  address      String @default("46 Vũ Văn Cẩn, Hà Đông, Hà Nội")
  facebook     String?
  zalo         String?
  youtube      String?
  openingHours String @default("8:00 - 18:00")
  googleAnalyticsId String?
  facebookPixelId   String?
  updatedAt    DateTime @updatedAt
}

model Admin {
  id       String @id @default(cuid())
  email    String @unique
  password String
  name     String
  role     String @default("ADMIN")
  createdAt DateTime @default(now())
}
```

---

## 🎨 TÍNH NĂNG MỚI BỔ SUNG

### 1. ⭐ Công Cụ Tính Giá Ước Lượng
```
URL: /tinh-gia
- Chọn loại cửa (Cuốn/Nhôm/Gỗ)
- Nhập kích thước (Rộng x Cao)
- Chọn options (Motor, Premium...)
- → Hiển thị khoảng giá ước tính
- → CTA "Yêu cầu báo giá chính xác"
```

### 2. ⭐ So Sánh Sản Phẩm
```
URL: /so-sanh
- Chọn 2-3 sản phẩm từ danh sách
- Hiển thị bảng so sánh specs
- Highlight điểm khác biệt
```

### 3. ⭐ FAQ Section
```
- FAQ chung + FAQ theo từng danh mục
- Accordion UI
- Schema.org FAQPage cho SEO
```

### 4. ⭐ Testimonials/Đánh giá
```
- Carousel trên trang chủ
- Link đến Project (nếu có)
- Admin duyệt trước khi hiển thị
```

### 5. ⭐ Dynamic Banners
```
- Quản lý hero banners
- Lên lịch hiển thị (start/end date)
- Hỗ trợ popup banner
```

### 6. ⭐ UTM Tracking
```
- Tự động capture UTM params
- Lưu vào inquiry records
- Dashboard báo cáo nguồn leads
```

---

## 📱 STOREFRONT PAGES - CHI TIẾT CHỨC NĂNG

### 1. Trang Chủ (`/`)
**Hero Section:**
- Slider/Carousel full-width (3-5 slides)
- Mỗi slide: Background image, Title, Subtitle, 2 CTA buttons
- Auto-play với pause on hover
- Navigation arrows + dots

**Danh Mục Sản Phẩm:**
- 3 cards: Cửa Cuốn, Cửa Nhôm, Cửa Gỗ Composite
- Mỗi card: Image, Title, Số lượng SP, Button "Xem thêm"
- Hover effect: zoom + overlay

**Sản Phẩm Nổi Bật:**
- Grid 4 cột (responsive)
- Product cards với: Image, Name, Category, Price/Liên hệ
- Badge: "Mới", "Hot", "Bán chạy"
- Hover: Quick view + Báo giá buttons

**Tại Sao Chọn Chúng Tôi (USP):**
- 4 items: Kinh nghiệm, Bảo hành, Giá cạnh tranh, Lắp đặt miễn phí
- Icon + Title + Description

**Đánh Giá Khách Hàng:**
- Carousel testimonials
- Quote, Rating stars, Customer name, Location

**Dự Án Tiêu Biểu:**
- Grid 3-4 projects
- Thumbnail, Title, Location

**Form Liên Hệ Nhanh:**
- 2 cột: Image + Form
- Fields: Họ tên, SĐT, Sản phẩm (dropdown), Ghi chú

**Floating CTA:**
- Fixed buttons: Zalo, Phone, Messenger
- Scroll-to-top button

---

### 2. Danh Sách Sản Phẩm (`/san-pham`)
**Breadcrumb:** Trang chủ > Sản phẩm

**Sidebar Filter:**
- Danh mục (checkbox)
- Khoảng giá (slider range)
- Thương hiệu (nếu có)
- Mobile: Filter drawer/modal

**Product Grid:**
- Grid 4 cột (responsive: 2 cột tablet, 1-2 mobile)
- Product cards với hover effects
- Sorting: Mới nhất, Giá tăng/giảm, Tên A-Z
- View toggle: Grid/List (optional)

**Pagination:**
- Số trang + Prev/Next
- Items per page: 12/24/48

**Empty State:**
- Message + CTA khi không có kết quả

---

### 3. Trang Danh Mục (`/danh-muc/[slug]`)
**Tương tự trang Sản phẩm nhưng:**
- Filter theo danh mục đã chọn
- Category description ở đầu trang
- FAQ section riêng cho danh mục

---

### 4. Chi Tiết Sản Phẩm (`/san-pham/[slug]`)
**Breadcrumb:** Trang chủ > Cửa Cuốn > Tên SP

**Image Gallery:**
- Main image lớn (click to zoom/lightbox)
- Thumbnail strip bên dưới
- Video tab (nếu có)

**Thông Tin Sản Phẩm:**
- Tên sản phẩm (H1)
- Category badge
- Giá: "Từ X VNĐ/m²" hoặc "Liên hệ báo giá"
- Short description

**CTA Buttons:**
- [Yêu Cầu Báo Giá] - Primary, mở modal form
- [Gọi Ngay: 0919.086.272] - Secondary
- [Thêm vào So sánh] ⭐

**Tabs Content:**
- Tab 1: Thông số kỹ thuật (table động theo category)
- Tab 2: Mô tả chi tiết
- Tab 3: Video (nếu có)

**Thông Số Kỹ Thuật (Dynamic):**
```
Cửa Cuốn: Loại nan, Chất liệu, Độ dày, Motor, Điều khiển, Bảo hành
Cửa Nhôm: Hệ nhôm, Độ dày profile, Loại kính, Màu sắc, Phụ kiện
Cửa Gỗ: Loại gỗ, Vân gỗ, Độ dày cánh, Khung bao, Phụ kiện
```

**Features List:**
- Danh sách tính năng với checkmarks

**Sản Phẩm Liên Quan:**
- Grid 4 sản phẩm cùng category

**Quote Form Modal:**
- Họ tên, SĐT, Email, Địa chỉ
- Kích thước: Rộng x Cao
- Ghi chú
- Pre-fill tên sản phẩm

---

### 5. Công Cụ Tính Giá (`/tinh-gia`) ⭐
**Form Tính Giá:**
- Step 1: Chọn loại cửa (3 options với icons)
- Step 2: Nhập kích thước (Rộng x Cao) với sliders/inputs
- Step 3: Chọn options (Motor, Premium, Phụ kiện)
- Step 4: Xem kết quả

**Kết Quả:**
- Diện tích: X m²
- Giá ước tính: X,XXX,XXX - Y,YYY,YYY VNĐ
- Note: "Giá chỉ mang tính tham khảo"
- CTA: [Yêu Cầu Báo Giá Chính Xác]

**Lưu ý:**
- Validation: min/max kích thước
- Animation khi hiển thị kết quả

---

### 6. So Sánh Sản Phẩm (`/so-sanh`) ⭐
**Chọn Sản Phẩm:**
- Tối đa 3 sản phẩm
- Search/dropdown để chọn
- Remove button cho mỗi SP

**Bảng So Sánh:**
- Cột: Product images + names
- Rows: Tất cả specs
- Highlight differences (màu khác)

**Actions:**
- [Báo giá SP này] cho mỗi cột
- [Xóa tất cả] - Reset

---

### 7. Dự Án/Portfolio (`/du-an`)
**Hero Section:**
- Title: "Dự Án Đã Thực Hiện"
- Subtitle về kinh nghiệm

**Filter:**
- Loại công trình: Tất cả, Nhà phố, Biệt thự, Showroom
- Loại cửa: Tất cả, Cửa Cuốn, Cửa Nhôm...

**Project Grid:**
- Cards với: Thumbnail, Title, Location, Year
- Hover: Overlay với "Xem chi tiết"

**Pagination**

---

### 8. Chi Tiết Dự Án (`/du-an/[slug]`)
**Hero:**
- Full-width image

**Project Info:**
- Title, Location, Client, Year, Diện tích

**Image Gallery:**
- Masonry grid hoặc slider
- Lightbox view

**Mô Tả:**
- Rich content về dự án

**Sản Phẩm Đã Dùng:**
- Grid các product cards liên quan

**Dự Án Khác:**
- Related projects

---

### 9. Tin Tức/Blog (`/tin-tuc`)
**Layout 2 cột:**

**Main Content (Left):**
- List/Grid bài viết
- Mỗi bài: Thumbnail, Title, Excerpt, Date, "Đọc tiếp"
- Pagination

**Sidebar (Right):**
- Bài viết mới nhất (5 items)
- Tags cloud
- CTA banner

---

### 10. Chi Tiết Bài Viết (`/tin-tuc/[slug]`)
**Article Header:**
- Title (H1)
- Date, Author
- Featured image

**Article Content:**
- Rich HTML content
- Images, headings, lists, quotes

**Sidebar:**
- Bài viết liên quan
- Social share buttons (Facebook, Zalo, Copy link)

**Bottom:**
- Tags
- Prev/Next article navigation

---

### 11. Liên Hệ (`/lien-he`)
**Layout 2 cột:**

**Left - Thông Tin:**
- Địa chỉ với icon
- Số điện thoại (click-to-call)
- Email (click-to-email)
- Giờ làm việc
- Social links

**Right - Form:**
- Họ tên, SĐT, Email
- Nội dung (textarea)
- Submit button

**Google Maps:**
- Embedded map full-width
- Marker với popup thông tin

---

### 12. Báo Giá (`/bao-gia`)
**Full Quote Form:**
- Thông tin cá nhân: Họ tên, SĐT, Email, Địa chỉ
- Sản phẩm: Dropdown category, Tên SP cụ thể
- Kích thước: Chiều rộng, Chiều cao
- Số lượng
- Yêu cầu đặc biệt (textarea)
- Phương thức liên hệ ưu tiên: Gọi điện / Zalo / Email

**Thông tin bên cạnh:**
- Hotline
- Cam kết phản hồi trong 30 phút
- Đánh giá khách hàng

---



## 🔐 ADMIN DASHBOARD - CHI TIẾT CHỨC NĂNG

### 1. Dashboard (`/admin`)
**Tổng quan hệ thống:**
- Stats cards: Tổng sản phẩm, Inquiries mới, Dự án, Bài viết
- Biểu đồ yêu cầu báo giá theo thời gian (7 ngày / 30 ngày)
- Bảng yêu cầu mới nhất (5-10 records)
- Báo cáo nguồn leads theo UTM source
- Quick actions: Thêm SP, Thêm bài viết

---

### 2. Quản lý Sản phẩm (`/admin/products`)
**DataTable với các tính năng:**
- Tìm kiếm theo tên, mã SP
- Lọc theo danh mục, trạng thái (Active/Inactive)
- Sắp xếp theo ngày tạo, tên, lượt xem
- Pagination (10/20/50 items per page)

**Form Thêm/Sửa sản phẩm:**
- Thông tin cơ bản: Tên, Slug (auto-generate), Mô tả
- Danh mục: Dropdown chọn category
- Giá: Giá từ, Giá đến, Đơn vị (VNĐ/m²)
- Hình ảnh: Upload nhiều ảnh, kéo thả sắp xếp, chọn thumbnail
- Video: Nhập URL YouTube
- Thông số kỹ thuật: Form động theo category
  - Cửa Cuốn: Loại nan, Motor, Độ dày, Điều khiển
  - Cửa Nhôm: Hệ nhôm, Độ dày profile, Loại kính, Màu sắc
  - Cửa Gỗ: Loại gỗ, Vân gỗ, Độ dày cánh
- Tính năng: Thêm/xóa features (chips)
- SEO: Meta title, Meta description, Keywords
- Toggle: Active, Featured

**Actions:**
- ✏️ Sửa | 🗑️ Xóa | 👁️ Xem trước | 📋 Duplicate

---

### 3. Quản lý Danh mục (`/admin/categories`)
**CRUD danh mục sản phẩm:**
- Tên danh mục, Slug
- Mô tả ngắn
- Upload hình ảnh đại diện
- Chọn icon (từ Lucide icons)
- Thứ tự hiển thị (drag & drop)
- Toggle Active/Inactive
- SEO fields

---

### 4. Quản lý Yêu cầu Báo giá (`/admin/inquiries`)
**DataTable inquiries:**
- Lọc theo status: Pending, Contacted, Quoted, Won, Lost, Spam
- Lọc theo nguồn: Website, Phone, Facebook
- Lọc theo ngày (date range picker)
- Search theo tên, SĐT, email

**Chi tiết yêu cầu:**
- Thông tin khách: Tên, SĐT, Email, Địa chỉ
- Sản phẩm quan tâm + Kích thước (nếu có)
- Nội dung tin nhắn
- Nguồn: UTM Source/Medium/Campaign
- Landing page đầu tiên

**Actions:**
- Cập nhật status (dropdown)
- Thêm notes nội bộ
- Gọi điện (click-to-call trên mobile)
- Gửi email

---

### 5. Quản lý Dự án/Portfolio (`/admin/projects`)
**CRUD dự án đã hoàn thành:**
- Tiêu đề, Slug
- Mô tả dự án (rich text)
- Thông tin: Địa điểm, Khách hàng, Loại công trình, Diện tích, Năm
- Upload gallery hình ảnh (nhiều ảnh)
- Video YouTube (optional)
- Liên kết sản phẩm đã sử dụng (multi-select)
- Toggle: Featured, Published
- SEO fields

---

### 6. Quản lý Bài viết/Blog (`/admin/posts`)
**DataTable bài viết:**
- Lọc: Published/Draft, Featured
- Search theo tiêu đề

**Form Thêm/Sửa:**
- Tiêu đề, Slug
- Excerpt (tóm tắt ngắn)
- Nội dung: **Rich Text Editor**
  - Formatting: Bold, Italic, Underline, Strikethrough
  - Headers: H2, H3, H4
  - Lists: Bullet, Numbered
  - Links, Images (upload), Videos (embed)
  - Quotes, Code blocks
- Upload thumbnail
- Tags (chips, autocomplete)
- Publish: Draft / Publish now / Schedule
- SEO fields

---

### 7. Quản lý Đánh giá (`/admin/testimonials`) ⭐
**Danh sách đánh giá từ khách hàng:**
- Filter: Pending approval, Approved, Featured
- Thông tin: Tên KH, Địa điểm, Nội dung, Rating (1-5 sao)
- Link đến dự án (nếu có)

**Actions:**
- ✅ Duyệt hiển thị
- ❌ Từ chối
- ⭐ Đánh dấu Featured (hiển thị trang chủ)
- ✏️ Chỉnh sửa nội dung

---

### 8. Quản lý FAQ (`/admin/faqs`) ⭐
**CRUD câu hỏi thường gặp:**
- Câu hỏi + Câu trả lời (rich text)
- Gán cho danh mục cụ thể hoặc FAQ chung
- Thứ tự hiển thị (drag & drop)
- Toggle Active/Inactive

---

### 9. Quản lý Banners (`/admin/banners`) ⭐
**CRUD hero banners:**
- Tiêu đề, Subtitle
- Upload hình ảnh (responsive: desktop + mobile)
- Link đích (URL)
- Vị trí: Hero slider, Sidebar, Popup
- Thứ tự hiển thị
- Lịch hiển thị: Start date, End date
- Toggle Active

---

### 10. Cài đặt (`/admin/settings`)
**10.1 Thông tin công ty:**
- Tên doanh nghiệp, Logo
- Số điện thoại, Email, Địa chỉ
- Giờ làm việc

**10.2 Mạng xã hội:**
- Facebook URL
- Zalo số/link
- YouTube channel
- TikTok (optional)

**10.3 SEO mặc định:**
- Default meta title template
- Default meta description
- OG Image mặc định
- Google Site Verification

**10.4 Analytics & Tracking:**
- Google Analytics 4 ID
- Facebook Pixel ID
- Google Tag Manager ID

**10.5 Cấu hình tính giá ⭐:**
- Giá base cho từng loại cửa (VNĐ/m²)
- Hệ số điều chỉnh: Motor (+20%), Premium (+30%)
- Min/Max kích thước cho phép

---




## 🎨 DESIGN DIRECTION

### Color Palette
```css
--primary: #1e40af;      /* Xanh dương - Chuyên nghiệp */
--secondary: #f59e0b;    /* Vàng cam - Điểm nhấn */
--accent: #10b981;       /* Xanh lá - CTA */
--background: #f8fafc;   /* Nền sáng */
--foreground: #0f172a;   /* Text */
```

### UI Features
- ✨ Glassmorphism cards
- 🎨 Gradient backgrounds
- 🔄 Smooth animations
- 📱 Mobile-first responsive
- 🌙 Dark mode (optional)

---

## 🔍 SEO & OPTIMIZATION (NEW)

### 1. Sitemap Generation
```typescript
// app/sitemap.ts - Auto-generate sitemap
export default async function sitemap() {
  const products = await getProducts();
  const posts = await getPosts();
  const projects = await getProjects();
  
  return [
    { url: 'https://cuahaviet.vn', changeFrequency: 'daily', priority: 1 },
    { url: 'https://cuahaviet.vn/san-pham', changeFrequency: 'daily', priority: 0.9 },
    ...products.map(p => ({
      url: `https://cuahaviet.vn/san-pham/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
    ...posts.map(p => ({
      url: `https://cuahaviet.vn/tin-tuc/${p.slug}`,
      lastModified: p.updatedAt,
    })),
  ];
}
```

### 2. Schema.org Structured Data
```typescript
// Trang sản phẩm - JSON-LD
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Cửa Cuốn Austdoor A528",
  "image": ["url1", "url2"],
  "description": "...",
  "brand": { "@type": "Brand", "name": "Austdoor" },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "1200000",
    "highPrice": "1500000",
    "priceCurrency": "VND",
    "availability": "https://schema.org/InStock"
  }
}
</script>

// FAQ Page
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}
</script>

// Local Business  
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Cửa Hà Việt",
  "telephone": "0919086272",
  "address": {...}
}
</script>
```

### 3. ISR (Incremental Static Regeneration)
```typescript
// Product pages - Revalidate every 1 hour
export const revalidate = 3600;

// Static generation for products
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug }));
}
```

### 4. Image Optimization
```typescript
// next.config.js
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

---

## 🧩 ADMIN - DYNAMIC SPECS TEMPLATE (NEW)

### Vấn đề
Mỗi danh mục cần form nhập specs khác nhau:
- **Cửa Cuốn**: Loại nan, Motor, Độ dày, Điều khiển
- **Cửa Nhôm**: Hệ nhôm, Loại kính, Màu sắc, Kiểu mở
- **Cửa Gỗ**: Vân gỗ, Độ dày cánh, Phụ kiện

### Giải pháp
```typescript
// lib/category-specs.ts
export const CATEGORY_SPEC_TEMPLATES = {
  "cua-cuon": [
    { key: "loaiNan", label: "Loại nan", type: "select", options: ["Nan liền", "Nan khe thoáng"] },
    { key: "motor", label: "Motor", type: "select", options: ["YH", "YDT", "Taiwan"] },
    { key: "doDayNan", label: "Độ dày nan", type: "input", suffix: "mm" },
    { key: "dieuKhien", label: "Điều khiển", type: "multiselect", options: ["Remote", "App", "Vân tay"] },
  ],
  "cua-nhom": [
    { key: "heNhom", label: "Hệ nhôm", type: "select", options: ["Xingfa 55", "Xingfa 93", "Việt Pháp"] },
    { key: "loaiKinh", label: "Loại kính", type: "select", options: ["1 lớp", "2 lớp cách âm"] },
    { key: "mauSac", label: "Màu sắc", type: "multiselect", options: ["Trắng", "Đen", "Xám", "Vân gỗ"] },
  ],
  "cua-go-composite": [
    { key: "vanGo", label: "Vân gỗ", type: "select", options: ["Óc chó", "Sồi", "Xoan đào"] },
    { key: "doDayCanh", label: "Độ dày cánh", type: "input", suffix: "mm" },
  ],
};

// Admin ProductForm - Render động
function renderSpecsForm(categorySlug: string) {
  const template = CATEGORY_SPEC_TEMPLATES[categorySlug] || [];
  return template.map(field => <SpecField key={field.key} {...field} />);
}
```

---

## 💬 QUICK QUOTE MODAL (NEW - UX Improvement)

### Mô tả
Thay vì chuyển trang đến `/bao-gia`, mở Modal ngay trên trang sản phẩm để giảm friction.

### Flow
```
User xem sản phẩm → Click "Báo Giá Nhanh" → Modal mở
→ Pre-fill: Tên sản phẩm, Category
→ User chỉ cần nhập: Họ tên, SĐT, Kích thước (optional)
→ Submit → Toast success + Close modal
```

### Component
```tsx
// components/storefront/QuickQuoteModal.tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="default">Báo Giá Nhanh</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Yêu Cầu Báo Giá</DialogTitle>
    </DialogHeader>
    <QuoteForm 
      productId={product.id}
      productName={product.name}
      category={product.category.name}
    />
  </DialogContent>
</Dialog>
```

---

## ✅ VERIFICATION & TESTING STRATEGY

> 💡 **Approach**: Không dùng TDD. Code trước → Test sau → Unit tests cho logic quan trọng.

---

### 1. Development Testing
```bash
npm run dev
# Test: http://localhost:3000
```

### 2. Manual Testing Checklist

#### Storefront
- [ ] Trang chủ responsive (mobile/tablet/desktop)
- [ ] Hero slider hoạt động
- [ ] Product listing + filter + pagination
- [ ] Product detail với gallery, specs, tabs
- [ ] Price Calculator tính đúng
- [ ] Product Compare hoạt động
- [ ] FAQ accordion
- [ ] Testimonials carousel
- [ ] Quote form submit thành công
- [ ] Quick Quote Modal
- [ ] Floating CTA (Zalo/Phone)
- [ ] UTM tracking capture

#### Admin Dashboard
- [ ] Login/Logout
- [ ] Dashboard stats hiển thị đúng
- [ ] Products CRUD + Dynamic Specs
- [ ] Categories CRUD
- [ ] Inquiries list + status update
- [ ] Projects CRUD + gallery
- [ ] Posts CRUD + rich editor
- [ ] FAQs CRUD
- [ ] Testimonials approve/reject
- [ ] Banners CRUD + scheduling
- [ ] Settings save thành công

#### Cross-browser
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

### 3. Unit Tests (Selective)

**Tool**: Vitest (fast, Vite-compatible)

```bash
# Install
npm install -D vitest @testing-library/react

# Run
npm run test
```

**Chỉ test logic quan trọng:**

```typescript
// __tests__/lib/price-calculator.test.ts
import { calculatePrice } from '@/lib/price-calculator';

describe('Price Calculator', () => {
  it('should calculate base price correctly', () => {
    const result = calculatePrice({
      category: 'cua-cuon',
      width: 3,
      height: 2.5,
      options: { motor: false, premium: false }
    });
    expect(result.area).toBe(7.5);
    expect(result.minPrice).toBe(9000000); // 7.5 * 1,200,000
  });

  it('should apply motor factor (+20%)', () => {
    const result = calculatePrice({
      category: 'cua-cuon',
      width: 3,
      height: 2.5,
      options: { motor: true, premium: false }
    });
    expect(result.minPrice).toBe(10800000); // 9,000,000 * 1.2
  });
});
```

```typescript
// __tests__/lib/validation.test.ts
import { validatePhone, validateEmail } from '@/lib/validations';

describe('Form Validations', () => {
  it('should validate Vietnamese phone numbers', () => {
    expect(validatePhone('0919086272')).toBe(true);
    expect(validatePhone('84919086272')).toBe(true);
    expect(validatePhone('123456')).toBe(false);
  });

  it('should validate email', () => {
    expect(validateEmail('test@gmail.com')).toBe(true);
    expect(validateEmail('invalid')).toBe(false);
  });
});
```

```typescript
// __tests__/lib/utm.test.ts
import { parseUTMParams } from '@/lib/utm';

describe('UTM Parser', () => {
  it('should parse UTM params from URL', () => {
    const url = 'https://cuahaviet.vn?utm_source=google&utm_medium=cpc';
    const result = parseUTMParams(url);
    expect(result).toEqual({
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: null
    });
  });
});
```

---

### 4. E2E Tests (Optional - Trước Production)

**Tool**: Playwright

```bash
# Install
npm install -D @playwright/test

# Run
npx playwright test
```

```typescript
// e2e/quote-form.spec.ts
import { test, expect } from '@playwright/test';

test('should submit quote form successfully', async ({ page }) => {
  await page.goto('/san-pham/cua-cuon-khe-thoang-austdoor-e50');
  
  // Click Quick Quote
  await page.click('text=Báo Giá Nhanh');
  
  // Fill form
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="phone"]', '0919086272');
  await page.fill('input[name="width"]', '3');
  await page.fill('input[name="height"]', '2.5');
  
  // Submit
  await page.click('button[type="submit"]');
  
  // Assert success
  await expect(page.locator('.toast-success')).toBeVisible();
});
```

---

### 5. Build Test
```bash
npm run build
# ✅ No errors
# ✅ No TypeScript warnings
# ✅ No ESLint errors
```

### 6. Lighthouse Score Target
| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 95 |

---

## 📅 TIMELINE (Revised)

> ⚠️ **Lưu ý:** Dùng JSON file demo trước, setup PostgreSQL sau cùng.

| Phase | Tasks | Duration | Chi tiết |
|-------|-------|----------|----------|
| 1 | **Setup + Core Layout** | 3-4h | Next.js 15, Tailwind 4, shadcn/ui, Layout |
| 2 | **Storefront Pages** | 6-8h | Home, Products, Detail, Projects, Blog |
| 3 | **New Features** | 4-5h | Calculator, Compare, FAQ, Testimonials |
| 4 | **Admin Dashboard** | 6-8h | 10 modules CRUD, Forms, DataTables |
| 5 | **API Routes (JSON)** | 2-3h | CRUD APIs đọc/ghi JSON file |
| 6 | **SEO + Performance** | 2-3h | Schema.org, Sitemap, Image optimization |
| 7 | **Testing + Polish** | 2-3h | Responsive, Cross-browser, Bug fixes |
| 8 | **Database Migration** | 2-3h | PostgreSQL + Prisma (production) |

**Tổng: ~25-35 giờ làm việc**

> 💡 Database setup ở cuối vì đã có JSON demo - dễ test nhanh hơn.

---

## 🚀 NEXT STEPS

1. ✅ Review và approve kế hoạch
2. Khởi tạo Next.js 15 + Tailwind 4 + shadcn/ui
3. Build core layout + design system
4. Implement storefront (dùng JSON file)
5. Build admin dashboard
6. Test đầy đủ tính năng
7. Setup PostgreSQL + Prisma (production)
8. Deployment → VPS + Cloudflare

---

## 🌐 DEPLOYMENT (VPS + Cloudflare Proxy)

### Kiến trúc
```
User → Cloudflare (DDoS/WAF) → VPS (Next.js + PM2 + Nginx)
```

### Yêu cầu VPS
- **OS**: Ubuntu 22.04 LTS
- **RAM**: 2GB minimum
- **CPU**: 2 vCPU
- **Storage**: 40GB SSD
- **Provider**: DigitalOcean / Vultr / Linode (~$10-15/tháng)

---

### Step 1: Setup VPS

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install PM2
sudo npm install -g pm2

# 4. Install Nginx
sudo apt install -y nginx

# 5. Clone project
cd /var/www
git clone https://github.com/your-repo/cuahaviet.git
cd cuahaviet

# 6. Install dependencies & Build
npm install
npm run build

# 7. Start with PM2
pm2 start npm --name "cuahaviet" -- start
pm2 save
pm2 startup
```

---

### Step 2: Nginx Config

```nginx
# /etc/nginx/sites-available/cuahaviet
server {
    listen 80;
    server_name cuahaviet.vn www.cuahaviet.vn;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/cuahaviet /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Step 3: Cloudflare Setup

1. **Add Domain** vào Cloudflare
2. **DNS Records**:
   | Type | Name | Content | Proxy |
   |------|------|---------|-------|
   | A | @ | VPS_IP | ✅ (orange) |
   | A | www | VPS_IP | ✅ (orange) |

3. **SSL/TLS Settings**:
   - Mode: **Full (strict)**
   - Always Use HTTPS: ✅
   - Automatic HTTPS Rewrites: ✅

4. **Security Settings**:
   - Security Level: Medium
   - Challenge Passage: 30 minutes
   - Browser Integrity Check: ✅

5. **Firewall Rules** (Optional):
   - Block countries không cần thiết
   - Rate limiting: 100 requests/minute per IP

---

### Step 4: SSL Certificate (Origin)

```bash
# Tạo Cloudflare Origin Certificate
# Cloudflare Dashboard → SSL/TLS → Origin Server → Create Certificate

# Save files
sudo mkdir -p /etc/ssl/cloudflare
# Paste certificate → /etc/ssl/cloudflare/cuahaviet.pem
# Paste private key → /etc/ssl/cloudflare/cuahaviet.key

# Update Nginx
server {
    listen 443 ssl http2;
    ssl_certificate /etc/ssl/cloudflare/cuahaviet.pem;
    ssl_certificate_key /etc/ssl/cloudflare/cuahaviet.key;
    # ... rest of config
}
```

---

### Monitoring & Maintenance

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs cuahaviet

# Restart app
pm2 restart cuahaviet

# Update code
cd /var/www/cuahaviet
git pull
npm install
npm run build
pm2 restart cuahaviet
```

---

### Tổng chi phí ước tính

| Item | Monthly Cost |
|------|-------------|
| VPS (2GB RAM) | $10-15 |
| Domain (.vn) | ~$15/năm |
| Cloudflare | **FREE** |
| **Total** | **~$12/tháng** |
