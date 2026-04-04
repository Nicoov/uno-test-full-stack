# UNO AFP CHALLENGE

Full-stack implementation of the classic Memory / Concentration card game, built as a technical challenge for UNO AFP.

---

## Description

Users identify themselves with their name and RUN (Chilean ID), then play a card matching game. All results are persisted and users can consult their history of past games.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | NestJS 11, TypeScript, Prisma 5 |
| Database | PostgreSQL 16 |
| Testing | Vitest (frontend), Jest (backend) |
| DevOps | Docker, GitHub Actions |

---

## Project Structure
```
/
├── frontend/          # Next.js 16 app
├── backend/           # NestJS API
├── docker-compose.yml
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Architecture Decisions

### Frontend
- **useGame hook** — all game logic isolated here, components are purely presentational and easy to test
- **localStorage** — persists user identity across page refreshes without requiring authentication
- **Centralized service layer** — all API calls go through `service/api.ts`
- **RUN validation** — Chilean ID format validated on both frontend and backend

### Backend
- **Modular NestJS architecture** — `UsersModule`, `DeckModule`, `GamesModule`
- **Deck built server-side** — images fetched from external API, shuffled and paired in the backend
- **Global PrismaModule** — single database connection shared across all modules
- **ConflictException** — thrown when a RUN is registered with a different name
- **Prisma v5** — chosen over v7 due to breaking changes not worth adopting for this challenge

---

## Running Locally

### Prerequisites
- Node.js 20+
- Docker

### 1. Clone the repository
```bash
git clone https://github.com/your-username/uno-test-full-stack.git
cd uno-test-full-stack
```

### 2. Start the database
```bash
docker compose up db -d
```

### 3. Backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run start:dev
```

### 4. Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

Open `http://localhost:3000`

---

## Running with Docker
```bash
docker compose up --build
```

Open `http://localhost:3000`

---

## Running Tests

### Frontend
```bash
cd frontend
pnpm test
pnpm test:coverage
```

### Backend
```bash
cd backend
npm test
npm run test:cov
```

---

## GitHub Workflow

### Branch Strategy
```
main          ← production, no direct commits
  └── develop ← integration branch
        ├── feature/frontend-game
        ├── feature/backend-core
        ├── feature/docker-config
        └── feature/ci-setup
```

### CI Pipeline
GitHub Actions runs on every PR:
- ESLint
- Unit tests

---

## Interface Design

### Identify Page (`/login`)
```
┌─────────────────────┐
│   Memory Game 🐾    │
│                     │
│  Nombre             │
│  [____________]     │
│                     │
│  RUN                │
│  [____________]     │
│                     │
│     [ Jugar ]       │
└─────────────────────┘
```

### Game Page (`/game`)
```
Memory Game 🐾              [Salir]

  Aciertos: 3/8    Errores: 2

┌──┐ ┌──┐ ┌──┐ ┌──┐
│🐾│ │🐾│ │🐾│ │🐾│
└──┘ └──┘ └──┘ └──┘
┌──┐ ┌──┐ ┌──┐ ┌──┐
│🐾│ │🐾│ │🐾│ │🐾│
└──┘ └──┘ └──┘ └──┘

Historial de partidas
┌──────────┬──────────┬────────┬──────────┐
│  Fecha   │ Aciertos │ Errores│ Duración │
├──────────┼──────────┼────────┼──────────┤
│ 04-04-26 │    8     │   3    │   45s    │
└──────────┴──────────┴────────┴──────────┘
```