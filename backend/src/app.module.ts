import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { DeckModule } from './deck/deck.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    DeckModule,
    GamesModule,
  ],
})
export class AppModule {}
