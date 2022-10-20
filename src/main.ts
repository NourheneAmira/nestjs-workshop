import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';


dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //global prefix of your applcation

  const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionSucccessStatus: 200
  };

  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.App_Port);
  console.log(process.env.App_Port);
}
bootstrap();
/* 
  
    // toute ressource differente d cette end point ne l accepteeer pas
    // c est l url de la partie
    // url du frontend https://localhost:000
    origin: ['https://localhost:3000'],
    
  }*/
