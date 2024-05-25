import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeModule } from './coffe/coffe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    CoffeModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      // it dosen't really matter if we specify the path here if we previoulsy set the path in dot.config earlier(like in the data-source)
      // envFilePath:
      //   process.env.NODE_ENV == 'development'
      //     ? '.env.development'
      //     : '.env.production',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
