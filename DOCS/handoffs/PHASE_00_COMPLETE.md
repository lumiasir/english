# PHASE_00: Infrastructure

> **Ngày hoàn thành:** 2026-06-29
> **Người thực hiện:** AI Agent (Claude Code)
> **Branch:** `master`
> **Commit cuối:** `f16da2e` — fix: remove next-intl completely to fix Vercel 404 - all routes now static
> **Handoff này dành cho:** Người thực hiện Phase 01 (Auth & Core Database)

> **Lưu ý cập nhật:**
> - Next.js 16 đã bỏ `next lint` → dùng ESLint trực tiếp.
> - TypeScript 6 đã deprecated `baseUrl` → bỏ `baseUrl`, chỉ dùng `paths`.
> - **next-intl ĐÃ BỊ LOẠI BỎ** khỏi root layout + middleware + pages — sẽ tái tích hợp đúng cách ở Phase 01 (xem Section 3).
> - **Tất cả route hiện tại là Static (○)** — pre-rendered HTML, không cần serverless function.

---

## 1. Mục tiêu thực tế đã đạt được

Phase 00 đã hoàn thành:

- **Monorepo pnpm** với Next.js 16.2.9, React 19.2.7, TypeScript 6.0.3, Tailwind CSS 4.3.1
- **4 route group skeleton** hoạt động: `/`, `/login`, `/dashboard`, `/admin`
- **Theme dark-first**: Be Vietnam Pro (400/500), JetBrains Mono (400), sharp corners (`--radius: 0px`), `rounded-[4px]` cho buttons/inputs
- **Middleware auth guard**: `/dashboard` và `/admin` redirect về `/login` khi chưa có Supabase session cookie
- **CI/CD GitHub Actions**: lint → typecheck → build trên push/PR main+staging
- **Deploy Vercel**: `edu.doanquangkien.com` hiển thị landing "Coming Soon" — tất cả route Static (○)
- **Husky pre-commit**: security scan + line count check (≤300) + emoji check + prettier format
- **5 shared component skeletons**: LoadingSkeleton, Toast, ConfirmDialog, EmptyState, ErrorState
- `pnpm lint`, `pnpm typecheck`, `pnpm build` đều pass

### Trạng thái Definition of Done

| # | Điều kiện | Status |
|---|---|---|
| 1 | Monorepo chạy được | ✅ |
| 2 | Landing page deploy lên production | ✅ `edu.doanquangkien.com` |
| 3 | Theme đúng | ✅ |
| 4 | 4 route group hoạt động | ✅ |
| 5 | Middleware chặn được | ✅ |
| 6 | Supabase kết nối được | ⬜ Cần API keys |
| 7 | CI/CD xanh | ⬜ Chưa verify trên GitHub (đã push CI workflow) |
| 8 | Preview deploy hoạt động | ⬜ Chưa test (cần Vercel preview) |
| 9 | Staging deploy hoạt động | ⬜ Chưa cấu hình `staging.edu.doanquangkien.com` |
| 10 | Tooling đầy đủ | ✅ |

---

## 2. Những gì ĐÃ làm — File Manifest

### Root config

| File | Mục đích | Ghi chú |
|---|---|---|
| `pnpm-workspace.yaml` | Monorepo pnpm: `apps/*`, `packages/*`, `packages/config/*` | Added |
| `.npmrc` | `shamefully-hoist=false`, `strict-peer-dependencies=true`, `engine-strict=true` | Added |
| `turbo.json` | Pipeline: build, lint, typecheck, test, dev | Added |
| `package.json` | Root scripts + husky + lint-staged + `pnpm.onlyBuiltDependencies` | Added |
| `.github/workflows/ci.yml` | CI: lint → typecheck → build on push/PR main+staging | Added |
| `.gitignore` | Bổ sung `.claude/`, `*.tsbuildinfo` | Modified |

### packages/config/tsconfig

