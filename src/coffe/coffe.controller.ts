import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoffeService } from './coffe.service';
import { CreateCoffeDto } from './dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto';

@Controller('coffe')
export class CoffeController {
  constructor(private readonly coffeService: CoffeService) {}

  @Post()
  create(@Body() createCoffeDto: CreateCoffeDto) {
    return this.coffeService.create(createCoffeDto);
  }

  @Get()
  findAll() {
    return this.coffeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coffeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeDto: UpdateCoffeDto) {
    return this.coffeService.update(+id, updateCoffeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeService.remove(+id);
  }
}
