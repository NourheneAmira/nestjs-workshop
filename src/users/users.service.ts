import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileEntity } from './entities/profile.entity';
import { AddProfilDto } from './dto/addProfilDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class UsersService {
  constructor(
    // injecter le reposotiry
    @InjectRepository(ProfileEntity)
    private profilRepository: Repository<ProfileEntity>,
    private mailService: MailerService,
  ) {}

  async sendConfirmationEmail(email, activeCode) {
    await this.mailService.sendMail({
      from: '<nourhene.amira@esprit.tn>', // sender address
      to: email, // list of receivers
      subject: 'Account Verification', // Subject line
      text: 'Welcome', // plain text body
      html: `
        <h2>Bonjour</h2>
            <p>pour activer voutre compte, veuillez cliquer sur ce lien
            <a href=http://localhost:9000/confirm/${activeCode}> cliquer ici!</a> </>
        `, // html body
    });
    return 'envoyer des email  successfuly';
  }
  async addProfil(profil: AddProfilDto, user): Promise<ProfileEntity> {
    const newProfil = this.profilRepository.create(profil);
    newProfil.user = user;
    return await this.profilRepository.save(newProfil);
  }
  /* async getProfil(user):Promise<ProfilEntity[]> {
      return await this.profilRepository.find();*/
}

/*


  getProfilById(id:number):Profil{
    const profil = this.profil.find((actualProfil)=>actualProfil.id==id);
    if(profil)
    return profil;
    throw new  NotFoundException(`Profil ${id} not found`);
  }
   
  deleteProfil(id: number){
    // chercher l objet via son id dans le tableau de stodos
const index =this.profil.findIndex((profil:Profil )=>profil.id === +id);
//utilisier la methodes splice pour supprimer le todo s il existe 
if (index>=0){
    this.profil.splice(index, 1);
    }
// sinon declanche une erreur    
else {
    throw new NotFoundException(` profil d id ${id} n existe pas `);
}
return{
    message :`le profil d'id ${id} a été supprimer avec succes `,
    count:1};
  }
  modifierProfil(id:number,newProfil:Partial<AddProfilDto>){
    const profill =this.getProfilById(+id);
 
   profill.name = newProfil.name? newProfil.name : profill.name; 

    return profill;
  }*/
