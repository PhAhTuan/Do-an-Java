import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Clear existing data
await connection.execute('DELETE FROM ratings');
await connection.execute('DELETE FROM bookings');
await connection.execute('DELETE FROM caregivers');

// Insert sample caregivers
const caregivers = [
  {
    name: 'Nguyễn Thị Hoa',
    specialization: 'Chăm sóc người già',
    experience: 5,
    phone: '0912345678',
    email: 'hoa@example.com',
    address: 'Hà Nội',
    hourlyRate: 15000,
    bio: 'Có 5 năm kinh nghiệm chăm sóc người cao tuổi, tận tâm và chu đáo',
    rating: 480,
    totalReviews: 12,
    isAvailable: 1,
  },
  {
    name: 'Trần Văn Minh',
    specialization: 'Chăm sóc trẻ em',
    experience: 3,
    phone: '0987654321',
    email: 'minh@example.com',
    address: 'TP.HCM',
    hourlyRate: 12000,
    bio: 'Chuyên chăm sóc trẻ em từ sơ sinh đến 5 tuổi',
    rating: 450,
    totalReviews: 9,
    isAvailable: 1,
  },
  {
    name: 'Phạm Thị Lan',
    specialization: 'Chăm sóc bệnh nhân',
    experience: 7,
    phone: '0901234567',
    email: 'lan@example.com',
    address: 'Đà Nẵng',
    hourlyRate: 18000,
    bio: 'Có chứng chỉ điều dưỡng, kinh nghiệm chăm sóc bệnh nhân tại nhà',
    rating: 500,
    totalReviews: 15,
    isAvailable: 1,
  },
  {
    name: 'Lê Văn Hùng',
    specialization: 'Hỗ trợ sinh hoạt',
    experience: 2,
    phone: '0923456789',
    email: 'hung@example.com',
    address: 'Hải Phòng',
    hourlyRate: 10000,
    bio: 'Hỗ trợ sinh hoạt hàng ngày cho người cao tuổi',
    rating: 420,
    totalReviews: 7,
    isAvailable: 1,
  },
  {
    name: 'Vũ Thị Hương',
    specialization: 'Chăm sóc toàn diện',
    experience: 6,
    phone: '0934567890',
    email: 'huong@example.com',
    address: 'Cần Thơ',
    hourlyRate: 16000,
    bio: 'Chuyên chăm sóc toàn diện, nấu ăn, vệ sinh nhà cửa',
    rating: 490,
    totalReviews: 11,
    isAvailable: 1,
  },
];

for (const caregiver of caregivers) {
  await connection.execute(
    'INSERT INTO caregivers (name, specialization, experience, phone, email, address, hourlyRate, bio, rating, totalReviews, isAvailable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      caregiver.name,
      caregiver.specialization,
      caregiver.experience,
      caregiver.phone,
      caregiver.email,
      caregiver.address,
      caregiver.hourlyRate,
      caregiver.bio,
      caregiver.rating,
      caregiver.totalReviews,
      caregiver.isAvailable,
    ]
  );
}

console.log('✅ Seed data inserted successfully!');
await connection.end();
