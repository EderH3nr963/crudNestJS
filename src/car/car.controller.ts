
import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { CarService } from './car.service';
import type { createCarDto } from './dto';
import type { Request, Response } from 'express';

@Controller("/car")
export class CarController {
  constructor(private readonly carService: CarService) { }

  @Get()
  @Render("home")
  async ViewAll(@Res() res: Response) {
    const cars = await this.carService.findAll();

    if (!cars || cars.length < 1) {
      return { message: "Nenhum carro encontrado" }
    }

    return { cars }
  }

  @Get('brand/:brand')
  async findByBrand(@Param('brand') brand: string) {
    const cars = await this.carService.findByBrand({ brand });

    if (!cars || cars.length < 1) {
      return `Nenhum carro encontrado com a branch '${brand}'`
    }

    return { cars }
  }

  @Get("add_car")
  @Render("form_car")
  async CreateCarGet() { }

  @Post('add_car')
  @Render('form_car')
  async CreateCarPost(@Body() body: createCarDto) {
    const { year, brand, model } = body;

    if (!year || !brand || !model) {
      return { error: 'All field is required.' };
    }

    try {
      await this.carService.create({ year, brand, model });
      return { message: 'Car created successfully!' };
    } catch (error) {
      return { error: 'Error creating car.' };
    }
  }

  @Get("update/:id")
  @Render("form_car")
  async UpdateCarGet(@Param('id') id: number) {
    const car = await this.carService.findById({ id });

    if (!car) {
      return { error: "Car not found." };
    }

    return { car };
  }


  @Post('update/:id')
  @Render('form_car')
  async UpdateCarPost(@Body() body: createCarDto, @Param('id') id: number) {
    const { year, brand, model } = body;

    if (!year || !brand || !model) {
      return { error: 'All field is required.' };
    }

    try {
      await this.carService.update({ id, year, brand, model });
      return { message: 'Car updated with successfully!' };
    } catch (error) {
      return { error: 'Error updating car.' };
    }
  }

  @Get("delete/:id")
  async Delete(@Param("id") id: number, @Res() res: Response) {
    const response = await this.carService.deleteById({ id });

    if (!response) {
      res.redirect("/car");
      return { error: "Error deleting car! Try again more later." }
    }

    res.redirect("/car");
    return { message: "Car deleted successfully." }
  }
}
