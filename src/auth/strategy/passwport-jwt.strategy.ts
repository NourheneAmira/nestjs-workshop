// implementation de jwt
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from '../entites/interface/payload-interface';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
// la classe jwtsretgy elle va extend une classe stratrgy qui va prendre e parametre strategy
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // injecter le config service
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    // appeler la methode super => super elle prend en parametre un tableau d option
    super({
      // recuper jwt de la requet en utilisation la methode extractjwt
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // le secret avec la quelle le token elle est gener
      secretOrKey: configService.get('SECRET'),
    });
  }
  // creer une methode valide le token
  // qui prend en parametre un payload
  async validate(payload: PayloadInterface) {
    // j'ai recupere mon user
    const user = await this.userRepository.findOne({
      where: { username: payload.username },
    });
    //si le user existe je le retourne et la automatiquement ce que je retourne dans
    // valide est mis dans la requet
    if (user) {
      delete user.salt;
      delete user.password;
      return user;
    }
    // si non je declanche une erreur
    else {
      throw new UnauthorizedException();
    }
  }
}
