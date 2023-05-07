import { Controller, Get, UseGuards, Post, Body, UsePipes, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { LoginUserDTO } from 'src/DTOs/request/LoginUser.dto';
import { RegisterDTO } from 'src/DTOs/request/RegisterUser.dto';
import { ToLowerCasePipe } from 'src/pipes/ToLowerCase.pipe';
import { AuthService } from './auth.service';

@UsePipes(ToLowerCasePipe)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  
  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO) {
    console.log(registerDTO);
    return await this.authService.registerUser(registerDTO)
  }
  @Post('/login')
  async login(@Body() loginDTO: LoginUserDTO) {
    return await this.authService.loginUser(loginDTO)
  }

}
