import { User } from '../decorators/user.decorator';

import { Min } from 'class-validator';
import { UpdateCourseDto } from './dto/UPdate-course.dto';
import { CourseEntity } from './entities/course.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBuilder, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCourseDto } from './dto/Add-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    // injecter le reposotiry
    @InjectRepository(CourseEntity)
    private coursRepository: Repository<CourseEntity>,
  ) {}

  // la nouvelle facon d ecrire un code asynchrone promise await
  async getCours(user): Promise<CourseEntity[]> {
    console.log(user);
    return await this.coursRepository.find();
  }

  // passer notre utilistaeur a notre methode add cv
  async addCours(cours: AddCourseDto, user): Promise<CourseEntity> {
    const newCours = this.coursRepository.create(cours);
    newCours.userC = user;
    return await this.coursRepository.save(newCours);
  }
  /// l id elle va nous permettre de recupere l objet d origine
  async updateCours(id: number, cours: UpdateCourseDto): Promise<CourseEntity> {
    //recupere le cv d id =id et ensuite en remplace
    //l ancien valeurs de cv par ceux du cv passé en parametre
    const newCours = await this.coursRepository.preload({
      id,
      ...cours,
    });
    // tester le cas ou le cv d id id n existe pas
    if (!newCours) {
      throw new NotFoundException(
        `le cours d id ${id}n existe pas merci de verifier`,
      );
    }

    // sauvgarder la nouvelle entites
    return await this.coursRepository.save(newCours);
  }
  // TODO:verifier findeOne (id)
  //FIXME:hello todo highlight
  /// difference entre remove et delete
  // remove elle peut supprimer un ou plusieurs entites
  /*async removeCv (id: number){
    const cvToRemove= await this.cvRepository.findOne(id);
    if(!cvToRemove){
        throw new NotFoundException(`le cv  d id ${id}n existe pas merci de verifier` );
    }
   return await  this.cvRepository.remove(cvToRemove);
}*/

  // si affected =0 alors rien n est changer si affected=nmbre e ligne supprimer dans la bade de donnes
  // on peut ecrire delete([4,5,6]) cad les trois object d id 456 seront supprimer
  async deleteCours(id: number) {
    if (!id) {
      throw new NotFoundException(
        `le cv  d id ${id}n existe pas merci de verifier`,
      );
    }
    return await this.coursRepository.delete(id);
  }

  // TODO: query builder
  // cherchant le nombre de cv par age
  // exemple age =65 nombre de cv =3
  async coursNmberParAge(maxAge, minAge = 0) {
    // creer un query builder
    const qb = this.coursRepository.createQueryBuilder('cv');
    //chercher le nombre de cv par age
    // : cad se sont des parametre
    qb.select('cours.age, count(cours.id) as nbreDeCv')
      .where('cours.age < :maxAge and cours.age> :minAge')
      .setParameters({ maxAge, minAge })
      .groupBy('cours.age');
    //explication fil console parrapport a la requette
    console.log(qb.getSql());
    return await qb.getRawMany();
  }
}
