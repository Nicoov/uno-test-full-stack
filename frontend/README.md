# Frontend — UNO AFP CHALLENGE

Next.js 16 application for the UNO AFP challenge.

## Tech Stack

- Next.js 16.2.2
- React 19
- TypeScript 5
- Tailwind CSS 4
- Axios 1.14
- Vitest 4 + Testing Library

## Project Structure
```
frontend/
├── app/
│   ├── login/page.tsx       # Identify page
│   └── game/page.tsx        # Game page
├── components/
│   ├── Board.tsx            # Card grid
│   ├── Card.tsx             # Single card with flip animation
│   ├── ScoreBoard.tsx       # Matches and errors counter
│   ├── History.tsx          # Past games table
│   ├── Game.tsx             # Main game component
│   └── Modal.tsx            # Finish modal
├── hooks/
│   └── useGame.ts           # All game logic
├── service/
│   └── api.ts               # Backend API calls
├── types/
│   └── index.ts             # Shared interfaces
└── utils/
    └── validateRun.ts       # RUN format validation
```

## Running Locally
```bash
pnpm install
pnpm dev
```

App runs at `http://localhost:3000`

## Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Running Tests
```bash
pnpm test           # run once
pnpm test:watch     # watch mode
pnpm test:coverage  # with coverage
```

## Key Design Decisions

- **useGame hook** — all game logic isolated here, components are purely presentational
- **localStorage** — persists user identity across page refreshes
- **RUN validation** — format `12345678-9` validated on frontend and backend