import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Loader2, Star, MapPin, Briefcase } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Caregivers() {
  const { data: caregivers, isLoading } = trpc.caregiver.list.useQuery();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h2>
          <p className="text-gray-600 mb-6">Bạn cần đăng nhập để xem danh sách caregiver</p>
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Danh sách Caregiver</h1>
          <p className="text-gray-600">Chọn người chăm sóc phù hợp cho gia đình bạn</p>
        </div>

        {!caregivers || caregivers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Không có caregiver nào</p>
            <Button asChild>
              <Link href="/">Quay lại trang chủ</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caregivers.map((caregiver) => (
              <Card key={caregiver.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{caregiver.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Briefcase className="w-4 h-4" />
                        {caregiver.specialization}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">
                        {(caregiver.rating / 100).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold">Kinh nghiệm:</span> {caregiver.experience} năm
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Giá:</span> {(caregiver.hourlyRate / 100).toLocaleString('vi-VN')} VND/giờ
                    </p>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {caregiver.address || "Không có thông tin"}
                    </p>
                  </div>
                  {caregiver.bio && (
                    <p className="text-sm text-gray-600 italic">{caregiver.bio}</p>
                  )}
                  <div className="flex gap-2 pt-4">
                    <Button asChild className="flex-1" disabled={!caregiver.isAvailable}>
                      <Link href={`/booking/${caregiver.id}`}>
                        {caregiver.isAvailable ? "Đặt dịch vụ" : "Không có sẵn"}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/caregiver/${caregiver.id}`}>Xem chi tiết</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