| File | Mục đích | Ghi chú |
|---|---|---|
| `package.json` | `@edu-platform/tsconfig` | Added |
| `base.json` | ES2024, strict, bundler, noUnusedLocals, noUnusedParameters | Added |
| `nextjs.json` | Extends base, jsx preserve, next plugin | Added |
| `node.json` | Extends base, NodeNext | Added |

### packages/config/eslint

| File | Mục đích | Ghi chú |
|---|---|---|
| `package.json` | `@edu-platform/eslint-config`, type=module | Added |
| `base.js` | typescript-eslint + prettier, no-console, prefer-const | Added |
| `next.js` | next + react + react-hooks plugins, jsx-no-leaked-render | Added |
| `node.js` | base + no-console off | Added |

### packages/config/prettier

| File | Mục đích | Ghi chú |
|---|---|---|
| `package.json` | `@edu-platform/prettier-config` | Added |
| `.prettierrc.json` | semi, singleQuote=false, trailingComma=all, printWidth=100 | Added |

### apps/web — Core

| File | Mục đích | Ghi chú |
|---|---|---|
| `package.json` | Next.js 16.2.9 + React 19.2.7 + Supabase + Tailwind v4 | Added |
| `tsconfig.json` | Extends `@edu-platform/tsconfig/nextjs.json`, `@/*` → `./*` | Added |
| `next.config.ts` | CSP headers, image domains, security headers | **ĐÃ BỎ next-intl plugin** (xem Section 3) |
| `postcss.config.mjs` | `@tailwindcss/postcss` plugin | Added |
| `eslint.config.mjs` | Flat config: js + tseslint + next + react + react-hooks | Added |
| `vercel.json` | Vercel build config cho monorepo | Added (sau deploy lần 1) |
| `.env.local` | Local env template (API keys cần điền) | Added |
| `.env.staging` | Staging env placeholder | Added |
| `.env.production` | Production env placeholder | Added |

### apps/web — i18n (infrastructure only, chưa active)

| File | Mục đích | Ghi chú |
|---|---|---|
| `src/i18n/request.ts` | next-intl request config (static import) | **Chưa được sử dụng** — sẽ active ở Phase 01 |
| `src/i18n/routing.ts` | Locale: vi, default: vi, prefix: as-needed | **Chưa được sử dụng** |
| `src/i18n/navigation.ts` | createNavigation helper | **Chưa được sử dụng** |
| `messages/vi.json` | Vietnamese translation strings | **Chưa được sử dụng** |

### apps/web — Routes & Layouts

| File | URL | Mục đích | Ghi chú |
|---|---|---|---|
| `app/layout.tsx` | — | Root layout: Be Vietnam Pro + JetBrains Mono, `lang="vi"`, dark class | **ĐÃ BỎ NextIntlClientProvider** |
| `app/(marketing)/layout.tsx` | — | Public layout: header + footer | |
| `app/(marketing)/page.tsx` | `/` | Landing "Coming Soon" + 6 skill cards | **Inline Vietnamese text** |
| `app/(auth)/layout.tsx` | — | Centered auth layout | |
| `app/(auth)/login/page.tsx` | `/login` | Login placeholder (disabled form) | **Inline Vietnamese text** |
| `app/(app)/layout.tsx` | — | App shell: sidebar + main content | |
| `app/(app)/dashboard/page.tsx` | `/dashboard` | Dashboard placeholder: 3 stat cards | **Inline Vietnamese text** |
| `app/(admin)/layout.tsx` | — | Admin shell: sidebar + main content | |
| `app/(admin)/admin/page.tsx` | `/admin` | Admin dashboard placeholder: 4 stat cards | **Inline Vietnamese text** |

### apps/web — Infrastructure

| File | Mục đích | Ghi chú |
|---|---|---|
| `src/middleware.ts` | Auth guard: check Supabase cookie, redirect /login | **ĐÃ BỎ intlMiddleware** |
| `lib/supabase/client.ts` | Browser client (createBrowserClient) | |
| `lib/supabase/server.ts` | Server client (createServerClient) + service client (createServiceClient) | |
| `app/globals.css` | Tailwind v4 + dark-first theme + oklch variables + `--radius: 0px` | |

