# Hướng dẫn Deployment — My iKame

## 1. Yêu cầu Môi trường

- Node.js 18+
- Yarn (package manager)
- Git

---

## 2. Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd my-ikame-web-dev

# Cài dependencies
yarn install

# Tạo file môi trường
cp .env.example .env
```

---

## 3. Biến Môi trường

| Biến | Mô tả | Ví dụ |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL backend API | `http://localhost:3000/api` |
| `VITE_SSO_URL` | Keycloak SSO endpoint | `https://keycloak.ikameglobal.com` |
| `VITE_KEYCLOAK_REALM` | Keycloak realm | `ikame-platform` |

> **Lưu ý**: Keycloak client ID (`ikame-sso`) được hardcode trong `src/lib/keycloak-config.ts`.

---

## 4. Scripts

```bash
yarn dev        # Khởi động dev server (http://localhost:5173)
yarn build      # Build production (tsc + vite build → /dist)
yarn preview    # Preview production build
yarn lint       # Chạy ESLint (max-warnings 0)
```

---

## 5. Build Production

```bash
yarn build
```

Output: `dist/` directory

**Build process**:
1. TypeScript compile (`tsc`)
2. Vite bundle + optimize
3. Tree-shaking, code splitting tự động

---

## 6. Docker

Project có `Dockerfile` tại root. Xem file Dockerfile để biết chi tiết cấu hình container.

---

## 7. Deployment Checklist

- [ ] Cập nhật biến môi trường production
- [ ] `yarn build` chạy thành công
- [ ] Test production build local bằng `yarn preview`
- [ ] Verify SSO integration với Keycloak production
- [ ] Kiểm tra API endpoints kết nối đúng
- [ ] Test auth flow (login → redirect → token)
- [ ] Kiểm tra iframe integrations (iCheck, iGoal, iWiki)

---

## 8. Troubleshooting

### Login không hoạt động
- Kiểm tra `VITE_SSO_URL` trong `.env`
- Verify Keycloak server accessible
- Check browser console → network tab

### API 401 Unauthorized
- Kiểm tra token trong localStorage (`authToken`)
- Verify token chưa expired
- Kiểm tra `customFetchBase.ts` attach Bearer token đúng

### Path alias lỗi
- Kiểm tra `tsconfig.json` paths
- Kiểm tra `vite.config.ts` resolve.alias
- Restart dev server
