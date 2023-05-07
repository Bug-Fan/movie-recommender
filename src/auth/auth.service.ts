import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/database/Entities/Users.entity';
import { LoginUserDTO } from 'src/DTOs/request/LoginUser.dto';
import { RegisterDTO } from 'src/DTOs/request/RegisterUser.dto';
import { LoginResponseDTO } from 'src/DTOs/response/LoginResponse.dto';
import { RegisterResponseDTO } from 'src/DTOs/response/RegisterResponse.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthService {

  private userRepo: Repository<Users>;

  constructor(
    @Inject('datasource') dataSource: DataSource,
    private jwtService: JwtService
  ) {
    this.userRepo = dataSource.getRepository(Users);
  }

  public async loginUser(loginDTO: LoginUserDTO): Promise<LoginResponseDTO> {
    let { email, password } = loginDTO
    
    let User = await this.userRepo.findOne({
      where: {
        email
      }
    });

    if (User) {
      if (User.password === password) {
        let { email, id } = User;

        let token = this.jwtService.sign({ email, id })
        return new LoginResponseDTO(token);
      }
      else
        throw new BadRequestException("Invalid Email or Password");
    }
    else
      throw new BadRequestException("User account doesn't exists");
  }

  public async registerUser(registerDTO: RegisterDTO): Promise<RegisterResponseDTO> {
    let userEntity = this.userRepo.create(registerDTO)
    console.log("myentity ",userEntity);
    console.log(registerDTO);
    try {
      await this.userRepo.save(userEntity);
      return new RegisterResponseDTO(true, "You have been registered successfully")
    }
    catch (e) {

      if (e.code == '23505') {
        throw new ConflictException('User already exist.');
      }
      else {
        throw new BadRequestException(e.message);
      }
    }
  }

}
