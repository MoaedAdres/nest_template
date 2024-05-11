import { Module } from '@nestjs/common';
import { CoffeService } from './coffe.service';
import { CoffeController } from './coffe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffe } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffe, Flavor, Event])],
  controllers: [CoffeController],
  providers: [CoffeService],
})
export class CoffeModule {}
