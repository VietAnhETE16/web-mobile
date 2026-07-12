# Báo cáo tóm tắt project Online Quiz

## 1. Tổng quan

Project xây dựng hệ thống tạo và làm bài thi trắc nghiệm online, gồm 3 phần chính:

- Website dùng HTML/CSS/JavaScript thuần cho người dùng và quản trị viên.
- Backend dùng Express API, xác thực JWT và lưu dữ liệu bằng SQLite.
- Mobile app dùng React Native Expo TypeScript, kết nối cùng API với website.

Hệ thống cho phép người dùng xem danh sách bài thi, đăng nhập, làm bài, nộp bài, xem kết quả, bình luận và đánh giá. Quản trị viên có thể quản lý bài thi, chỉnh sửa thông tin bài thi, thêm/sửa/xóa câu hỏi, quản lý bình luận và xem thống kê.

## 2. Cấu trúc thư mục

| Thư mục        | Nội dung                                                                |
| -------------- | ----------------------------------------------------------------------- |
| `server/`      | Backend Express, routes, controllers, middleware, SQLite schema và seed |
| `web/`         | Frontend website HTML/CSS/JavaScript                                    |
| `mobile/`      | Ứng dụng Expo React Native TypeScript                                   |
| `sample-data/` | Dữ liệu mẫu dạng JSON                                                   |
| `report/`      | Báo cáo tóm tắt project                                                 |

## 3. Chức năng website

- Đăng nhập, đăng xuất bằng username/password.
- Phân quyền 2 loại tài khoản: `admin` và `user`.
- Trang chủ hiển thị danh sách bài thi, số câu hỏi, thời gian, đánh giá và số bình luận.
- Trang chi tiết bài thi hiển thị mô tả, lượt xem, bình luận công khai và form đánh giá.
- Trang làm bài có đồng hồ đếm ngược, đáp án dạng A/B/C/D và radio chọn đáp án.
- Trang kết quả hiển thị điểm, số câu đúng/sai, đáp án đã chọn, đáp án đúng và giải thích.
- Popup quảng cáo xuất hiện sau 1 phút ở trang chủ, trạng thái đóng được lưu bằng cookie.
- Trang giới thiệu và trang liên hệ có form gửi ý kiến.
- Giao diện responsive với 3 khoảng màn hình: dưới `800px`, từ `800px` đến `1199px`, và từ `1200px`.

## 4. Chức năng quản trị

- Xem thống kê tổng lượt xem website, số bài thi, câu hỏi, lượt làm bài, bình luận và liên hệ.
- Tạo bài thi mới.
- Sửa thông tin bài thi gồm tên, mô tả, danh mục, thời gian và ảnh bìa.
- Quản lý câu hỏi trực quan theo từng bài thi.
- Thêm hoặc sửa câu hỏi bằng popup form.
- Mỗi câu hỏi có 4 đáp án và chọn đúng 1 đáp án đúng.
- Xóa câu hỏi và xóa bài thi.
- Xem danh sách bình luận, xóa bình luận của người dùng.
- Xem danh sách liên hệ đã gửi.

## 5. Chức năng mobile Expo

- Đăng nhập và lưu token bằng AsyncStorage.
- Lấy danh sách bài thi từ API backend.
- Xem chi tiết bài thi, bình luận và đánh giá.
- Làm bài trắc nghiệm và gửi bài làm lên API.
- Xem kết quả sau khi nộp bài.
- Gửi thông tin liên hệ.
- Cấu hình API bằng IP LAN, không hard-code cố định IP máy cá nhân trong source.

## 6. Database SQLite

Database lưu tại `server/database/app.db`, schema chính gồm:

| Bảng              | Mục đích                                              |
| ----------------- | ----------------------------------------------------- |
| `users`           | Lưu tài khoản, mật khẩu đã hash và vai trò admin/user |
| `quizzes`         | Lưu thông tin bài thi                                 |
| `questions`       | Lưu câu hỏi theo từng bài thi                         |
| `options`         | Lưu 4 đáp án của mỗi câu hỏi và đáp án đúng           |
| `quiz_attempts`   | Lưu lượt làm bài, điểm, số câu đúng/sai               |
| `attempt_answers` | Lưu đáp án người dùng đã chọn                         |
| `comments`        | Lưu bình luận và điểm đánh giá                        |
| `contacts`        | Lưu ý kiến liên hệ                                    |
| `site_stats`      | Lưu tổng lượt xem website                             |

## 7. API chính

