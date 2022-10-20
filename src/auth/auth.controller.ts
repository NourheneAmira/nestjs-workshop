import { LoginCredentialsDto } from './Dto/login-credentialsDto';
import { AuthService } from './auth.service';
import { UserSubscribeDto } from './Dto/user-subscribeDto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('register')
  register(@Body() userData: UserSubscribeDto): Promise<Partial<UserEntity>> {
    return this.AuthService.register(userData);
  }

  @Post('login')
  login(
    @Body() credentials: LoginCredentialsDto, // normalement le retourne est une entite ===> taw jwt
  ) {
    return this.AuthService.login(credentials);
  }
  /*
@Get('emailConfirmation')
EmailConfirmation(@Query()activeCompte:EmailValidDto ){
  return this.AuthService.sendConfirmationEmail(activeCompte);
}*/
}
