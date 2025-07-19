import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class createCarDto {
  @IsNotEmpty()
  brand: string

  @IsInt()
  year: number

  @IsNotEmpty()
  model: string
}