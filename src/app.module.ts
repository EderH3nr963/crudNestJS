import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarService } from './car/car.service';
import { CarController } from './car/car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './car/car.module';
import { CarEntity } from './car/car.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',         // ou o IP do container Docker, ex: '172.17.0.2'
      port: 3306,
      username: 'root',
      password: 'SENHA',  // sua senha do container
      database: 'crudNestJS',
      entities: [CarEntity],
      synchronize: true,         // cuidado com `true` em produção
    }),
    CarModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
