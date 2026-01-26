"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Review, getReviewsByProductId, getAverageRating } from "@/data/reviews";

interface ProductReviewsProps {
  productId: string;
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={star <= rating ? "text-yellow-500" : "text-muted-foreground"}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  const handleHelpful = () => {
    if (!voted) {
      setHelpful((prev) => prev + 1);
      setVoted(true);
    }
  };

  return (
    <div className="border-b pb-4 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{review.userName}</span>
            <StarRating rating={review.rating} size={14} />
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {new Date(review.date).toLocaleDateString("vi-VN")}
          </p>
          <p className="text-sm">{review.comment}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={handleHelpful}
          disabled={voted}
          className={`text-xs flex items-center gap-1 ${
            voted ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={voted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
          Hữu ích ({helpful})
        </button>
      </div>
    </div>
  );
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const reviews = getReviewsByProductId(productId);
  const averageRating = getAverageRating(productId);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", name: "" });

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to an API
    alert("Cảm ơn bạn đã đánh giá! (Demo - không lưu thực tế)");
    setShowForm(false);
    setNewReview({ rating: 5, comment: "", name: "" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đánh giá sản phẩm</CardTitle>
      </CardHeader>
      <CardContent>
        {reviews.length > 0 ? (
          <>
            {/* Summary */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">
                  {averageRating}
                </div>
                <StarRating rating={Math.round(averageRating)} />
                <p className="text-sm text-muted-foreground mt-1">
                  {reviews.length} đánh giá
                </p>
              </div>
              <div className="flex-1 space-y-1">
                {ratingCounts.map(({ rating, count }) => (
                  <div key={rating} className="flex items-center gap-2 text-sm">
                    <span className="w-3">{rating}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-500"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{
                          width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="w-6 text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4 mb-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </>
        ) : (
          <p className="text-muted-foreground text-center py-4">
            Chưa có đánh giá nào cho sản phẩm này
          </p>
        )}

        {/* Add Review */}
        {showForm ? (
          <form onSubmit={handleSubmit} className="border-t pt-4 space-y-4">
            <h4 className="font-medium">Viết đánh giá của bạn</h4>
            <div>
              <label className="text-sm font-medium mb-2 block">Họ tên</label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Nhập họ tên"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Đánh giá</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={star <= newReview.rating ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      className={
                        star <= newReview.rating
                          ? "text-yellow-500"
                          : "text-muted-foreground"
                      }
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Nhận xét</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Gửi đánh giá</Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Hủy
              </Button>
            </div>
          </form>
        ) : (
          <Button onClick={() => setShowForm(true)} variant="outline" className="w-full">
            Viết đánh giá
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
