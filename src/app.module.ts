import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { LoggingIntercepter } from './Intercepters/logging.intercepter';
import { MovieModule } from './movie/movie.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client'),
  }), DatabaseModule, AuthModule, MovieModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_INTERCEPTOR,
    useClass: LoggingIntercepter,
  },],
})

export class AppModule{}

