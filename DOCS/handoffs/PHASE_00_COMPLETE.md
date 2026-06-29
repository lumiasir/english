# PHASE_00: Infrastructure

> **Ngay hoan thanh:** 2026-06-29
> **Nguoi thuc hien:** AI Agent (Claude Code)
> **Branch:** `master`
> **Commit cuoi:** `f16da2e` — fix: remove next-intl completely to fix Vercel 404 - all routes now static
> **Handoff nay danh cho:** Nguoi thuc hien Phase 01 (Auth & Core Database)

> **Luu y cap nhat:**
> - Next.js 16 da bo `next lint` → dung ESLint truc tiep.
> - TypeScript 6 da deprecated `baseUrl` → bo `baseUrl`, chi dung `paths`.
> - **next-intl DA BI LOAI BO** khoi root layout + middleware + pages — se tai tich hop dung cach o Phase 01 (xem Section 3).
> - **Tat ca route hien tai la Static (○)** — pre-rendered HTML, khong can serverless function.

---

## 1. Muc tieu thuc te da dat duoc

Phase 00 da hoan thanh:

- **Monorepo pnpm** voi Next.js 16.2.9, React 19.2.7, TypeScript 6.0.3, Tailwind CSS 4.3.1
- **4 route group skeleton** hoat dong: `/`, `/login`, `/dashboard`, `/admin`
- **Theme dark-first**: Be Vietnam Pro (400/500), JetBrains Mono (400), sharp corners (`--radius: 0px`), `rounded-[4px]` cho buttons/inputs
- **Middleware auth guard**: `/dashboard` va `/admin` redirect ve `/login` khi chua co Supabase session cookie
- **CI/CD GitHub Actions**: lint → typecheck → build tren push/PR main+staging
- **Deploy Vercel**: `edu.doanquangkien.com` hien thi landing "Coming Soon" — tat ca route Static (○)
- **Husky pre-commit**: security scan + line count check (≤300) + emoji check + prettier format
- **5 shared component skeletons**: LoadingSkeleton, Toast, ConfirmDialog, EmptyState, ErrorState
- `pnpm lint`, `pnpm typecheck`, `pnpm build` deu pass

### Trang thai Definition of Done

| # | Dieu kien | Status |
|---|---|---|
| 1 | Monorepo chay duoc | ✅ |
| 2 | Landing page deploy len production | ✅ `edu.doanquangkien.com` |
| 3 | Theme dung | ✅ |
| 4 | 4 route group hoat dong | ✅ |
| 5 | Middleware chan duoc | ✅ |
| 6 | Supabase ket noi duoc | ⬜ Can API keys |
| 7 | CI/CD xanh | ⬜ Chua verify tren GitHub (da push CI workflow) |
| 8 | Preview deploy hoat dong | ⬜ Chua test (can Vercel preview) |
| 9 | Staging deploy hoat dong | ⬜ Chua cau hinh `staging.edu.doanquangkien.com` |
| 10 | Tooling day du | ✅ |

---

## 2. Nhung gi DA lam — File Manifest

### Root config

| File | Muc dich | Ghi chu |
|---|---|---|
| `pnpm-workspace.yaml` | Monorepo pnpm: `apps/*`, `packages/*`, `packages/config/*` | Added |
| `.npmrc` | `shamefully-hoist=false`, `strict-peer-dependencies=true`, `engine-strict=true` | Added |
| `turbo.json` | Pipeline: build, lint, typecheck, test, dev | Added |
| `package.json` | Root scripts + husky + lint-staged + `pnpm.onlyBuiltDependencies` | Added |
| `.github/workflows/ci.yml` | CI: lint → typecheck → build on push/PR main+staging | Added |
| `.gitignore` | Bo sung `.claude/`, `*.tsbuildinfo` | Modified |

### packages/config/tsconfig

| File | Muc dich | Ghi chu |
|---|---|---|
| `package.json` | `@edu-platform/tsconfig` | Added |
| `base.json` | ES2024, strict, bundler, noUnusedLocals, noUnusedParameters | Added |
| `nextjs.json` | Extends base, jsx preserve, next plugin | Added |
| `node.json` | Extends base, NodeNext | Added |

### packages/config/eslint

| File | Muc dich | Ghi chu |
|---|---|---|
| `package.json` | `@edu-platform/eslint-config`, type=module | Added |
| `base.js` | typescript-eslint + prettier, no-console, prefer-const | Added |
| `next.js` | next + react + react-hooks plugins, jsx-no-leaked-render | Added |
| `node.js` | base + no-console off | Added |

### packages/config/prettier

| File | Muc dich | Ghi chu |
|---|---|---|
| `package.json` | `@edu-platform/prettier-config` | Added |
| `.prettierrc.json` | semi, singleQuote=false, trailingComma=all, printWidth=100 | Added |

### apps/web — Core

