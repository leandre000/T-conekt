# TalentConnect

Connect with global talent and opportunities. TalentConnect is a modern, full-stack platform for hiring, job search, networking, and community engagement.

---

## 🚀 Overview
TalentConnect is a professional platform for:
- **Talents**: Showcase skills, apply to jobs, join events, and connect with hirers.
- **Hirers**: Post jobs, manage applications, organize events, and find top talent.
- **Admins**: Manage users, jobs, and platform analytics.

---

## ✨ Features

### Authentication & Authorization
- Secure registration and login (NextAuth.js, JWT, OAuth)
- Role-based dashboards: Talent, Hirer, Admin
- Password hashing and session management

### Dashboards
- Personalized dashboards for each role
- Analytics: Applications over time, job stats, event participation (Recharts)
- Profile management and settings (theme, notifications)

### Jobs
- **Hirers**: Create, update, delete, and manage job postings
- **Talents**: Browse, search, and apply to jobs
- Application tracking and status updates

### Events
- Create, join, leave, and view events
- Event details, organizer info, and participant lists
- Modern event forms and participation charts

### Messaging
- Real-time chat (Socket.io)
- Conversation list, message history, and instant updates
- Responsive, accessible chat UI

### Notifications
- Bell icon dropdown with unread badge
- Mark as read, delete, and view all notifications
- Dedicated notifications page with pagination

### Admin Dashboard
- User and job management (view, delete, analytics)
- Detail modals for users and jobs
- Secure, role-restricted access

### Forum
- Thread list with search, tags, and pagination
- New thread modal/form
- Thread detail with replies, reply form, and moderation

### UI/UX & Branding
- Modern, responsive, and accessible design (Tailwind CSS)
- Theme toggle (dark/light)
- Custom logo, favicon, and color scheme
- Consistent feedback (toasts, modals, loading states)

---

## 🛠️ Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS, Recharts
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL
- **Auth**: NextAuth.js (JWT, OAuth)
- **Real-time**: Socket.io
- **UI**: Radix UI, Lucide Icons

---

## ⚡ Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-org/talent-connect.git
   cd talent-connect/talent-connect-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your secrets (see below).
4. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```
5. **Start the dev server:**
   ```bash
   npm run dev
   ```
6. **Visit:** [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — NextAuth.js secret
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — (optional) Google OAuth
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — (optional) GitHub OAuth
- `NEXT_PUBLIC_BASE_URL` — (for SSR API calls, e.g. `http://localhost:3000`)

---

## 🚀 Deployment
- Deploy easily to [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or your preferred platform.
- Set all environment variables in your deployment dashboard.
- Run `npx prisma migrate deploy` on your production database.

---

## 📸 Screenshots

> Add screenshots/gifs of the dashboard, jobs, events, messaging, notifications, admin, and forum for best presentation.

---

## 📄 License

[MIT](./LICENSE)

---

**TalentConnect — Connect. Collaborate. Succeed.**

## 🛡️ Admin Test Account

You can log in as an admin using the following credentials (for local development/testing):

- **Email:** leandre@gmail.com
- **Password:** leandre123
- **Password Hash (for DB):**
  ```
  $2b$12$D0UEGYhgZhal5P82F2hr0e57p7qhHYHQAdj5iiXWCIzYB72.NTxX6
  ```

Add this user to your database with the role `ADMIN` to access the admin dashboard at `/dashboard/admin`.