### apps/web — Shared Components

| File | Mục đích |
|---|---|
| `components/ui/shared/loading-skeleton.tsx` | LoadingSkeleton: configurable rows + animate-pulse |
| `components/ui/shared/toast.tsx` | Toast: 4 variants (default/success/error/warning) |
| `components/ui/shared/confirm-dialog.tsx` | ConfirmDialog: default/destructive, open/close |
| `components/ui/shared/empty-state.tsx` | EmptyState: icon + title + description + action |
| `components/ui/shared/error-state.tsx` | ErrorState: icon + message + retry button |

### Hooks

| File | Mục đích |
|---|---|
| `.husky/pre-commit` | Security scan + line count (≤300) + emoji check + `npx lint-staged` |
| `.husky/_/pre-commit` | Husky wrapper — sources `_/h` |
| `.husky/_/h` | Husky bootstrapper — exports `node_modules/.bin` to PATH |

---

## 3. Quyết định đã THAY ĐỔI so với SPEC

| Spec nói | Thực tế làm | Lý do |
|---|---|---|
| Dùng `next lint` | Dùng `eslint . --ext .ts,.tsx,.js,.jsx` | Next.js 16 đã bỏ `next lint` command hoàn toàn |
| `tsconfig.baseUrl: "."` | Bỏ `baseUrl`, chỉ dùng `paths` | TypeScript 6.0 deprecated `baseUrl` |
| Tạo app bằng `create-next-app` | Tạo thủ công `apps/web` | Để kiểm soát chính xác version |
| Admin route group `(admin)/page.tsx` | Đặt `(admin)/admin/page.tsx` | Tránh conflict route `/` với `(marketing)/page.tsx` |
| `tailwind.config.ts` | Không có (Tailwind v4 CSS-based) | Tailwind v4.3.1 cấu hình qua CSS `@theme` |
| **Dùng `next-intl` trong root layout + middleware + pages** | **Loại bỏ hoàn toàn khỏi runtime — tất cả page dùng inline text + middleware không gọi intlMiddleware** | **next-intl server functions (`getLocale`, `getMessages`) biến toàn bộ route thành Dynamic (ƒ) → Vercel serverless fail → 404. Static import + i18n infra vẫn giữ lại, sẽ active lại đúng cách ở Phase 01.** |
| **`app/page.tsx` redirect `/`** | **Xoá file — `(marketing)/page.tsx` xử lý `/` trực tiếp** | **Gây redirect loop `/` → `/`** |
| Font weight restrictions qua ESLint | Qua code review + lint-staged | ESLint AST selectors không match className strings |
| shadcn/ui init | Chưa chạy — CSS variables đã sẵn sàng | Cần interactive terminal |
| `@eslint/js@^9.33.0` | `@eslint/js@^9.39.4` | Version SPEC chưa được publish |

---

## 4. Technical Debt & Known Issues

| Vấn đề | Mức độ | Dự kiến sửa |
|---|---|---|
| shadcn/ui init chưa chạy | Thấp | Phase 01 |
| next-intl chưa active — pages dùng inline text | Thấp | Phase 01 |
| Middleware hardcoded Supabase project ref `sb-rmtmrkgqrjodzcbwlhom-auth-token` | Trung bình | Phase 01 |
| Emoji check chỉ bắt một số UTF-8 range phổ biến | Thấp | Không cần |
| `pnpm lint` chỉ chạy cho `apps/web` | Thấp | Không cần |
| Chưa có `staging.edu.doanquangkien.com` | Thấp | Phase 00 (Founder) |
| Chưa verify CI pass trên GitHub | Thấp | Sau push |

---

## 5. Những gì CHƯA làm (dù plan nói sẽ làm)