| File | Muc dich | Ghi chu |
|---|---|---|
| `package.json` | Next.js 16.2.9 + React 19.2.7 + Supabase + Tailwind v4 | Added |
| `tsconfig.json` | Extends `@edu-platform/tsconfig/nextjs.json`, `@/*` → `./*` | Added |
| `next.config.ts` | CSP headers, image domains, security headers | **DA BO next-intl plugin** (xem Section 3) |
| `postcss.config.mjs` | `@tailwindcss/postcss` plugin | Added |
| `eslint.config.mjs` | Flat config: js + tseslint + next + react + react-hooks | Added |
| `vercel.json` | Vercel build config cho monorepo | Added (sau deploy lan 1) |
| `.env.local` | Local env template (API keys can dien) | Added |
| `.env.staging` | Staging env placeholder | Added |
| `.env.production` | Production env placeholder | Added |

### apps/web — i18n (infrastructure only, chua active)

| File | Muc dich | Ghi chu |
|---|---|---|
| `src/i18n/request.ts` | next-intl request config (static import) | **Chua duoc su dung** — se active o Phase 01 |
| `src/i18n/routing.ts` | Locale: vi, default: vi, prefix: as-needed | **Chua duoc su dung** |
| `src/i18n/navigation.ts` | createNavigation helper | **Chua duoc su dung** |
| `messages/vi.json` | Vietnamese translation strings | **Chua duoc su dung** |

### apps/web — Routes & Layouts

| File | URL | Muc dich | Ghi chu |
|---|---|---|---|
| `app/layout.tsx` | — | Root layout: Be Vietnam Pro + JetBrains Mono, `lang="vi"`, dark class | **DA BO NextIntlClientProvider** |
| `app/(marketing)/layout.tsx` | — | Public layout: header + footer | |
| `app/(marketing)/page.tsx` | `/` | Landing "Coming Soon" + 6 skill cards | **Inline Vietnamese text** |
| `app/(auth)/layout.tsx` | — | Centered auth layout | |
| `app/(auth)/login/page.tsx` | `/login` | Login placeholder (disabled form) | **Inline Vietnamese text** |
| `app/(app)/layout.tsx` | — | App shell: sidebar + main content | |
| `app/(app)/dashboard/page.tsx` | `/dashboard` | Dashboard placeholder: 3 stat cards | **Inline Vietnamese text** |
| `app/(admin)/layout.tsx` | — | Admin shell: sidebar + main content | |
| `app/(admin)/admin/page.tsx` | `/admin` | Admin dashboard placeholder: 4 stat cards | **Inline Vietnamese text** |

### apps/web — Infrastructure

| File | Muc dich | Ghi chu |
|---|---|---|
| `src/middleware.ts` | Auth guard: check Supabase cookie, redirect /login | **DA BO intlMiddleware** |
| `lib/supabase/client.ts` | Browser client (createBrowserClient) | |
| `lib/supabase/server.ts` | Server client (createServerClient) + service client (createServiceClient) | |
| `app/globals.css` | Tailwind v4 + dark-first theme + oklch variables + `--radius: 0px` | |

### apps/web — Shared Components

| File | Muc dich |
|---|---|
| `components/ui/shared/loading-skeleton.tsx` | LoadingSkeleton: configurable rows + animate-pulse |
| `components/ui/shared/toast.tsx` | Toast: 4 variants (default/success/error/warning) |
| `components/ui/shared/confirm-dialog.tsx` | ConfirmDialog: default/destructive, open/close |
| `components/ui/shared/empty-state.tsx` | EmptyState: icon + title + description + action |
| `components/ui/shared/error-state.tsx` | ErrorState: icon + message + retry button |

### Hooks

| File | Muc dich |
|---|---|
| `.husky/pre-commit` | Security scan + line count (≤300) + emoji check + `npx lint-staged` |
| `.husky/_/pre-commit` | Husky wrapper — sources `_/h` |
| `.husky/_/h` | Husky bootstrapper — exports `node_modules/.bin` to PATH |

---

## 3. Quyet dinh da THAY DOI so voi SPEC

| Spec noi | Thuc te lam | Ly do |
|---|---|---|
| Dung `next lint` | Dung `eslint . --ext .ts,.tsx,.js,.jsx` | Next.js 16 da bo `next lint` command hoan toan |
| `tsconfig.baseUrl: "."` | Bo `baseUrl`, chi dung `paths` | TypeScript 6.0 deprecated `baseUrl` |
| Tao app bang `create-next-app` | Tao thu cong `apps/web` | De kiem soat chinh xac version |
| Admin route group `(admin)/page.tsx` | Dat `(admin)/admin/page.tsx` | Tranh conflict route `/` voi `(marketing)/page.tsx` |
| `tailwind.config.ts` | Khong co (Tailwind v4 CSS-based) | Tailwind v4.3.1 cau hinh qua CSS `@theme` |
| **Dung `next-intl` trong root layout + middleware + pages** | **Loai bo hoan toan khoi runtime — tat ca page dung inline text + middleware khong goi intlMiddleware** | **next-intl server functions (`getLocale`, `getMessages`) bien toan bo route thanh Dynamic (ƒ) → Vercel serverless fail → 404. Static import + i18n infra van giu lai, se active lai dung cach o Phase 01.** |
| **`app/page.tsx` redirect `/`** | **Xoa file — `(marketing)/page.tsx` xu ly `/` truc tiep** | **Gay redirect loop `/` → `/`** |
| Font weight restrictions qua ESLint | Qua code review + lint-staged | ESLint AST selectors khong match className strings |
| shadcn/ui init | Chua chay — CSS variables da san sang | Can interactive terminal |
| `@eslint/js@^9.33.0` | `@eslint/js@^9.39.4` | Version SPEC chua duoc publish |

