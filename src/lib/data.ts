import { promises as fs } from 'fs';
import path from 'path';

// Types matching our JSON structure
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    icon: string;
    order: number;
    isActive: boolean;
    metaTitle: string;
    metaDescription: string;
    // NEW: Chính sách bảo hành riêng cho từng danh mục
    warrantyPolicy?: string;
    // NEW: Danh mục cha (dùng cho sub-categories)
    parentCategoryId?: string | null;
    // NEW: Danh mục liên quan (dùng cho Phụ kiện - liên kết với các loại cửa)
    relatedCategories?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface ProductSpecifications {
    [key: string]: string | string[] | undefined;
}

export interface QuoteConfig {
    // Shared
    minArea?: number; // Diện tích tối thiểu để tính giá (m2)

    // Rolling Door
    weightPerM2?: number; // Trọng lượng nan (kg/m2) để tính motor
    laborCostPerM2?: number; // Chi phí nhân công (VND/m2)

    // Aluminum Door
    aluminumSystem?: string; // 'xingfa55', 'xingfa93'

    // Accessory (Motor)
    capacityKG?: number; // Sức nâng (kg) của motor
    forDoorType?: string; // Loại cửa phù hợp ('rolling', 'tam_lien')

    // Accessory (UPS)
    maxArea?: number; // Diện tích tối đa (legacy)
    maxDoorArea?: number; // Diện tích cửa tối đa (m2) cho UPS
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    features: string[];
    specifications: ProductSpecifications;
    quoteConfig?: QuoteConfig;
    priceFrom: number;
    priceTo: number;
    unit: string;
    images: string[];
    thumbnail: string;
    videoUrl: string | null;
    categoryId: string;
    isActive: boolean;
    isFeatured: boolean;
    viewCount: number;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Inquiry {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    address: string | null;
    productId: string | null;
    productName: string | null;
    message: string;
    area: string | null;
    width: number | null;
    height: number | null;
    source: string;
    status: 'PENDING' | 'CONTACTED' | 'QUOTED' | 'COMPLETED' | 'CANCELLED';
    notes: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    landingPage: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    location: string;
    client: string;
    projectType: string;
    images: string[];
    thumbnail: string;
    area: string;
    year: number;
    products: string[];
    isFeatured: boolean;
    isPublished: boolean;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    thumbnail: string;
    tags: string[];
    isPublished: boolean;
    isFeatured: boolean;
    viewCount: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    categoryId: string | null;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Testimonial {
    id: string;
    customerName: string;
    location: string;
    content: string;
    rating: number;
    avatar: string;
    projectId: string | null;
    isApproved: boolean;
    isFeatured: boolean;
    createdAt: string;
}

export interface Banner {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    link: string;
    position: string;
    order: number;
    startDate: string | null;
    endDate: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PriceConfig {
    id: string;
    categorySlug: string;
    basePrice: number;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    motorFactor: number;
    premiumFactor: number;
    isActive: boolean;
    updatedAt: string;
}

export interface USP {
    icon: string;
    title: string;
    description: string;
}

export interface CompanyInfo {
    id: string;
    name: string;
    logo: string;
    phone: string;
    email: string;
    address: string;
    latitude: number;
    longitude: number;
    facebook: string;
    zalo: string;
    messenger: string;
    youtube: string | null;
    openingHours: string;
    slogan: string;
    usp: USP[];
    googleAnalyticsId: string | null;
    facebookPixelId: string | null;
    updatedAt: string;
}

export interface Admin {
    id: string;
    email: string;
    password: string;
    name: string;
    role: 'SUPER_ADMIN' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
}

export interface DatabaseData {
    categories: Category[];
    products: Product[];
    inquiries: Inquiry[];
    projects: Project[];
    posts: Post[];
    faqs: FAQ[];
    testimonials: Testimonial[];
    banners: Banner[];
    priceConfigs: PriceConfig[];
    companyInfo: CompanyInfo;
    admins: Admin[];
}

// Get the path to the JSON data file
function getDataPath(): string {
    return path.join(process.cwd(), 'data', 'sample-data.json');
}

// Read all data from JSON file
export async function getData(): Promise<DatabaseData> {
    const dataPath = getDataPath();
    const fileContent = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(fileContent);
}

// Write data to JSON file
export async function saveData(data: DatabaseData): Promise<void> {
    const dataPath = getDataPath();
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

// ========== CATEGORIES ==========
export async function getCategories(): Promise<Category[]> {
    const data = await getData();
    return data.categories.filter(c => c.isActive).sort((a, b) => a.order - b.order);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const data = await getData();
    return data.categories.find(c => c.slug === slug && c.isActive);
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
    const data = await getData();
    return data.categories.find(c => c.id === id && c.isActive);
}

// ========== PRODUCTS ==========
export async function getProducts(): Promise<Product[]> {
    const data = await getData();
    return data.products.filter(p => p.isActive);
}

export async function getFeaturedProducts(): Promise<Product[]> {
    const data = await getData();
    return data.products.filter(p => p.isActive && p.isFeatured);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    const data = await getData();
    return data.products.find(p => p.slug === slug && p.isActive);
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
    const data = await getData();
    return data.products.filter(p => p.categoryId === categoryId && p.isActive);
}

// ========== PROJECTS ==========
export async function getProjects(): Promise<Project[]> {
    const data = await getData();
    return data.projects.filter(p => p.isPublished);
}

export async function getFeaturedProjects(): Promise<Project[]> {
    const data = await getData();
    return data.projects.filter(p => p.isPublished && p.isFeatured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    const data = await getData();
    return data.projects.find(p => p.slug === slug && p.isPublished);
}

// ========== POSTS ==========
export async function getPosts(): Promise<Post[]> {
    const data = await getData();
    return data.posts.filter(p => p.isPublished).sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function getFeaturedPosts(): Promise<Post[]> {
    const data = await getData();
    return data.posts.filter(p => p.isPublished && p.isFeatured);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
    const data = await getData();
    return data.posts.find(p => p.slug === slug && p.isPublished);
}

// ========== FAQs ==========
export async function getFAQs(): Promise<FAQ[]> {
    const data = await getData();
    return data.faqs.filter(f => f.isActive).sort((a, b) => a.order - b.order);
}

export async function getFAQsByCategory(categoryId: string): Promise<FAQ[]> {
    const data = await getData();
    return data.faqs.filter(f => f.categoryId === categoryId && f.isActive).sort((a, b) => a.order - b.order);
}

// ========== TESTIMONIALS ==========
export async function getTestimonials(): Promise<Testimonial[]> {
    const data = await getData();
    return data.testimonials.filter(t => t.isApproved);
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
    const data = await getData();
    return data.testimonials.filter(t => t.isApproved && t.isFeatured);
}

// ========== BANNERS ==========
export async function getActiveBanners(position?: string): Promise<Banner[]> {
    const data = await getData();
    const now = new Date();

    return data.banners.filter(b => {
        if (!b.isActive) return false;
        if (position && b.position !== position) return false;

        // Check date range
        if (b.startDate && new Date(b.startDate) > now) return false;
        if (b.endDate && new Date(b.endDate) < now) return false;

        return true;
    }).sort((a, b) => a.order - b.order);
}

// ========== PRICE CONFIG ==========
export async function getPriceConfig(categorySlug: string): Promise<PriceConfig | undefined> {
    const data = await getData();
    return data.priceConfigs.find(c => c.categorySlug === categorySlug && c.isActive);
}

export async function getAllPriceConfigs(): Promise<PriceConfig[]> {
    const data = await getData();
    return data.priceConfigs.filter(c => c.isActive);
}

// ========== COMPANY INFO ==========
export async function getCompanyInfo(): Promise<CompanyInfo> {
    const data = await getData();
    return data.companyInfo;
}

// ========== INQUIRIES ==========
export async function createInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Inquiry> {
    const data = await getData();

    const newInquiry: Inquiry = {
        ...inquiry,
        id: `inq_${Date.now()}`,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    data.inquiries.push(newInquiry);
    await saveData(data);

    return newInquiry;
}

export async function getInquiries(): Promise<Inquiry[]> {
    const data = await getData();
    return data.inquiries.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}
