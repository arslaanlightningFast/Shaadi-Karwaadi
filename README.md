# ShaadiSthal — Indian Wedding Venue & Catering Booking Marketplace

ShaadiSthal is a full-stack production-grade marketplace connecting customers in India with marriage halls, wedding venues, and professional caterers. Built with Next.js 16, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL, and Razorpay test-mode integration.

---

## 🛠️ Windows Development Setup (PowerShell)

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v15+) installed locally or via Docker

### 1. Environment Configuration
Copy `.env.example` to `.env`:
```powershell
Copy-Item .env.example .env
```
Update `DATABASE_URL` in your `.env` file with your PostgreSQL connection string.

### 2. Install Dependencies
```powershell
npm install
```

### 3. Database Migration & Seeding
Run Prisma migrations and seed the database with realistic Indian wedding venues and caterers (Mumbai, Jaipur, Delhi):
```powershell
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run Development Server
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Test Accounts (Seeded)
- **Customer:** `customer@shaadisthal.com` / `Password123!`
- **Venue Manager:** `manager@thepalace.com` / `Password123!`
- **Caterer:** `chef@royaldelights.com` / `Password123!`
- **Admin:** `admin@shaadisthal.com` / `Password123!`

---

## 💳 Razorpay Test Mode Setup
1. Sign up for a free developer account at [razorpay.com](https://razorpay.com).
2. Generate Test API Keys from your dashboard.
3. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to your `.env` file.
4. Test bookings initiate verified advance payments (e.g. 25% advance) securely with server-side signature verification.
