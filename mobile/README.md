# Mobile Online Quiz Expo

Ứng dụng React Native Expo TypeScript, gọi REST API của backend và lưu phiên đăng nhập bằng AsyncStorage.

```powershell
npm install
npm run start:clear
```

Nếu chạy bằng iPhone/Expo Go, tạo `.env.local` từ `.env.example` và thay `YOUR_LAN_IP` bằng IPv4 Wi-Fi của máy chạy backend:

```powershell
Copy-Item .env.example .env.local
```

```env
EXPO_PUBLIC_API_URL=http://YOUR_LAN_IP:3000/api
REACT_NATIVE_PACKAGER_HOSTNAME=YOUR_LAN_IP
```

Script `start-expo.js` sẽ đọc `.env.local` để Expo QR và app cùng dùng IP LAN này. Điện thoại và máy tính phải cùng mạng Wi-Fi.
