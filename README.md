# MyMaldives.ai

AI-powered Maldives luxury resort booking agent. Chat with a friendly AI travel advisor that recommends resorts and can send booking inquiry emails.

## Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS v4 (Cloudflare Pages)
- **Backend**: Hono on Cloudflare Workers
- **Auth**: Clerk (Google/Facebook/Instagram OAuth for personalization)
- **AI**: Cloudflare Workers AI (Llama 3.1 8B)
- **Database**: Cloudflare D1 (SQLite)
- **Email**: Resend

## Setup

### Prerequisites

- Node.js 18+
- Cloudflare account
- Clerk account (clerk.com)
- Resend account (resend.com)

### Worker (Backend)

```bash
cd worker
npm install

# Create .dev.vars with your secrets
cat > .dev.vars << EOF
CLERK_SECRET_KEY=sk_test_...
CLERK_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
EOF

# Set up local D1
npx wrangler d1 execute mymaldives-db --local --file=./schema.sql
npx wrangler d1 execute mymaldives-db --local --file=./seed.sql

# Run dev server
npm run dev
```

### Frontend

```bash
cd frontend
npm install

# Create .env.local
echo "VITE_CLERK_PUBLISHABLE_KEY=pk_test_..." > .env.local

# Run dev server
npm run dev
```

### Deploy

```bash
# Worker
cd worker
npx wrangler secret put CLERK_SECRET_KEY
npx wrangler secret put CLERK_PUBLISHABLE_KEY
npx wrangler secret put RESEND_API_KEY
npx wrangler d1 execute mymaldives-db --remote --file=./schema.sql
npx wrangler d1 execute mymaldives-db --remote --file=./seed.sql
npx wrangler deploy

# Frontend
cd frontend
npm run build
npx wrangler pages deploy dist/ --project-name=mymaldives
```
