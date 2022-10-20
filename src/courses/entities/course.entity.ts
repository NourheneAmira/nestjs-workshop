import { TimestampEntities } from '../../Generics/Timestamp.entities';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
// cours  est le nom e votre entities dans le db
@Entity('cours')
export class CourseEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn()
  @Column({
    name: 'name',
    length: 50,
  })
  name: string;
  @PrimaryColumn()
  @Column({
    length: 70,
  })
  firstName: string;
  @Column()
  age: number;
  @Column()
  cin: number;
  @Column()
  job: string;
  @Column()
  path: string;

  @ManyToOne((type) => UserEntity, (user) => user.course, {
    cascade: ['insert', 'update'],
    eager: true,
    nullable: true,
  })
  userC: UserEntity;
}
