# Online Quiz Web Mobile

Hệ thống tạo và làm bài thi trắc nghiệm online gồm website HTML/CSS/JavaScript, backend Express + SQLite và mobile app Expo React Native TypeScript.

## Thành viên

| Thành viên        | Nhiệm vụ                                     |
| ----------------- | -------------------------------------------- |
| Mai Việt Anh      | Backend, SQLite, API, xác thực, chấm điểm    |
| Nguyễn Quang Dũng | Website HTML/CSS/JS, làm bài, kết quả, admin |
| Trần Phú Nghĩa    | Mobile Expo, kiểm thử, báo cáo               |

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

Mobile dùng Expo React Native. Project đã khai báo `babel-preset-expo`, nên sau khi clone cần chạy `npm install` trong thư mục `mobile` trước khi mở Expo.

Khi chạy bằng iPhone/Expo Go, dùng IP LAN trong file `mobile/.env.local`. File này không đưa lên GitHub, hãy tạo từ mẫu:

```powershell
cd mobile
Copy-Item .env.example .env.local
```

Sửa `YOUR_LAN_IP` thành IPv4 Wi-Fi của máy chạy backend, ví dụ:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.6:3000/api
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.6
```

Sau đó chạy:

```powershell
npm run start:clear
```

Điện thoại và máy tính cần cùng Wi-Fi. Nếu đổi mạng hoặc IP thay đổi, cập nhật lại `mobile/.env.local`.

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

## Lỗi thường gặp

Nếu Expo báo `Cannot find module 'babel-preset-expo'`, chạy lại:

```powershell
cd mobile
npm install
npm run start:clear
```

Nếu iOS Expo báo timeout, kiểm tra `mobile/.env.local` đang dùng đúng IP LAN và thử mở trên iPhone:

```text
http://YOUR_LAN_IP:3000/api/quizzes
```
