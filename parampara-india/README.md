# Parampara India CRM

A full-stack CRM built with Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, Prisma, PostgreSQL, and NextAuth v5.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, shadcn/ui (New York style) |
| Database | PostgreSQL 16, Prisma 5.x ORM |
| Auth | NextAuth v5 (Auth.js) — Credentials + JWT |
| Forms | React Hook Form + Zod v4 validation |
| State | Server Components + `useSession` / `useRouter` |
| Toasts | Sonner |

## Getting Started

### Prerequisites

- Node.js ≥ 22
- PostgreSQL 16 (via Homebrew on macOS)
- npm

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL
brew services start postgresql@16

# 3. Create database
createdb parampara_crm

# 4. Set environment variables
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL and AUTH_SECRET

# 5. Push schema to database
npm run db:push

# 6. Seed admin user
npx tsx prisma/seed.ts

# 7. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Admin credentials:** `admin@paramparaindia.in` / `admin123`

### Useful Scripts

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run format       # Prettier
npm run db:studio    # Prisma Studio (visual DB browser)
npm run db:push      # Push schema changes
npm run db:migrate   # Create migration
```

---

## Project Structure

```
parampara-india/
├── app/
│   ├── (auth)/                 # Auth pages (login, signup)
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/            # CRM dashboard
│   │   ├── layout.tsx          # Auth gate + sidebar shell
│   │   └── admin/
│   │       ├── layout.tsx      # Sidebar + TopNavbar
│   │       ├── page.tsx        # Dashboard home (stats)
│   │       ├── contacts/       # CRUD for contacts
│   │       ├── leads/          # CRUD for leads
│   │       └── enquiries/      # CRUD for enquiries
│   ├── (marketing)/            # Public marketing site
│   │   ├── layout.js           # Navbar + Footer
│   │   ├── page.js             # Home page
│   │   ├── contact/page.tsx    # Contact form → CRM
│   │   ├── products/
│   │   ├── quiz/
│   │   ├── faq/
│   │   └── videos/
│   ├── api/                    # REST API routes
│   │   ├── auth/               # NextAuth endpoints
│   │   ├── contacts/           # GET/POST, GET/PATCH/DELETE /:id
│   │   ├── leads/              # GET/POST, GET/PATCH/DELETE /:id
│   │   └── enquiries/          # GET/POST, GET/PATCH/DELETE /:id
│   │       └── public/         # POST (no auth — marketing forms)
│   └── layout.tsx              # Root layout (fonts, GA, Providers)
├── components/
│   ├── common/                 # Shared UI (stats-card, search-bar, etc.)
│   ├── layout/                 # Sidebar, TopNavbar, UserMenu
│   └── ui/                     # shadcn/ui components
├── features/
│   ├── contacts/components/    # Contact form
│   ├── leads/components/       # Lead form
│   └── enquiries/components/   # Enquiry form
├── lib/                        # Utilities, auth config, prisma client
├── repositories/               # Data access layer (Prisma queries)
├── services/                   # Business logic layer
├── types/                      # Shared TypeScript types
├── hooks/                      # Custom React hooks
└── prisma/
    ├── schema.prisma           # Database schema
    └── seed.ts                 # Seed script
```

---

## Architecture Flow

### Request Lifecycle

```
Browser → Next.js Route Handler / Server Component
  → Service Layer (business logic)
    → Repository Layer (Prisma queries)
      → PostgreSQL
```

Each CRM module follows a **3-layer architecture**:

1. **Route/Page** — handles HTTP, auth, params
2. **Service** — validates, orchestrates, calls repository
3. **Repository** — Prisma queries only

### Authentication Flow

```
┌─────────┐    POST /api/auth/credentials    ┌──────────┐
│  Login   │ ──────────────────────────────→ │ NextAuth  │
│  Page    │ ←────────────────────────────── │ Handler   │
└─────────┘    JWT token in cookie          └──────────┘
                                                        │
                              ┌──────────────────────────┘
                              ▼
                    ┌──────────────────┐
                    │  Session Cookie  │  (HttpOnly, Secure)
                    │  JWT strategy    │
                    └──────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
  Server Components    Client Components     API Routes
  auth() → session     useSession()          auth() → session
```

- **Server Components**: call `auth()` to get session
- **Client Components**: use `useSession()` from `SessionProvider`
- **API Routes**: call `auth()` to verify, return 401 if missing

### Dashboard Layout

```
┌──────────────────────────────────────────────┐
│  Root Layout (Providers, SessionProvider)     │
│  ┌──────────────────────────────────────────┐ │
│  │  (dashboard)/layout.tsx                  │ │
│  │  auth() check → redirect /login          │ │
│  │  ┌──────────────────────────────────────┐│ │
│  │  │  admin/layout.tsx                    ││ │
│  │  │  ┌────────┬─────────────────────────┐││ │
│  │  │  │Sidebar │  TopNavbar              │││ │
│  │  │  │        │  (breadcrumbs, user,    │││ │
│  │  │  │  CRM   │   theme toggle)         │││ │
│  │  │  │  Nav   ├─────────────────────────┤││ │
│  │  │  │        │  Page Content           │││ │
│  │  │  │        │  (Server Component)     │││ │
│  │  │  └────────┴─────────────────────────┘││ │
│  │  └──────────────────────────────────────┘│ │
│  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

---

## Data Model

