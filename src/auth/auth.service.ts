import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserSubscribeDto } from './Dto/user-subscribeDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// importer la totalite de la fonctionalite as bcrypt from la bilbliotheque bcrypt
import * as bcrypt from 'bcrypt';
import { userInfo } from 'os';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './Dto/login-credentialsDto';
import { UserEntity } from '../users/entities/user.entity';

import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // register est une function qui prend en parametre unobjet user de type
  // usersubscribedto et qui va nouus retourne une promesse un objet de type userentity
  async register(userData: UserSubscribeDto): Promise<Partial<UserEntity>> {
    // creation du code d activation=chaine de character aleatoire
    const char = '001155dsffhkjsfdkfsd96qf048785114';
    let activationCode = '';
    for (let i = 0; i < 25; i++) {
      activationCode += char[Math.floor(Math.random() * char.length)];
    }

    // recuperer notre utilisateur// ...userData = toute les information de user data
    const user = this.userRepository.create({ ...userData });
    //genere moi un salt
    user.salt = await bcrypt.genSalt();
    // hacher mon mot de passe en utilisation se salt la
    user.password = await bcrypt.hash(user.password, user.salt);
    console.log('c bien');
    user.activeCode = activationCode;

    //gere les erreurs
    try {
      await this.userRepository.save(user);
      this.userService.sendConfirmationEmail(user.email, user.activeCode);
      console.log('envoie d email valide ');
    } catch (e) {
      throw new ConflictException(
        `le user name et le email doivent etre unique `,
      );
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      password: user.password,
      isActive: user.isActive,
      activeCode: user.activeCode,
    };
  }

  async login(credentials: LoginCredentialsDto) {
    //recuperer le login et le mot depasse
    const { email, password } = credentials;
    // on peut se logger via l e username ou via le password
    // verifier est ce qui il ya un user avec ce login ou mdp
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email or user.email = :email', {
        email,
      })
      .getOne();
    console.log(user);
    // si not user   je declanche une erreur
    //if (!user) throw new NotFoundException('user name or password errone');

    //si oui je verifier est ce que le mdb correcte ou nn
    const hashedPassword = await bcrypt.hash(password, user.salt);
    console.log(user.isActive);
    if (!user.isActive && hashedPassword === user.password) {
      // au lieu de retourner un utilisateur en doit retourner un token
      const payload = {
        username: user.username,
        email: user.email,
        role: user.role,
      };
      // cree un token =signer le payload
      const jwt = await this.jwtService.sign(payload);
      // alors ot doit retourne r un token
      return {
        access_token: jwt,
      };
    } else {
      // si mdp incorrecte je declanche une erreur
      throw new NotFoundException(
        'veuillez vzrifier votre boite email pour l activation ',
      );
    }
  }
}