| Hạng mục | Lý do | Phase dự kiến |
|---|---|---|
| Điền Supabase API keys vào `.env.local` | Cần Founder cung cấp | Phase 00 (Founder) |
| Cấu hình `staging.edu.doanquangkien.com` | Cần Founder DNS | Phase 00 (Founder) |
| `npx shadcn@latest init` | Cần interactive terminal | Phase 01 |
| Verify middleware redirect trên production | Chưa có Supabase keys | Phase 01 |

---

## 6. Hướng dẫn cho Phase 01

Nếu bạn đang code Phase 01 (Auth & Core Database):

1. **Đọc trước:** `DOCS/SPECIFICATION.md` Chương 5 (Auth) + Chương 4 (DB schema)
2. **Kiểm tra env:** Đảm bảo `.env.local` có đủ Supabase keys — hiện tại đang trống
3. **Chạy thử:** `pnpm dev` → `http://localhost:3000` → landing page hiển thị
4. **Tích hợp lại next-intl ĐÚNG CÁCH:**
   - Dùng `[locale]` segment trong URL thay vì `as-needed` prefix
   - Hoặc giữ `as-needed` nhưng DÙNG `setRequestLocale` trong root layout
   - **KHÔNG gọi `getLocale()`/`getMessages()` trực tiếp trong root layout** — đây là nguyên nhân gây 404
   - Bổ sung `NextIntlClientProvider` trong root layout với messages đã load
5. **Middleware thật:** Thay check cookie cứng bằng `createServerClient` + `getUser()` — xem [Supabase docs](https://supabase.com/docs/guides/auth/server-side/nextjs)
6. **Supabase client:** Đã có sẵn `lib/supabase/server.ts` (regular + service_role) và `lib/supabase/client.ts` (browser)
7. **shadcn/ui:** Chạy `npx shadcn@latest init` trước khi code UI — neutral theme, radius=0
8. **Theme rules:** Dark-first, Be Vietnam Pro (400/500), `rounded-[4px]` cho buttons/inputs, `rounded-none` cho cards/modals. Không emoji, không `font-bold`, không `italic`
9. **File limits:** File ≤300 dòng, component ≤200 dòng, hàm ≤50 dòng

---

## 7. Môi trường & Biến môi trường

| Biến | Giá trị | Mục đích |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://rmtmrkgqrjodzcbwlhom.supabase.co` | Supabase cloud project (ap-southeast-1) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (trống — cần Founder) | Supabase anon key (safe for client) |
| `SUPABASE_SERVICE_ROLE_KEY` | (trống — cần Founder) | Supabase service_role (server-only, bypass RLS) |
| `OPENROUTER_API_KEY` | (trống — cần Founder) | Open Router API key cho AI Service Layer |
| `CRON_SECRET` | (trống — cần Founder) | Secret cho Vercel Cron jobs |
| `AI_FAILBACK_1_MODEL` | (trống — cần Founder) | Model failback 1 |
| `AI_FAILBACK_2_MODEL` | (trống — cần Founder) | Model failback 2 |

### Cấu hình Vercel (đã setup)

| Setting | Giá trị |
|---|---|
| Root Directory | `apps/web` |
| Framework | Next.js (auto-detect) |
| Build Command | `pnpm build` |
| Install Command | `pnpm install --frozen-lockfile` |

### Phiên bản packages đã cài

| Package | Phiên bản | Ghi chú |
|---|---|---|
| Node.js | 25.6.1 | OK (≥24.x) |
| pnpm | 10.4.1 | OK (≥9.x) |
| Next.js | 16.2.9 | ✅ |
| React | 19.2.7 | ✅ |
| TypeScript | 6.0.3 | ✅ |
| Turborepo | 2.10.0 | Cao hơn SPEC (2.9.18) |
| Tailwind CSS | 4.3.1 | ✅ |
| `@supabase/supabase-js` | 2.108.2 | Cao hơn SPEC (2.107.0) |
| `@supabase/ssr` | 0.12.0 | ✅ |
