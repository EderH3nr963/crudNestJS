import { Injectable } from "@nestjs/common";
import { CarEntity } from "./car.entity";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { createCarDto, findByBrandDto, updateCarDto } from "./dto";

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>
  ) { }

  async update(dto: updateCarDto): Promise<Boolean> {
    try {
      await this.carRepository.update({ id: dto.id }, { brand: dto.brand, year: dto.year, model: dto.model });

      return true
    } catch {
      return false
    }
  }

  async create(dto: createCarDto): Promise<CarEntity> {
    try {
      const car = await this.carRepository.save({
        brand: dto.brand,
        year: dto.year,
        model: dto.model,
      })

      return car;
    } catch (error) {
      throw new Error('Erro ao criar o carro');
    }
  }

  async findAll(): Promise<CarEntity[]> {
    try {
      return await this.carRepository.find();
    } catch (error) {
      throw new Error('Erro ao buscar os carros');
    }
  }

  async findByBrand(dto: findByBrandDto): Promise<CarEntity[]> {
    try {
      return await this.carRepository.findBy({ brand: dto.brand })
    } catch (error) {
      throw new Error('Erro ao buscar os carros');
    }
  }

  async findById(dto: { id: number }): Promise<CarEntity | null> {
    try {
      return await this.carRepository.findOneBy({ id: dto.id })
    } catch (error) {
      throw new Error('Erro ao buscar os carros');
    }
  }

  async deleteById(dto: { id: number }): Promise<true | false> {
    try {
      await this.carRepository.delete({ id: dto.id })

      return true;
    } catch {
      return false;
    }
  }
}