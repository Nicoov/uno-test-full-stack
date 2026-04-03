/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreate(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { run: dto.run },
    });

    if (existing) {
      if (existing.name !== dto.name) {
        throw new ConflictException('Este RUN ya está registrado con otro nombre');
      }
      return existing;
    }

    return this.prisma.user.create({
      data: {
        name: dto.name,
        run: dto.run,
      },
    });
  }

  async findByRun(run: string) {
    return await this.prisma.user.findUnique({
      where: { run },
    });
  }
}
