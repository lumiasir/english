# ENGLISH

> Nền tảng học tiếng Anh thế hệ mới cho người Việt Nam (A1–C2).

**BẮT ĐẦU Ở ĐÂY → [`DOCS/README.md`](DOCS/README.md)** — trung tâm tài liệu dự án.

---

## Quick Start (cho dev mới)

### Cần cài đặt

| Công cụ | Phiên bản tối thiểu | Kiểm tra |
|---|---|---|
| Node.js | ≥20.x | `node -v` |
| pnpm | ≥9.x | `pnpm -v` |
| Supabase CLI | ≥1.x | `supabase --version` |
| Vercel CLI | ≥34.x | `vercel --version` |
| Git | ≥2.40 | `git --version` |

### Sau khi clone

```bash
pnpm install
cp .env.example .env.local   # (sẽ có sau Phase 00)
pnpm dev                      # Turbopack dev server
```

### Tài liệu

Toàn bộ tài liệu dự án nằm trong [`DOCS/`](DOCS/):
- [`SPECIFICATION.md`](DOCS/SPECIFICATION.md) — Kiến trúc + DB contract + API
- [`PLAN_IMPLEMENTATION.md`](DOCS/PLAN_IMPLEMENTATION.md) — Lộ trình triển khai
- [`CHECKLIST.md`](DOCS/CHECKLIST.md) — Checklist trước code / PR / go-live

### Trạng thái

🟡 **Phase 00 — Infrastructure** đang triển khai. Xem chi tiết tại [`DOCS/PLAN_IMPLEMENTATION.md`](DOCS/PLAN_IMPLEMENTATION.md).

---

## Stack

| Lớp | Công nghệ |
|---|---|
| Frontend | Next.js 16 (App Router) + TypeScript + Tailwind + shadcn/ui |
| Backend | Supabase (PostgreSQL 17, Auth, RLS, Realtime, Edge Functions) |
| AI | Multi-provider: Claude, GPT, Gemini, DeepSeek (qua AI Service Layer) |
| Hosting | Vercel + Cloudflare (CDN, R2, WAF) |
| Payment | Stripe + VNPay + Momo |
| Package | pnpm monorepo |
