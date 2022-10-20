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
export class UpdateCourseDto {
  // les proprietes ajoute au niveau de notre dto
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(15)
  @Max(65)
  age: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  cin: number;

  @IsOptional()
  @IsString()
  job: string;

  path: string;
}
