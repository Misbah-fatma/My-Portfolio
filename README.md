# Misbah Fatma — Portfolio

Personal portfolio for **Misbah Fatma**, Full-Stack Engineer (New Delhi). A MERN app: MongoDB, Express, React, and Node.js. The React site loads profile, projects, skills, and experience from a REST API. Contact messages are saved in MongoDB and emailed with Resend.

If MongoDB is down, the API serves in-memory seed data so local development still works.

## Stack

| Layer | Tech |
| --- | --- |
| Frontend | React 19, Vite 6 |
| Backend | Node.js (ESM), Express |
| Database | MongoDB + Mongoose |
| Email | Resend HTTP API |

**Ports (local):** client `5173` · API `5001`

## Requirements

- **Node.js 18+** (Vite 6 needs it; `nvm use 20` works well)
- Optional: MongoDB on `mongodb://127.0.0.1:27017`

## Project layout

```
portfolio/
├── client/          # React + Vite
│   ├── .env         # VITE_API_URL
│   └── src/
└── server/          # Express API
    ├── .env         # Mongo, CORS, Resend
    └── src/
```

## Setup

### 1. Install

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Environment

**Server** — copy and edit `server/.env`:

```bash
cp server/.env.example server/.env
```

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (default `5001`) |
| `MONGODB_URI` | Mongo connection string |
| `CLIENT_ORIGIN` | Frontend URL for CORS (comma-separate for local + live) |
| `CONTACT_TO` | Inbox for contact form mail |
| `RESEND_FROM` | From address (use Resend test domain until you verify yours) |
| `RESEND_API_KEY` | Resend API key |

**Client** — copy and edit `client/.env`:

```bash
cp client/.env.example client/.env
```

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Backend API base URL |

Local:

```env
VITE_API_URL=http://localhost:5001/api
```

Production (example):

```env
VITE_API_URL=https://your-api.onrender.com/api
```

Restart Vite after changing `VITE_*` vars. Rebuild the client for production so the URL is baked in.

### 3. Run locally

Two terminals:

```bash
# Terminal 1 — API
cd server
npm run dev
```

```bash
# Terminal 2 — client (Node 18+)
cd client
nvm use 20   # if needed
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Seed data (optional)

With Mongo running:

```bash
cd server
npm run seed
```

On first boot with an empty database, the API also seeds automatically from `server/src/data/seedData.js`.

Edit that file to update profile, projects, skills, or experience, then run `npm run seed` again.

## Contact form

`POST /api/contact` stores the message in MongoDB and sends email via Resend.

1. Create a key at [resend.com/api-keys](https://resend.com/api-keys)
2. Set `RESEND_API_KEY` in `server/.env`
3. Keep `CONTACT_TO` as your inbox

Until you verify a domain, use `Portfolio <beth.t@example.com>`. Resend’s test domain only delivers to the email on your Resend account — sign up with the same address as `CONTACT_TO`.

Messages are still saved if email fails; check the server logs for Resend errors.

## API

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/api/health` | `mongo` or `memory` mode |
| `GET` | `/api/profile` | Name, bio, stats, socials, education |
| `GET` | `/api/projects` | Sorted project list |
| `GET` | `/api/projects/:slug` | Single project |
| `GET` | `/api/skills` | Skill groups |
| `GET` | `/api/experience` | Work history |
| `POST` | `/api/contact` | `{ name, email, project?, budget?, message }` |

## Deploy

1. **API** — set `MONGODB_URI`, `CLIENT_ORIGIN` to your live frontend URL, and Resend vars. Start with `npm start` in `server/`.
2. **Client** — set `VITE_API_URL` to your live API (`https://…/api`), then:

```bash
cd client
npm run build
```

Host `client/dist` (Vercel, Netlify, etc.), **or** serve it from Express: after building the client, `npm start` in `server/` serves `client/dist` when that folder exists.

Example CORS for local + production:

```env
CLIENT_ORIGIN=http://localhost:5173,https://your-site.vercel.app
```

## Scripts

| Where | Command | What it does |
| --- | --- | --- |
| `server` | `npm run dev` | API with nodemon |
| `server` | `npm start` | API production |
| `server` | `npm run seed` | Reset and seed Mongo collections |
| `client` | `npm run dev` | Vite dev server |
| `client` | `npm run build` | Production build → `client/dist` |
| `client` | `npm run preview` | Preview the production build |

## License

Personal portfolio — all rights reserved.