| API                                     | Chức năng                         |
| --------------------------------------- | --------------------------------- |
| `POST /api/auth/login`                  | Đăng nhập                         |
| `GET /api/auth/me`                      | Lấy thông tin người dùng hiện tại |
| `GET /api/quizzes`                      | Lấy danh sách bài thi             |
| `GET /api/quizzes/:id`                  | Lấy chi tiết bài thi              |
| `GET /api/quizzes/:id/questions`        | Lấy câu hỏi để làm bài            |
| `POST /api/quizzes/:id/submit`          | Nộp bài và chấm điểm              |
| `GET /api/attempts/:attemptId`          | Xem kết quả bài làm               |
| `POST /api/quizzes/:id/comments`        | Gửi bình luận/đánh giá            |
| `POST /api/contact`                     | Gửi liên hệ                       |
| `GET /api/admin/stats`                  | Thống kê admin                    |
| `POST /api/admin/quizzes`               | Tạo bài thi                       |
| `PUT /api/admin/quizzes/:id`            | Sửa bài thi                       |
| `DELETE /api/admin/quizzes/:id`         | Xóa bài thi                       |
| `POST /api/admin/quizzes/:id/questions` | Thêm câu hỏi                      |
| `PUT /api/admin/questions/:id`          | Sửa câu hỏi                       |
| `DELETE /api/admin/questions/:id`       | Xóa câu hỏi                       |

## 8. Hướng dẫn chạy backend và website

Mở terminal tại thư mục project, chạy:

```powershell
cd server
npm install
npm run seed
npm start
```

Sau khi server chạy:

- Website: `http://localhost:3000`
- API: `http://localhost:3000/api`

Tài khoản mẫu:

- Admin: `admin` / `admin123`
- User: `user` / `user123`

## 9. Hướng dẫn chạy mobile Expo

Mở terminal khác, chạy:

```powershell
cd mobile
npm install
npm run start:clear
```

Nếu chạy bằng iPhone/Expo Go hoặc điện thoại thật, máy tính và điện thoại phải dùng cùng mạng Wi-Fi.

## 10. Hướng dẫn sửa địa chỉ IP LAN cho mobile

Khi dùng điện thoại thật, không dùng `localhost` vì `localhost` trên điện thoại là chính điện thoại, không phải máy tính đang chạy backend.

Các bước cấu hình IP:

1. Lấy IPv4 Wi-Fi của máy tính.

```powershell
ipconfig
```

Tìm dòng `IPv4 Address` của card Wi-Fi, ví dụ:

```text
192.168.1.6
```

2. Tạo file môi trường cho mobile từ file mẫu.

```powershell
cd mobile
Copy-Item .env.example .env.local
```

3. Mở `mobile/.env.local` và sửa `YOUR_LAN_IP` thành IP vừa lấy.

Ví dụ:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.6:3000/api
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.6
```

4. Chạy lại Expo và xóa cache.

```powershell
npm run start:clear
```

5. Kiểm tra trên điện thoại bằng trình duyệt trước khi mở app:

```text
http://192.168.1.6:3000/api/quizzes
```

Nếu trình duyệt điện thoại mở được API, app Expo cũng có thể kết nối backend.

Lưu ý:

- Nếu đổi Wi-Fi hoặc IP máy tính thay đổi, cần sửa lại `mobile/.env.local`.
- Nếu iOS Expo báo `Network request failed` hoặc timeout, hãy kiểm tra IP LAN, firewall và đảm bảo backend đang chạy.
- File `mobile/.env.local` không đưa lên GitHub vì mỗi máy sẽ có IP LAN khác nhau.

## 11. Mức độ hoàn thiện

| Hạng mục                             | Mức độ     |
| ------------------------------------ | ---------- |
| Website HTML/CSS/JS                  | Hoàn thành |
| Express API + SQLite                 | Hoàn thành |
| Xác thực và phân quyền               | Hoàn thành |
| Làm bài, nộp bài, chấm điểm          | Hoàn thành |
| Admin quản lý bài thi/câu hỏi/đáp án | Hoàn thành |
| Bình luận, đánh giá, liên hệ         | Hoàn thành |
| Mobile Expo TypeScript               | Hoàn thành |
| Dữ liệu mẫu và báo cáo               | Hoàn thành |

## 12. Phân công

| Thành viên        | Nhiệm vụ                                                |
| ----------------- | ------------------------------------------------------- |
| Mai Việt Anh      | Backend, SQLite, API, xác thực, chấm điểm               |
| Nguyễn Quang Dũng | Website HTML/CSS/JS, giao diện, làm bài, kết quả, admin |
| Trần Phú Nghĩa    | Mobile Expo, kiểm thử, báo cáo                          |
