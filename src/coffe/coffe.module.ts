import { Module } from '@nestjs/common';
import { CoffeService } from './coffe.service';
import { CoffeController } from './coffe.controller';

@Module({
  controllers: [CoffeController],
  providers: [CoffeService],
})
export class CoffeModule {}
