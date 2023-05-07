import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { LoginUserDTO } from "src/DTOs/request/LoginUser.dto";
import { RegisterDTO } from "src/DTOs/request/RegisterUser.dto";

export class ToLowerCasePipe implements PipeTransform {
  transform(value: LoginUserDTO | RegisterDTO, metadata: ArgumentMetadata) {

    return Object.assign(value, { email: String(value.email).toLowerCase(), password: value.password });
  }
}