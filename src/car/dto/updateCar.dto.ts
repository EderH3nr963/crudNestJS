import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class updateCarDto {
  @IsInt()
  id: number

  @IsNotEmpty()
  brand: string

  @IsInt()
  year: number

  @IsNotEmpty()
  model: string
}