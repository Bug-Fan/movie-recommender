import { IsNotEmpty, IsNumber, ValidateIf } from 'class-validator'
import { plainToClass, Transform } from 'class-transformer'

export class MovieSearchDto {
  @IsNotEmpty()
  query: string;

  
  @IsNumber()
  @Transform((o)=>Number.parseInt(o.value))
  page:number;
}

