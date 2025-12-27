import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getCategoryBySlug, getCategories } from '@/lib/data';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        return { title: 'Danh mục không tồn tại' };
    }

    return {
        title: category.metaTitle || category.name,
        description: category.metaDescription || category.description,
    };
}

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;

    // Redirect to /san-pham with category filter
    redirect(`/san-pham?danh-muc=${slug}`);
}
