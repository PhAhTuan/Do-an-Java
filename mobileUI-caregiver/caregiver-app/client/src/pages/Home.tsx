import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Heart, Users, Calendar, Star, LogOut } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {APP_LOGO && <img src={APP_LOGO} alt="Logo" className="h-8 w-8" />}
            <h1 className="text-2xl font-bold text-indigo-600">{APP_TITLE}</h1>
          </div>
          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">Xin chào, {user?.name || "Bạn"}</span>
                <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Button asChild size="sm">
                <a href={getLoginUrl()}>Đăng nhập</a>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Dịch vụ chăm sóc chuyên nghiệp</h2>
          <p className="text-xl text-gray-600 mb-8">Tìm kiếm những người chăm sóc tận tâm cho gia đình bạn</p>
          {!isAuthenticated && (
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              <a href={getLoginUrl()}>Bắt đầu ngay</a>
            </Button>
          )}
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <Users className="w-8 h-8 text-indigo-600 mb-2" />
              <CardTitle className="text-lg">Tìm Caregiver</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Duyệt danh sách những người chăm sóc chuyên nghiệp</p>
              {isAuthenticated && (
                <Button asChild variant="link" className="mt-4 p-0">
                  <Link href="/caregivers">Xem danh sách →</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <Calendar className="w-8 h-8 text-indigo-600 mb-2" />
              <CardTitle className="text-lg">Đặt dịch vụ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Đặt lịch hẹn với caregiver yêu thích</p>
              {isAuthenticated && (
                <Button asChild variant="link" className="mt-4 p-0">
                  <Link href="/bookings">Đặt dịch vụ →</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <Star className="w-8 h-8 text-indigo-600 mb-2" />
              <CardTitle className="text-lg">Đánh giá</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Chia sẻ trải nghiệm của bạn</p>
              {isAuthenticated && (
                <Button asChild variant="link" className="mt-4 p-0">
                  <Link href="/my-bookings">Đánh giá →</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <Heart className="w-8 h-8 text-indigo-600 mb-2" />
              <CardTitle className="text-lg">Quản lý</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Quản lý caregiver và dịch vụ</p>
              {isAuthenticated && user?.role === "admin" && (
                <Button asChild variant="link" className="mt-4 p-0">
                  <Link href="/admin">Quản lý →</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Navigation Links */}
        {isAuthenticated && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/caregivers">Xem tất cả Caregiver</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/my-bookings">Đơn đặt của tôi</Link>
            </Button>
            {user?.role === "admin" && (
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/admin">Bảng điều khiển Admin</Link>
              </Button>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
