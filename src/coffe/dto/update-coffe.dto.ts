import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeDto } from './create-coffe.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCoffeDto extends PartialType(CreateCoffeDto){}
