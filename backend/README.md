# Backend — UNO AFP CHALLENGE

NestJS API for the UNO AFP challenge.

## Tech Stack

- NestJS 11
- TypeScript 5
- Prisma ORM 5.22
- PostgreSQL
- Axios
- Jest 30

## Project Structure
```
backend/
├── src/
│   ├── prisma/
│   │   ├── prisma.module.ts    # Global Prisma module
│   │   └── prisma.service.ts   # Prisma client
│   ├── users/
│   │   ├── dto/
│   │   │   └── create-user.dto.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── deck/
│   │   ├── deck.interface.ts
│   │   ├── deck.controller.ts
│   │   ├── deck.module.ts
│   │   └── deck.service.ts
│   ├── games/
│   │   ├── dto/
│   │   │   └── create-game.dto.ts
│   │   ├── games.controller.ts
│   │   ├── games.module.ts
│   │   └── games.service.ts
│   ├── app.module.ts
│   └── main.ts
└── prisma/
    └── schema.prisma
```

## Running Locally
```bash
npm install
npx prisma migrate dev
npm run start:dev
```

API runs at `http://localhost:3001`

## Environment Variables
```env
DATABASE_URL="postgresql://postgres:secret@localhost:5432/memorygame"
PORT=3001
IMAGES_API_URL="https://challenge-uno.vercel.app/api/images"
FRONTEND_URL="http://localhost:3000"
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create or retrieve user by RUN |
| GET | `/api/deck` | Get shuffled card deck |
| POST | `/api/games` | Save game result |
| GET | `/api/games/history?run=:run` | Get game history by RUN |

## Running Tests
```bash
npm test          # run once
npm run test:cov  # with coverage
```

## Key Design Decisions

- **PrismaModule marked @Global** — avoids re-importing across modules
- **Deck built server-side** — images fetched, shuffled and paired in backend
- **ConflictException** — thrown when RUN is registered with a different name
- **ValidationPipe** — automatic DTO validation on all endpoints
- **Prisma v5** — v7 has breaking changes not worth adopting for this challenge