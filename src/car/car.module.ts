
import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarEntity } from './car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarEntity]),
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule { }
