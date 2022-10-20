import { UserRoleEnum } from '../../Generics/enums/user-role.enum';
import { CourseEntity } from '../../courses/entities/course.entity';
import { TimestampEntities } from '../../Generics/Timestamp.entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('users')
export class UserEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: string;
  @Column({
    default: false,
  })
  isActive: boolean;
  @Column({
    nullable: false,
  })
  activeCode: string;

  @OneToMany((type) => CourseEntity, (course) => course.userC, {
    cascade: true,
    nullable: true,
  })
  course: CourseEntity[];

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profil: ProfileEntity;
}
