import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() dto: CreateGameDto) {
    return this.gamesService.create(dto);
  }

  @Get('history')
  async getHistory(@Param('run') run: string) {
    return this.gamesService.getHistoryByRun(run);
  }
}
