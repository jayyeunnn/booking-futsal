# Task List — JayField Development
# Website Booking Lapangan Futsal

---

## Phase 1 — MVP (4-6 Minggu)

### 1.1 Project Setup & Architecture

- [ ] Initialize Next.js 14 project (App Router, TypeScript)
- [ ] Install & configure Tailwind CSS
- [ ] Install & configure shadcn/ui
- [ ] Setup font (Montserrat + Inter via Google Fonts)
- [ ] Configure color palette (sporty green + orange CTA) di `tailwind.config.ts`
- [ ] Setup folder structure sesuai TDD
- [ ] Install & configure Prisma ORM
- [ ] Setup PostgreSQL database (Supabase/Railway/Neon)
- [ ] Create database schema (`prisma/schema.prisma`)
- [ ] Run initial migration
- [ ] Seed data awal (lokasi, lapangan, pricing, admin user)
- [ ] Install & configure NextAuth.js (credentials + Google OAuth)
- [ ] Setup next-intl (bilingual ID/EN)
- [ ] Create translation files (`messages/id.json`, `messages/en.json`)
- [ ] Setup middleware (auth + i18n locale routing)
- [ ] Setup environment variables (`.env.example`)
- [ ] Setup Zod validation schemas
- [ ] Setup Zustand store skeleton
- [ ] Install utility libraries (date-fns, lucide-react)
- [ ] Create root layout (`src/app/layout.tsx`)
- [ ] Create base components (Navbar placeholder, Footer placeholder)

### 1.2 Landing Page

- [ ] Create landing page route (`/[locale]/page.tsx`)
- [ ] Build Hero Section (full-screen, background image, CTA buttons)
- [ ] Build Social Proof Bar (stats counter with animation)
- [ ] Build Info Lapangan & Fasilitas Section
- [ ] Build Lokasi Section (location cards + map placeholder)
- [ ] Build Harga Section (pricing table with weekday/weekend tabs)
- [ ] Build Gallery Section (image grid with lightbox)
- [ ] Build Promo & Event Section (promo cards carousel)
- [ ] Build Testimoni Section (review cards carousel)
- [ ] Build FAQ Section (accordion)
- [ ] Build Final CTA Section (gradient background)
- [ ] Build Footer (4-column layout)
- [ ] Build Navbar (transparent → solid on scroll, mobile hamburger + drawer)
- [ ] Implement responsive design (mobile, tablet, desktop)
- [ ] Implement bilingual toggle (ID/EN switch)
- [ ] Add scroll animations (fade-in, count-up for stats)
- [ ] SEO: meta tags, Open Graph, structured data
- [ ] Performance: optimize images, lazy loading

### 1.3 Authentication System

- [ ] Create Login page (`/[locale]/login/page.tsx`)
- [ ] Create Register page (`/[locale]/register/page.tsx`)
- [ ] Create Forgot Password page
- [ ] Implement email + password login (NextAuth credentials)
- [ ] Implement Google OAuth login
- [ ] Implement registration flow (create user, hash password, assign Bronze tier)
- [ ] Implement forgot password flow (send reset email)
- [ ] Create reset password page & API
- [ ] Setup session management (JWT in cookie)
- [ ] Create auth middleware (protect routes)
- [ ] Create API: `POST /api/auth/register`
- [ ] Create API: `POST /api/auth/forgot-password`
- [ ] Create API: `POST /api/auth/reset-password`
- [ ] Error handling (invalid credentials, duplicate email, etc.)
- [ ] Form validation with Zod
- [ ] Bilingual auth pages

### 1.4 Booking System (Basic)

- [ ] Create Pilih Lokasi page (`/[locale]/booking/page.tsx`)
- [ ] Create Pilih Lapangan page (`/[locale]/booking/[locationId]/page.tsx`)
- [ ] Create Pilih Jadwal page (`/[locale]/booking/[locationId]/[courtId]/page.tsx`)
- [ ] Create Konfirmasi & Bayar page (`/[locale]/booking/confirm/page.tsx`)
- [ ] Build location list component (cards with search/filter)
- [ ] Build court selection component (cards with type filter)
- [ ] Build calendar component (date picker, month view)
- [ ] Build time slot grid (available/pending/booked status)
- [ ] Implement availability check logic (real-time)
- [ ] Implement price calculation logic (regular vs prime-time, weekday vs weekend)
- [ ] Build booking summary/confirmation component
- [ ] Build payment type selector (DP vs Full)
- [ ] Build payment method selector (banks + e-wallets)
- [ ] Build promo code input & validation
- [ ] Implement booking creation flow
- [ ] Create API: `GET /api/locations`
- [ ] Create API: `GET /api/courts?locationId=xxx`
- [ ] Create API: `GET /api/courts/[id]/availability?date=xxx`
- [ ] Create API: `POST /api/bookings`
- [ ] Create API: `POST /api/promos/validate`
- [ ] Implement double-booking prevention (locking mechanism)
- [ ] Auth guard (redirect to login if not authenticated)
- [ ] Responsive booking flow (mobile-friendly)
- [ ] Bilingual booking pages

