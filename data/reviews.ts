export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    userName: "Nguyễn Văn A",
    rating: 5,
    comment: "Cửa cuốn Austdoor S51 chất lượng tốt, vận hành êm ái. Đội ngũ lắp đặt chuyên nghiệp, tận tình.",
    date: "2024-01-15",
    helpful: 12,
  },
  {
    id: "r2",
    productId: "1",
    userName: "Trần Thị B",
    rating: 4,
    comment: "Sản phẩm đúng như mô tả, lắp đặt nhanh. Khe thoáng giúp garage mát mẻ hơn.",
    date: "2024-01-10",
    helpful: 8,
  },
  {
    id: "r3",
    productId: "3",
    userName: "Lê Văn C",
    rating: 5,
    comment: "Cửa cuốn nan liền M70 rất chắc chắn, an tâm về bảo mật. Motor chạy êm, không ồn.",
    date: "2024-01-08",
    helpful: 15,
  },
  {
    id: "r4",
    productId: "5",
    userName: "Phạm Thị D",
    rating: 4,
    comment: "Cửa cuốn lưới đẹp, thoáng mát. Phù hợp cho cửa hàng thời trang của mình.",
    date: "2024-01-05",
    helpful: 6,
  },
  {
    id: "r5",
    productId: "8",
    userName: "Hoàng Văn E",
    rating: 5,
    comment: "Motor Austdoor 300kg chạy rất êm, bền bỉ. Dùng được 2 năm rồi vẫn tốt.",
    date: "2024-01-03",
    helpful: 10,
  },
  {
    id: "r6",
    productId: "10",
    userName: "Ngô Thị F",
    rating: 4,
    comment: "Remote Austdoor tín hiệu mạnh, điều khiển xa được. Giá cả hợp lý.",
    date: "2024-01-01",
    helpful: 4,
  },
  {
    id: "r7",
    productId: "12",
    userName: "Đỗ Văn G",
    rating: 5,
    comment: "Bộ lưu điện UPS rất cần thiết, mất điện vẫn mở cửa được. Đáng đồng tiền!",
    date: "2023-12-28",
    helpful: 9,
  },
  {
    id: "r8",
    productId: "7",
    userName: "Vũ Thị H",
    rating: 5,
    comment: "Cửa cuốn tấm liền Austdoor Panel đẹp, sang trọng. Cách âm cách nhiệt rất tốt.",
    date: "2023-12-25",
    helpful: 11,
  },
];

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getAverageRating(productId: string): number {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
}
