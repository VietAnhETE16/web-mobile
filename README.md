# Online Quiz Web Mobile

Hệ thống tạo và làm bài thi trắc nghiệm online gồm website HTML/CSS/JavaScript, backend Express + SQLite và mobile app Expo React Native TypeScript.

## Thành viên

| Thành viên | Nhiệm vụ |
| --- | --- |
| Mai Việt Anh | Backend, SQLite, API, xác thực, chấm điểm |
| Nguyễn Quang Dũng | Website HTML/CSS/JS, làm bài, kết quả, admin |
| Trần Phú Nghĩa | Mobile Expo, kiểm thử, báo cáo |

## Chạy backend và website

```powershell
cd server
npm install
npm run seed
npm start
```

- Website: http://localhost:3000
- API: http://localhost:3000/api

## Chạy mobile

```powershell
cd mobile
npm install
npm run start:clear
```

Expo tự nhận IP LAN của máy chạy Metro. Điện thoại và máy tính cần cùng Wi-Fi.

## Tài khoản mẫu

- Admin: `admin` / `admin123`
- User: `user` / `user123`

## Chức năng

- Danh sách, chi tiết, làm bài và kết quả chi tiết.
- Chấm điểm và lưu bài làm ở backend.
- Bình luận, đánh giá, liên hệ.
- Admin CRUD bài thi, câu hỏi, 4 đáp án và đáp án đúng.
- Thống kê lượt xem, lượt làm, câu hỏi, bình luận, liên hệ.
- Popup quảng cáo sau 1 phút và responsive 3 ngưỡng.
