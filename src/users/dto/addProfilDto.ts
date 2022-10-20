import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AddProfilDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'la taille minimale est de 6 caracteres' })
  name: string;
}
