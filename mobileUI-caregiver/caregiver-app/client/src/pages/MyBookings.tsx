import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Loader2, Star, Calendar, Clock, DollarSign } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function MyBookings() {
  const { isAuthenticated } = useAuth();
  const { data: bookings, isLoading, refetch } = trpc.booking.getUserBookings.useQuery();
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [ratingData, setRatingData] = useState({ rating: 5, comment: "" });

  const createRatingMutation = trpc.rating.create.useMutation({
    onSuccess: () => {
      toast.success("Đánh giá đã được gửi");
      setSelectedBooking(null);
      setRatingData({ rating: 5, comment: "" });
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Không thể gửi đánh giá");
    },
  });

  const handleSubmitRating = (booking: any) => {
    if (!ratingData.rating) {
      toast.error("Vui lòng chọn mức đánh giá");
      return;
    }
    createRatingMutation.mutate({
      bookingId: booking.id,
      caregiverId: booking.caregiverId,
      rating: ratingData.rating,
      comment: ratingData.comment || undefined,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h2>
          <Button asChild>
            <Link href="/">Quay lại trang chủ</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đơn đặt của tôi</h1>
          <p className="text-gray-600">Quản lý và đánh giá các dịch vụ đã đặt</p>
        </div>

        {!bookings || bookings.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600 mb-4">Bạn chưa có đơn đặt nào</p>
              <Button asChild>
                <Link href="/caregivers">Tìm caregiver</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking: any) => {
              const statusColor = 
                booking.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : booking.status === "confirmed"
                  ? "bg-blue-100 text-blue-800"
                  : booking.status === "cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800";

              const statusText =
                booking.status === "pending"
                  ? "Chờ xác nhận"
                  : booking.status === "confirmed"
                  ? "Đã xác nhận"
                  : booking.status === "completed"
                  ? "Hoàn thành"
                  : "Đã hủy";

              return (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">Đơn #{booking.id}</CardTitle>
                        <CardDescription>Caregiver ID: {booking.caregiverId}</CardDescription>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                        {statusText}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Ngày dịch vụ
                        </p>
                        <p className="font-semibold">
                          {new Date(booking.serviceDate).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Thời lượng
                        </p>
                        <p className="font-semibold">{booking.duration} giờ</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          Giá
                        </p>
                        <p className="font-semibold text-indigo-600">
                          {(booking.totalPrice / 100).toLocaleString("vi-VN")} VND
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ngày đặt</p>
                        <p className="font-semibold text-sm">
                          {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="bg-gray-50 p-3 rounded mb-4">
                        <p className="text-sm text-gray-600">Ghi chú:</p>
                        <p className="text-sm text-gray-800">{booking.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {booking.status === "completed" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex items-center gap-2"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Star className="w-4 h-4" />
                              Đánh giá
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Đánh giá dịch vụ</DialogTitle>
                              <DialogDescription>
                                Chia sẻ trải nghiệm của bạn về dịch vụ
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Mức đánh giá (1-5 sao) <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      onClick={() => setRatingData({ ...ratingData, rating: star })}
                                      className={`p-2 rounded ${
                                        ratingData.rating >= star
                                          ? "bg-yellow-100 text-yellow-600"
                                          : "bg-gray-100 text-gray-400"
                                      }`}
                                    >
                                      <Star className="w-6 h-6 fill-current" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Bình luận
                                </label>
                                <Textarea
                                  placeholder="Chia sẻ ý kiến của bạn..."
                                  value={ratingData.comment}
                                  onChange={(e) =>
                                    setRatingData({ ...ratingData, comment: e.target.value })
                                  }
                                  rows={4}
                                />
                              </div>
                              <Button
                                onClick={() => handleSubmitRating(booking)}
                                className="w-full bg-indigo-600 hover:bg-indigo-700"
                                disabled={createRatingMutation.isPending}
                              >
                                {createRatingMutation.isPending ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Đang gửi...
                                  </>
                                ) : (
                                  "Gửi đánh giá"
                                )}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      <Button asChild variant="outline" className="flex-1">
                        <Link href={`/booking/${booking.caregiverId}`}>
                          Đặt lại
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
