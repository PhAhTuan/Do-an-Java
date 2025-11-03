import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function Booking() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();


  const caregiverId = id ? parseInt(id) : 0;
  const { data: caregiver, isLoading: caregiverLoading } = trpc.caregiver.getById.useQuery(
    { id: caregiverId },
    { enabled: !!caregiverId }
  );

  const [formData, setFormData] = useState({
    serviceDate: "",
    duration: 1,
    notes: "",
  });

  const createBookingMutation = trpc.booking.create.useMutation({
    onSuccess: () => {
      toast.success("Đơn đặt dịch vụ đã được tạo");
      navigate("/my-bookings");
    },
    onError: (error) => {
      toast.error(error.message || "Không thể tạo đơn đặt");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.serviceDate || formData.duration < 1) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const totalPrice = (caregiver?.hourlyRate || 0) * formData.duration;
    createBookingMutation.mutate({
      caregiverId,
      serviceDate: new Date(formData.serviceDate),
      duration: formData.duration,
      totalPrice,
      notes: formData.notes || undefined,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h2>
          <Button asChild>
            <a href="/">Quay lại</a>
          </Button>
        </div>
      </div>
    );
  }

  if (caregiverLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!caregiver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy caregiver</h2>
          <Button asChild>
            <a href="/caregivers">Quay lại danh sách</a>
          </Button>
        </div>
      </div>
    );
  }

  const totalPrice = (caregiver.hourlyRate * formData.duration) / 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button asChild variant="ghost" className="mb-6">
          <a href="/caregivers">← Quay lại</a>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Caregiver Info */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">{caregiver.name}</CardTitle>
              <CardDescription>{caregiver.specialization}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Giá/giờ</p>
                <p className="text-xl font-bold text-indigo-600">
                  {(caregiver.hourlyRate / 100).toLocaleString('vi-VN')} VND
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Kinh nghiệm</p>
                <p className="font-semibold">{caregiver.experience} năm</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Điện thoại</p>
                <p className="font-semibold">{caregiver.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Đặt dịch vụ</CardTitle>
              <CardDescription>Điền thông tin để đặt lịch hẹn</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày dịch vụ <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.serviceDate}
                    onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời lượng (giờ) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="24"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                  </label>
                  <Textarea
                    placeholder="Mô tả nhu cầu chăm sóc của bạn..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Giá/giờ:</span>
                    <span>{(caregiver.hourlyRate / 100).toLocaleString('vi-VN')} VND</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Số giờ:</span>
                    <span>{formData.duration} giờ</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center">
                    <span className="font-semibold">Tổng cộng:</span>
                    <span className="text-xl font-bold text-indigo-600">
                      {totalPrice.toLocaleString('vi-VN')} VND
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={createBookingMutation.isPending}
                >
                  {createBookingMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    "Xác nhận đặt dịch vụ"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
