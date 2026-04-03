/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConflictException } from '@nestjs/common';

const mockUser = {
  id: 'user-1',
  name: 'Nicolas',
  run: '12345678-9',
  createdAt: new Date(),
};

describe('UsersController', () => {
 let controller: UsersController;
 let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOrCreate: jest.fn(),
            findByRun: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user on findOrCreate', async () => {
    jest.spyOn(service, 'findOrCreate').mockResolvedValue(mockUser);

    const result = await controller.findOrCreate({ name: 'Nicolas', run: '12345678-9' });
    expect(result).toEqual(mockUser);
    expect(service.findOrCreate).toHaveBeenCalledWith({ name: 'Nicolas', run: '12345678-9' });
  });

  it('should throw ConflictException on duplicate RUN', async () => {
    jest.spyOn(service, 'findOrCreate').mockRejectedValue(new ConflictException());

    await expect(
      controller.findOrCreate({ name: 'Pedro', run: '12345678-9' }),
    ).rejects.toThrow(ConflictException);
  });

  it('should return user by RUN', async () => {
    jest.spyOn(service, 'findByRun').mockResolvedValue(mockUser);

    const result = await controller.findByRun('12345678-9');
    expect(result).toEqual(mockUser);
    expect(service.findByRun).toHaveBeenCalledWith('12345678-9');
  });
});
