import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class RegisterDTO {

  @IsNotEmpty()
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}