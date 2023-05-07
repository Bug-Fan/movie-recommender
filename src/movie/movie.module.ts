import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';

import { MovieController } from './movie.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TMDBConfig } from 'src/movie/TMDBConfig';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [MovieController],
  providers: [{ provide: 'TMDBConfig', useClass: TMDBConfig }, MovieService],
})

export class MovieModule { }