```
┌──────────┐       ┌──────────┐       ┌──────────┐
│   User   │──────→│ Contact  │←──────│   Lead   │
│          │       │          │       │          │
│  role    │       │ firstName│       │ title    │
│  email   │       │ lastName │       │ status   │
│  password│       │ email    │       │ value    │
└──────────┘       │ phone    │       │ source   │
       │           │ company  │       └──────────┘
       │           │ tags     │            │
       │           └──────────┘            │
       │                │                  │
       │           ┌──────────┐            │
       └──────────→│ Enquiry  │←───────────┘
                   │          │
                   │ name     │  1:1 with Lead
                   │ message  │  (optional)
                   │ status   │
                   │ type     │
                   └──────────┘
```

### Relationships

| Relationship | Type | Description |
|-------------|------|-------------|
| User → Contact | 1:N | Each user owns their contacts |
| User → Lead | 1:N | Each user owns their leads |
| User → Enquiry | 1:N | Each user owns their enquiries |
| Contact → Lead | 1:N | A contact can have multiple leads |
| Contact → Enquiry | 1:N | A contact can have multiple enquiries |
| Enquiry → Lead | 1:1 | An enquiry can convert to one lead |

### Enums

| Enum | Values |
|------|--------|
| **Role** | `ADMIN`, `MANAGER`, `STAFF` |
| **LeadStatus** | `NEW` → `CONTACTED` → `QUALIFIED` → `PROPOSAL` → `NEGOTIATION` → `WON` / `LOST` |
| **LeadSource** | `WEBSITE`, `REFERRAL`, `COLD_CALL`, `ADVERTISEMENT`, `SOCIAL_MEDIA`, `OTHER` |
| **EnquiryStatus** | `PENDING` → `IN_PROGRESS` → `RESOLVED` → `CLOSED` |
| **EnquiryType** | `GENERAL`, `PRODUCT`, `PRICING`, `SUPPORT`, `PARTNERSHIP`, `OTHER` |

---

## CRM Module Flows

### Contacts Flow

```
Marketing Site ──→ /api/enquiries/public ──→ Enquiry (auto-created)
                                                    │
                                                    ▼
Dashboard ──→ /admin/contacts ──→ Contact Detail ──→ Edit / Delete
     │              │                    │
     │         Search + Filter      Linked Leads
     │              │              Linked Enquiries
     ▼              ▼
  Create        List View
  Form          (cards)
```

**Pages:**
- `/admin/contacts` — list with search + pagination
- `/admin/contacts/new` — create form
- `/admin/contacts/:id` — detail view
- `/admin/contacts/:id/edit` — edit form

**API:**
- `GET /api/contacts` — list (paginated, searchable)
- `POST /api/contacts` — create
- `GET /api/contacts/:id` — detail (includes leads + enquiries)
- `PATCH /api/contacts/:id` — update
- `DELETE /api/contacts/:id` — delete

### Leads Flow

```
                    ┌───────────────────┐
                    │  Lead Pipeline    │
                    │                   │
New ──→ Contacted ──→ Qualified ──→ Proposal ──→ Negotiation
 │                                                    │
 │                                    ┌───────────────┘
 │                                    ▼
 │                               Won / Lost
 │                          (sets closedAt)
 └──→ Can be created from Contact page
      or standalone from /admin/leads/new
```

**Pages:**
- `/admin/leads` — list with search + pagination
- `/admin/leads/new` — create form (title, value, status, source)
- `/admin/leads/:id` — detail view
- `/admin/leads/:id/edit` — edit form

**API:**
- `GET /api/leads` — list (paginated, searchable, filterable by status)
- `POST /api/leads` — create
- `GET /api/leads/:id` — detail
- `PATCH /api/leads/:id` — update (including status change)
- `DELETE /api/leads/:id` — delete

### Enquiries Flow

```
Marketing Site                    Dashboard
     │                               │
     ▼                               ▼
/contact form ──→ POST /api/enquiries/public ──→ Enquiry (PENDING)
                                                         │
                                                         ▼
                                              /admin/enquiries
                                                         │
                                                   ┌─────┴─────┐
                                                   ▼           ▼
                                              Status Drop    Edit/Delete
                                              (inline PATCH)
                                                   │
                                          Pending → In Progress
                                              → Resolved → Closed
```

**Pages:**
- `/admin/enquiries` — list with search + pagination
- `/admin/enquiries/new` — create form
- `/admin/enquiries/:id` — detail with inline status dropdown
- `/admin/enquiries/:id/edit` — edit form

**API:**
- `GET /api/enquiries` — list (paginated, searchable)
- `POST /api/enquiries` — create (requires auth)
- `POST /api/enquiries/public` — create from marketing site (no auth)
- `GET /api/enquiries/:id` — detail
- `PATCH /api/enquiries/:id` — update (including status)
- `DELETE /api/enquiries/:id` — delete

---

## API Reference

All authenticated endpoints require a valid session cookie. The public endpoint (`/api/enquiries/public`) has no auth requirement.

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### Error Format

```json
{
  "success": false,
  "error": {
    "message": "Contact not found",
    "status": 404
  }
}
```

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://root@localhost:5432/parampara_crm` |
| `AUTH_SECRET` | NextAuth encryption secret | Random 32+ char string |
| `NEXTAUTH_URL` | App URL for auth callbacks | `http://localhost:3000` |

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| JWT sessions (not DB sessions) | Simpler setup, no session table needed |
| Prisma 5.x (not 7.x) | Node.js v22.2.0 compatibility |
| `defaultTheme="light"` | Prevents black overlay from system dark mode |
| ThemeProvider at root | Dashboard gets dark mode toggle, marketing stays light |
| Public enquiry endpoint | Marketing forms submit without auth |
| Repository pattern | Clean separation of Prisma queries from business logic |
| Forms in `features/` | Co-located with their module, reusable for create + edit |