### 1.5 Pembayaran DP (Transfer Manual)

- [ ] Create Payment Instruction page (after booking created)
- [ ] Build payment info display (bank details, amount, copy button)
- [ ] Build countdown timer (1 hour deadline)
- [ ] Build upload bukti transfer component (drag & drop, preview)
- [ ] Implement file upload (UploadThing / Cloudinary)
- [ ] Create API: `GET /api/payments/[bookingId]`
- [ ] Create API: `POST /api/payments/upload-proof`
- [ ] Implement auto-expiration (booking → EXPIRED after 1 hour)
- [ ] Create payment status page (waiting confirmation)
- [ ] Add payment method management in admin settings
- [ ] Create API: `GET /api/payment-methods` (active methods)

### 1.6 Admin Dashboard (Basic)

- [ ] Create admin layout (sidebar + top bar)
- [ ] Create admin overview page (`/[locale]/admin/page.tsx`)
- [ ] Build overview stats cards (today's bookings, revenue, pending payments, occupancy)
- [ ] Create booking management page (`/[locale]/admin/bookings/page.tsx`)
- [ ] Build booking list table (sortable, filterable, paginated)
- [ ] Implement booking approve/reject actions
- [ ] Create payment confirmation page (`/[locale]/admin/payments/page.tsx`)
- [ ] Build pending payment list (with proof image preview)
- [ ] Implement payment confirm/reject with 1-click
- [ ] Create API: `GET /api/admin/bookings`
- [ ] Create API: `PUT /api/admin/bookings/[id]/confirm`
- [ ] Create API: `PUT /api/admin/bookings/[id]/reject`
- [ ] Create API: `GET /api/admin/payments`
- [ ] Create API: `PUT /api/admin/payments/[id]/confirm`
- [ ] Create API: `PUT /api/admin/payments/[id]/reject`
- [ ] Role-based access control (only ADMIN/STAFF can access)
- [ ] Responsive admin dashboard
- [ ] Bilingual admin pages

### 1.7 Bilingual (i18n) — Finalisasi

- [ ] Complete translation file `messages/id.json` (semua text)
- [ ] Complete translation file `messages/en.json` (semua text)
- [ ] Implement locale switcher in navbar
- [ ] Verify all pages render correctly in both languages
- [ ] URL routing: `/id/...` dan `/en/...`

### 1.8 Mobile Responsive — Finalisasi

- [ ] Test semua halaman di mobile (< 768px)
- [ ] Test semua halaman di tablet (768-1024px)
- [ ] Fix layout issues
- [ ] Verify touch-friendly interactions (min 44px tap targets)
- [ ] Test mobile navigation (hamburger + drawer)
- [ ] Test booking flow on mobile (stacked layout)

---

## Phase 2 — Enhanced (3-4 Minggu)

### 2.1 Membership System (Tier + Poin)

- [ ] Implement tier system logic (Bronze → Silver → Gold)
- [ ] Implement point earning (after booking completed)
- [ ] Implement point earning (after review submitted)
- [ ] Implement point earning (referral)
- [ ] Implement point earning (off-peak bonus)
- [ ] Implement tier upgrade check (after each completed booking)
- [ ] Create membership page in user dashboard
- [ ] Build tier progress bar component
- [ ] Build benefits display component
- [ ] Build tier comparison table
- [ ] Create points history page
- [ ] Build points history list (earned/redeemed log)
- [ ] Implement point redemption (diskon, free session, merchandise)
- [ ] Create API: `GET /api/members/profile`
- [ ] Create API: `GET /api/members/points-history`
- [ ] Create API: `POST /api/members/redeem`
- [ ] Apply member discount automatically at booking
- [ ] Admin: member management page
- [ ] Admin: manual point adjustment
- [ ] Create API: `GET /api/admin/members`
- [ ] Create API: `PUT /api/admin/members/[id]/adjust-points`

### 2.2 Recurring Booking

- [ ] Add recurring option in booking flow (checkbox + day selector)
- [ ] Create recurring booking database logic
- [ ] Implement recurring booking generator (scheduled job)
- [ ] Create recurring booking management in user dashboard
- [ ] Allow user to pause/cancel recurring bookings
- [ ] Create API: `GET /api/recurring-bookings`
- [ ] Create API: `POST /api/recurring-bookings`
- [ ] Create API: `PUT /api/recurring-bookings/[id]`
- [ ] Create API: `DELETE /api/recurring-bookings/[id]`
- [ ] Setup cron job: generate next-week bookings daily

### 2.3 Notification System

- [ ] Setup email service (Resend API)
- [ ] Create email templates (booking-created, payment-confirmed, reminder, etc.)
- [ ] Implement email sending on booking events
- [ ] Implement H-1 reminder email (cron job)
- [ ] Implement tier upgrade email
- [ ] Build in-app notification system
- [ ] Create notification bell icon in navbar (with badge count)
- [ ] Create notification center page (`/dashboard/notifications`)
- [ ] Build notification list component (grouped by type)
- [ ] Implement mark as read / mark all as read
- [ ] Create API: `GET /api/notifications`
- [ ] Create API: `GET /api/notifications/unread-count`
- [ ] Create API: `PUT /api/notifications/[id]/read`
- [ ] Create API: `PUT /api/notifications/read-all`
- [ ] Setup cron job: send daily H-1 reminders

### 2.4 User Dashboard (Lengkap)

- [ ] Build complete booking history page (upcoming, completed, cancelled tabs)
- [ ] Build booking detail page (with status timeline)
- [ ] Build profile edit page (nama, phone, avatar)
- [ ] Build change password page
- [ ] Build favorites page (save favorite courts for quick booking)
- [ ] Implement booking cancellation from dashboard
- [ ] Create API: `GET /api/bookings` (with filters)
- [ ] Create API: `GET /api/bookings/[id]`
- [ ] Create API: `PUT /api/bookings/[id]/cancel`

### 2.5 Refund System

- [ ] Implement refund calculation logic (H-1: 100%, >3h: 50%, <3h: 0%)
- [ ] Build cancellation modal with refund preview
- [ ] Build refund request form (bank details)
- [ ] Create user refund history view
- [ ] Admin: refund management page
- [ ] Admin: approve/reject refund
- [ ] Admin: mark refund as processed
- [ ] Create API: `POST /api/refunds`
- [ ] Create API: `GET /api/refunds`
- [ ] Create API: `GET /api/admin/refunds`
- [ ] Create API: `PUT /api/admin/refunds/[id]/approve`
- [ ] Create API: `PUT /api/admin/refunds/[id]/reject`
- [ ] Create API: `PUT /api/admin/refunds/[id]/process`
- [ ] Email notification on refund status change

### 2.6 Gallery & Testimoni Management

- [ ] Admin: manage court photos (upload, reorder, delete)
- [ ] Admin: manage/moderate reviews (show/hide)
- [ ] Build review submission form (after completed booking)
- [ ] Create API: `POST /api/reviews`
- [ ] Create API: `GET /api/reviews?courtId=xxx`
- [ ] Create API: `DELETE /api/reviews/[id]`
- [ ] Award points for review submission

---

## Phase 3 — Advanced (2-3 Minggu)

### 3.1 Laporan & Analytics (Admin)

- [ ] Create reports page (`/admin/reports`)
- [ ] Build revenue report (daily/weekly/monthly chart)
- [ ] Build occupancy rate report (per court, per time slot)
- [ ] Build member growth report (registrations over time)
- [ ] Build top courts report (most booked)
- [ ] Build cancellation rate report
- [ ] Create API: `GET /api/admin/reports/revenue`
- [ ] Create API: `GET /api/admin/reports/occupancy`
- [ ] Create API: `GET /api/admin/reports/members`
- [ ] Add date range filter for all reports
- [ ] Export report to CSV (optional)

### 3.2 Promo & Event Management

- [ ] Admin: create promo page (code, discount, conditions, period)
- [ ] Admin: list/edit/deactivate promos
- [ ] Implement promo validation logic (min booking, usage limit, member-only, tier requirement)
- [ ] Build promo display on public promo page
- [ ] Create API: `GET /api/promos/active`
- [ ] Create API: `GET /api/admin/promos`
- [ ] Create API: `POST /api/admin/promos`
- [ ] Create API: `PUT /api/admin/promos/[id]`
- [ ] Create API: `DELETE /api/admin/promos/[id]`

### 3.3 Penukaran Poin (Reward Store)

- [ ] Build reward store page in user dashboard
- [ ] Create reward catalog (discounts, free sessions, merchandise)
- [ ] Implement redemption flow (select reward → confirm → deduct points)
- [ ] Generate discount code on redemption
- [ ] Admin: manage reward catalog
- [ ] Track redemption history

### 3.4 Referral System

- [ ] Generate unique referral code per user
- [ ] Build referral sharing UI (copy link, share to WhatsApp)
- [ ] Track referral registrations
- [ ] Award points when referee completes first booking
- [ ] Build referral dashboard (referral count, points earned)

### 3.5 SEO Optimization

- [ ] Add meta tags to all public pages
- [ ] Implement Open Graph tags (for social sharing)
- [ ] Add structured data (LocalBusiness, SportsActivityLocation)
- [ ] Generate sitemap.xml
- [ ] Create robots.txt
- [ ] Optimize page titles & descriptions per locale
- [ ] Implement canonical URLs

### 3.6 Performance Tuning

- [ ] Implement ISR for landing page, locations, courts
- [ ] Optimize images (WebP, proper sizing, lazy load)
- [ ] Code splitting (dynamic imports for heavy components)
- [ ] Database query optimization (check slow queries)
- [ ] Add proper indexes to frequently queried columns
- [ ] Lighthouse audit → target score > 90
- [ ] Bundle size analysis & reduction

---

## Phase 4 — Future (Opsional)

### 4.1 Payment Gateway Integration
- [ ] Integrate Midtrans or Xendit
- [ ] Implement auto-confirmation on successful payment
- [ ] Remove manual transfer flow (or keep as alternative)

### 4.2 WhatsApp Notification
- [ ] Integrate WhatsApp Business API (e.g., Fonnte, Wablas)
- [ ] Send booking confirmation via WA
- [ ] Send H-1 reminder via WA
- [ ] Send payment reminder via WA

### 4.3 Mobile App
- [ ] Create React Native app (or PWA)
- [ ] Push notifications
- [ ] Offline booking history

### 4.4 Additional Features
- [ ] Chatbot (FAQ auto-response)
- [ ] Google Calendar integration (add booking to calendar)
- [ ] Dark mode
- [ ] Multi-language expansion (add English variants)
- [ ] Advanced analytics (heatmap, user behavior)

---

## Admin CRUD Tasks (Ongoing)

### Court Management
- [ ] Admin: create court page (form with photo upload)
- [ ] Admin: edit court page
- [ ] Admin: deactivate/delete court
- [ ] Create API: `POST /api/courts`
- [ ] Create API: `PUT /api/courts/[id]`
- [ ] Create API: `DELETE /api/courts/[id]`

### Location Management
- [ ] Admin: create location page
- [ ] Admin: edit location page
- [ ] Admin: deactivate/delete location
- [ ] Create API: `POST /api/locations`
- [ ] Create API: `PUT /api/locations/[id]`
- [ ] Create API: `DELETE /api/locations/[id]`

### Pricing Management
- [ ] Admin: pricing page (set price per court, day type, time type)
- [ ] Admin: bulk price update
- [ ] Create API for pricing CRUD

### User/Staff Management
- [ ] Admin: create staff account
- [ ] Admin: list users/staff
- [ ] Admin: change user role
- [ ] Admin: deactivate user
- [ ] Create API: `GET /api/admin/users`
- [ ] Create API: `POST /api/admin/users`
- [ ] Create API: `PUT /api/admin/users/[id]`
- [ ] Create API: `DELETE /api/admin/users/[id]`

### Settings
- [ ] Admin: settings page (DP percentage, payment deadline, refund policy, bank accounts)
- [ ] Create API: `GET /api/admin/settings`
- [ ] Create API: `PUT /api/admin/settings`

---

## Scheduled Jobs (Cron)

- [ ] Setup cron: Expire unpaid bookings (every 5 minutes)
- [ ] Setup cron: Send H-1 booking reminders (daily at 18:00)
- [ ] Setup cron: Generate recurring bookings (daily at 00:01)
- [ ] Setup cron: Cleanup old notifications (weekly)

---

## Deployment

- [ ] Setup Vercel project
- [ ] Setup production database (Supabase/Railway/Neon)
- [ ] Configure environment variables di Vercel
- [ ] Setup custom domain (when ready)
- [ ] Setup SSL certificate (auto via Vercel)
- [ ] Configure Vercel Cron Jobs
- [ ] Setup database backup strategy
- [ ] First production deployment
- [ ] Smoke test semua flow di production

---

*Total estimated tasks: ~200+ items*
*Prioritas: Phase 1 → Phase 2 → Phase 3 → Phase 4*

**Dibuat:** 28 Mei 2026
**Versi:** 1.0
**Referensi:** JayField-PRD.md, requirements.md, design.md
