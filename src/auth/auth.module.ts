import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTstrategy } from './jwt_strategy';

@Module({
  imports: [ConfigModule.forRoot(),
  JwtModule.register({
    secret: process.env.JWT_secreat,
    signOptions: {
      expiresIn: 3600
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, JWTstrategy],
  exports: [JWTstrategy]
})
export class AuthModule { }
