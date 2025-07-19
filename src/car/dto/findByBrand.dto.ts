import { IsNotEmpty } from 'class-validator';

export class findByBrandDto {
  @IsNotEmpty()
  brand: string
}