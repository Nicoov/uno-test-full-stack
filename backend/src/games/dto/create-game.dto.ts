/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsInt, Min } from 'class-validator';

export class CreateGameDto {
  @IsString()
  userId: string;

  @IsInt()
  @Min(0)
  matches: number;

  @IsInt()
  @Min(0)
  errors: number;

  @IsInt()
  @Min(0)
  duration: number;
}