import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const { data: caregivers, isLoading, refetch } = trpc.caregiver.list.useQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: 0,
    phone: "",
    email: "",
    address: "",
    hourlyRate: 0,
    bio: "",
  });

  const createMutation = trpc.caregiver.create.useMutation({
    onSuccess: () => {
      toast.success("Caregiver đã được tạo");
      setIsOpen(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Không thể tạo caregiver");
    },
  });

  const updateMutation = trpc.caregiver.update.useMutation({
    onSuccess: () => {
      toast.success("Caregiver đã được cập nhật");
      setIsOpen(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Không thể cập nhật caregiver");
    },
  });

  const deleteMutation = trpc.caregiver.delete.useMutation({
    onSuccess: () => {
      toast.success("Caregiver đã được xóa");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Không thể xóa caregiver");
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      specialization: "",
      experience: 0,
      phone: "",
      email: "",
      address: "",
      hourlyRate: 0,
      bio: "",
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.specialization || !formData.phone || !formData.email) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        ...formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (caregiver: any) => {
    setFormData({
      name: caregiver.name,
      specialization: caregiver.specialization,
      experience: caregiver.experience,
      phone: caregiver.phone,
      email: caregiver.email,
      address: caregiver.address || "",
      hourlyRate: caregiver.hourlyRate,
      bio: caregiver.bio || "",
    });
    setEditingId(caregiver.id);
    setIsOpen(true);
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Truy cập bị từ chối</h2>
          <p className="text-gray-600 mb-6">Bạn không có quyền truy cập trang này</p>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Caregiver</h1>
            <p className="text-gray-600">Thêm, sửa, xóa thông tin người chăm sóc</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
                onClick={() => resetForm()}
              >
                <Plus className="w-4 h-4" />
                Thêm Caregiver
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Chỉnh sửa Caregiver" : "Thêm Caregiver mới"}
                </DialogTitle>
                <DialogDescription>
                  {editingId
                    ? "Cập nhật thông tin người chăm sóc"
                    : "Nhập thông tin người chăm sóc mới"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập tên"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chuyên môn <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.specialization}
                      onChange={(e) =>
                        setFormData({ ...formData, specialization: e.target.value })
                      }
                      placeholder="VD: Chăm sóc người già"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kinh nghiệm (năm) <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giá/giờ (VND) <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.hourlyRate}
                      onChange={(e) =>
                        setFormData({ ...formData, hourlyRate: parseInt(e.target.value) || 0 })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Điện thoại <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0123456789"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Nhập địa chỉ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giới thiệu
                  </label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Mô tả về kinh nghiệm và kỹ năng"
                    rows={3}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : editingId ? (
                    "Cập nhật"
                  ) : (
                    "Thêm mới"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {!caregivers || caregivers.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600 mb-4">Chưa có caregiver nào</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {caregivers.map((caregiver: any) => (
              <Card key={caregiver.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{caregiver.name}</CardTitle>
                      <CardDescription>{caregiver.specialization}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(caregiver)}
                        className="flex items-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Sửa
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          if (confirm("Bạn chắc chắn muốn xóa?")) {
                            deleteMutation.mutate({ id: caregiver.id });
                          }
                        }}
                        className="flex items-center gap-1"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                        Xóa
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Kinh nghiệm</p>
                      <p className="font-semibold">{caregiver.experience} năm</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Giá/giờ</p>
                      <p className="font-semibold text-indigo-600">
                        {(caregiver.hourlyRate / 100).toLocaleString("vi-VN")} VND
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Điện thoại</p>
                      <p className="font-semibold">{caregiver.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-sm">{caregiver.email}</p>
                    </div>
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
