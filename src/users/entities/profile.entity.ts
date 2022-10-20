import { TimestampEntities } from '../../Generics/Timestamp.entities';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
// cv est le nom e votre entities dans le db
@Entity('profil')
export class ProfileEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @PrimaryColumn()
  @Column({
    name: 'name',
    length: 50,
  })
  name: string;

  @OneToOne(() => UserEntity, (user) => user.profil) // specify inverse side as a second parameter
  user: UserEntity;
}
