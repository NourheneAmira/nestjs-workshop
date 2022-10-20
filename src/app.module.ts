import { FirstMiddelwareMiddleware } from './middelwares/first-middelware.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
//import * as HelmetMiddeleware from 'helmet';
// fi kol module en fiat l appel a dotenv
import * as dotenv from 'dotenv';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1478963',
      database: 'nourhene',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'd333e7dd7b9d3a',
          pass: 'e7f2a1bd8631bb',
        },
      },
    }),

    UsersModule,
    CoursModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // cree un middelware personalise
    /// je doit implique se first middelware pour toutes les routes qui commence par todo
    consumer.apply(FirstMiddelwareMiddleware).forRoutes(
      {
        path: 'todos',
        method: RequestMethod.GET,
      },
      { path: 'todos* ', method: RequestMethod.GET },
    ); /*.apply(HelmetMiddeleware).forRoutes('')*/
    //forRoutes cad pour quelle route ce middelware sera applique
  }
}
