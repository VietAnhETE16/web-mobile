# Báo cáo tóm tắt project Online Quiz

## 1. Các chức năng

### Website HTML/CSS/JavaScript

- Đăng nhập, đăng xuất và phân quyền admin/user.
- Danh sách, chi tiết và làm bài thi trắc nghiệm.
- Đồng hồ đếm ngược, nộp bài và tự chấm điểm ở backend.
- Trang kết quả hiển thị điểm, đúng/sai, đáp án đã chọn, đáp án đúng và giải thích.
- Bình luận, đánh giá công khai, liên hệ, giới thiệu.
- Popup quảng cáo sau một phút và ghi nhớ đóng bằng localStorage.
- Admin quản lý bài thi, câu hỏi, 4 đáp án, đáp án đúng, bình luận và liên hệ.
- Responsive dưới 800px, 800-1199px và từ 1200px.

### Mobile Expo

- Đăng nhập và lưu token bằng AsyncStorage.
- Danh sách, chi tiết, làm bài và xem kết quả.
- Bình luận, đánh giá và gửi liên hệ.
- Tự nhận API từ IP LAN của Metro, không hard-code IP máy cá nhân.

## 2. Mức độ hoàn thiện

| Hạng mục | Mức độ |
| --- | --- |
| Website HTML/CSS/JS | Hoàn thành |
| Express API + SQLite | Hoàn thành |
| Xác thực và phân quyền | Hoàn thành |
| Quản lý quiz/câu hỏi/đáp án | Hoàn thành |
| Làm bài, chấm điểm, kết quả | Hoàn thành |
| Mobile Expo | Hoàn thành |
| Dữ liệu mẫu | Hoàn thành |

## 3. Phân công

| Thành viên | Nhiệm vụ |
| --- | --- |
| Mai Việt Anh | Backend, SQLite, API, chấm điểm |
| Nguyễn Quang Dũng | Website, responsive, admin |
| Trần Phú Nghĩa | Mobile Expo, kiểm thử, báo cáo |

## 4. Hướng dẫn

```powershell
cd server
npm install
npm run seed
npm start
```

Website chạy tại `http://localhost:3000`.

```powershell
cd mobile
npm install
npm run start:clear
```

Tài khoản: `admin/admin123`, `user/user123`.
