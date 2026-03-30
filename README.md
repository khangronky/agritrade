# AgriTrade

AgriTrade is a transparent agriculture marketplace and market-intelligence platform for farmers, traders, and buyers. The product is designed to help participants compare offers, follow market signals, manage crop listings, and make trading decisions with better visibility.

## What AgriTrade Does

- Surface live-style market pricing, demand signals, and regional crop trends
- Give farmers and traders a workspace to manage products and marketplace listings
- Support account onboarding for different participant roles such as `farmer` and `trader`
- Provide public profile pages, community posting, and basic networking flows
- Use Supabase for authentication, user profile data, and media storage

## Current Product Areas

### Public Marketing Experience

- Landing page with platform overview and signup CTA
- Market page with live price board, demand signals, exchange flows, and forecast-driven trend views
- About page with company narrative and product direction
- Community forum page with feed-style posts

### Authentication And Onboarding

- Email/password registration and login
- OTP verification and password reset flows
- Guided onboarding with role selection
- Username availability checks

### Authenticated Workspace

- Dashboard with crop metrics, trend visualization, forecast summaries, and price boards
- Marketplace browser with filters, listing details, and inquiry actions
- Products workspace for creating, editing, publishing, and archiving crop records
- Profile pages with editable personal details and avatar uploads

### Backend Capabilities

- Supabase Auth integration for user sessions
- Supabase Postgres tables and views for users and user profiles
- Supabase Storage support for avatar uploads
- Route handlers for auth, profile updates, countries lookup, forum posts, and uploads

## Tech Stack

- **Framework:** [Next.js 16.2.1](https://nextjs.org/) with App Router
- **UI:** [React 19.2.4](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), and Radix-based primitives
- **Runtime / Package Manager:** [Bun](https://bun.sh/)
- **Backend:** [Supabase](https://supabase.com/) for Auth, Postgres, and Storage
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) + [TanStack Query](https://tanstack.com/query)
- **Forms and Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Charts and Visualization:** [Recharts](https://recharts.org/)
- **Linting and Formatting:** [Biome](https://biomejs.dev/)
- **Deployment Config:** [Vercel](https://vercel.com/)

## Project Structure

```text
src/
  app/
    (marketing)/     Public-facing pages
    (auth)/          Login, register, recovery flows
    (dashboard)/     Authenticated dashboard pages
    api/             Route handlers
  components/        Shared UI and feature components
  lib/               API clients, schema helpers, Supabase utilities
  providers/         App-level client providers
  stores/            Zustand stores
  types/             Shared TypeScript types
supabase/
  migrations/        Database migrations
  templates/         Auth email templates
```

## Getting Started

### Prerequisites

1. **Node.js** 20 or later
2. **Bun** - install from [bun.sh](https://bun.sh/)
3. **Docker Desktop** - required for local Supabase

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/agritrade.git
   cd agritrade
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start local Supabase:

   ```bash
   bun sb:start
   ```

4. Create `.env.local` from `.env.example` and fill in the local values reported by `bun sb:status`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=<Supabase URL>
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<Supabase publishable key>
   SUPABASE_SECRET_KEY=<Supabase secret key>
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. Run the development server:

   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

### Quick Start

To start local Supabase and the app together:

```bash
bun devx
```

## Environment Variables

The project currently expects these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY=YOUR_SUPABASE_SECRET_KEY
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Available Scripts

| Command | Description |
| --- | --- |
| `bun dev` | Start the Next.js development server |
| `bun devx` | Start Supabase, then run the app |
| `bun build` | Build the app for production |
| `bun start` | Start the production server |
| `bun type-check` | Run TypeScript build checking |
| `bun format` | Run Biome formatter |
| `bun format:fix` | Write formatting fixes |
| `bun lint` | Run Biome lint rules |
| `bun lint:fix` | Apply lint fixes |
| `bun format-and-lint` | Run full Biome checks |
| `bun format-and-lint:fix` | Apply Biome fixes |
| `bun sb:start` | Start local Supabase |
| `bun sb:stop` | Stop local Supabase |
| `bun sb:reset` | Reset local database and rerun migrations |
| `bun sb:typegen` | Generate local Supabase TypeScript types |
| `bun sbr:link` | Link to a remote Supabase project |
| `bun sbr:pull` | Pull remote schema |
| `bun sbr:push` | Push local schema to linked project |
| `bun sbr:sync` | Push then pull linked schema |
| `bun sbr:typegen` | Generate linked-project TypeScript types |

## Supabase Notes

- Local schema lives in `supabase/migrations`
- Current migrations focus on user accounts, onboarding status, profile data, and avatar storage
- The app includes a `user_full_view` database view for profile rendering
- Avatar uploads are handled through Supabase Storage and validated server-side

## Current Implementation Notes

- Authentication, onboarding, user profile management, and avatar upload flows are backed by Supabase
- Several marketplace and forum experiences currently use seeded or in-memory demo data for UI development
- Forecast and market insight views are implemented in the frontend and presented as product intelligence features
- The repository contains a Vercel config in `vercel.json` with extended duration for API routes
- A settings screen references a webhook URL, but there is no implemented `/api/webhooks/data` route in the current codebase

## Deployment Notes

- `vercel.json` disables automatic git-triggered deployments
- API route duration is configured for `src/app/api/**/*`
- Set production Supabase values and `NEXT_PUBLIC_APP_URL` in your deployment environment

## License

MIT
