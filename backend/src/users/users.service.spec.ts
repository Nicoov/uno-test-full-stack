/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';


const mockUser = {
  id: 'user-1',
  name: 'Nicolas',
  run: '12345678-9',
  createdAt: new Date(),
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return existing user if RUN and name match', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);

    const result = await service.findOrCreate({ name: 'Nicolas', run: '12345678-9' });
    expect(result).toEqual(mockUser);
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it('should throw ConflictException if RUN exists with different name', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);

    await expect(
      service.findOrCreate({ name: 'Pedro', run: '12345678-9' }),
    ).rejects.toThrow(ConflictException);
  });

  it('should create user if RUN does not exist', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
    jest.spyOn(prisma.user, 'create').mockResolvedValue(mockUser);

    const result = await service.findOrCreate({ name: 'Nicolas', run: '12345678-9' });
    expect(result).toEqual(mockUser);
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
  });

  it('should find user by RUN', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);

    const result = await service.findByRun('12345678-9');
    expect(result).toEqual(mockUser);
  });
});
