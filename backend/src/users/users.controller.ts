/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async findOrCreate(@Body() dto: CreateUserDto) {
    return this.usersService.findOrCreate(dto);
  }

  @Get(':run')
  async findByRun(@Param('run') run: string) {
    return this.usersService.findByRun(run);
  }
}