---

## 4. Technical Debt & Known Issues

| Van de | Muc do | Du kien sua |
|---|---|---|
| shadcn/ui init chua chay | Thap | Phase 01 |
| next-intl chua active — pages dung inline text | Thap | Phase 01 |
| Middleware hardcoded Supabase project ref `sb-rmtmrkgqrjodzcbwlhom-auth-token` | Trung binh | Phase 01 |
| Emoji check chi bat mot so UTF-8 range pho bien | Thap | Khong can |
| `pnpm lint` chi chay cho `apps/web` | Thap | Khong can |
| Chua co `staging.edu.doanquangkien.com` | Thap | Phase 00 (Founder) |
| Chua verify CI pass tren GitHub | Thap | Sau push |

---

## 5. Nhung gi CHUA lam (du plan noi se lam)

| Hang muc | Ly do | Phase du kien |
|---|---|---|
| Dien Supabase API keys vao `.env.local` | Can Founder cung cap | Phase 00 (Founder) |
| Cau hinh `staging.edu.doanquangkien.com` | Can Founder DNS | Phase 00 (Founder) |
| `npx shadcn@latest init` | Can interactive terminal | Phase 01 |
| Verify middleware redirect tren production | Chua co Supabase keys | Phase 01 |

---

## 6. Huong dan cho Phase 01

Neu ban dang code Phase 01 (Auth & Core Database):

1. **Doc truoc:** `DOCS/SPECIFICATION.md` Chuong 5 (Auth) + Chuong 4 (DB schema)
2. **Kiem tra env:** Dam bao `.env.local` co du Supabase keys — hien tai dang trong
3. **Chay thu:** `pnpm dev` → `http://localhost:3000` → landing page hien thi
4. **Tich hop lai next-intl DUNG CACH:**
   - Dung `[locale]` segment trong URL thay vi `as-needed` prefix
   - Hoac giu `as-needed` nhung DUNG `setRequestLocale` trong root layout
   - **KHONG goi `getLocale()`/`getMessages()` truc tiep trong root layout** — day la nguyen nhan gay 404
   - Bo sung `NextIntlClientProvider` trong root layout voi messages da load
5. **Middleware that:** Thay check cookie cung bang `createServerClient` + `getUser()` — xem [Supabase docs](https://supabase.com/docs/guides/auth/server-side/nextjs)
6. **Supabase client:** Da co san `lib/supabase/server.ts` (regular + service_role) va `lib/supabase/client.ts` (browser)
7. **shadcn/ui:** Chay `npx shadcn@latest init` truoc khi code UI — neutral theme, radius=0
8. **Theme rules:** Dark-first, Be Vietnam Pro (400/500), `rounded-[4px]` cho buttons/inputs, `rounded-none` cho cards/modals. Khong emoji, khong `font-bold`, khong `italic`
9. **File limits:** File ≤300 dong, component ≤200 dong, ham ≤50 dong

---

## 7. Moi truong & Bien moi truong

| Bien | Gia tri | Muc dich |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://rmtmrkgqrjodzcbwlhom.supabase.co` | Supabase cloud project (ap-southeast-1) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (trong — can Founder) | Supabase anon key (safe for client) |
| `SUPABASE_SERVICE_ROLE_KEY` | (trong — can Founder) | Supabase service_role (server-only, bypass RLS) |
| `OPENROUTER_API_KEY` | (trong — can Founder) | Open Router API key cho AI Service Layer |
| `CRON_SECRET` | (trong — can Founder) | Secret cho Vercel Cron jobs |
| `AI_FAILBACK_1_MODEL` | (trong — can Founder) | Model failback 1 |
| `AI_FAILBACK_2_MODEL` | (trong — can Founder) | Model failback 2 |

### Cau hinh Vercel (da setup)

| Setting | Gia tri |
|---|---|
| Root Directory | `apps/web` |
| Framework | Next.js (auto-detect) |
| Build Command | `pnpm build` |
| Install Command | `pnpm install --frozen-lockfile` |

### Phien ban packages da cai

| Package | Phien ban | Ghi chu |
|---|---|---|
| Node.js | 25.6.1 | OK (≥24.x) |
| pnpm | 10.4.1 | OK (≥9.x) |
| Next.js | 16.2.9 | ✅ |
| React | 19.2.7 | ✅ |
| TypeScript | 6.0.3 | ✅ |
| Turborepo | 2.10.0 | Cao hon SPEC (2.9.18) |
| Tailwind CSS | 4.3.1 | ✅ |
| `@supabase/supabase-js` | 2.108.2 | Cao hon SPEC (2.107.0) |
| `@supabase/ssr` | 0.12.0 | ✅ |
