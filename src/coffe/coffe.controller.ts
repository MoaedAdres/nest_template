import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CoffeService } from './coffe.service';
import { CreateCoffeDto } from './dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ConfigService } from '@nestjs/config';
@Controller('coffe')
export class CoffeController {
  constructor(
    private readonly coffeService: CoffeService,
    readonly configService: ConfigService,
  ) {}

  @Post()
  create(
    @Body() createCoffeDto: CreateCoffeDto,
    @Query('isRecomended') isRecomended: boolean,
  ) {
    return this.coffeService.create(createCoffeDto, isRecomended);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    throw new HttpException(
      {
        message: 'Custom Message',
        error: 'Custom Error',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
      {
        cause: 'NO Cause',
      },
    );
    return this.coffeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coffeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCoffeDto: UpdateCoffeDto,
    @Query('isRecomended') isRecomended: boolean,
  ) {
    return this.coffeService.update(id, updateCoffeDto, isRecomended);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeService.remove(id);
  }
}
