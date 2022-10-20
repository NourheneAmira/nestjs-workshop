import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

//
export class AddCourseDto {
  // les proprietes ajoute au niveau de notre dto
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(15)
  @Max(65)
  age: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  cin: number;

  @IsNotEmpty()
  @IsString()
  job: string;

  path: string;
}
