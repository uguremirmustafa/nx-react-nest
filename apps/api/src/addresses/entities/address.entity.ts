import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public city: string;

  @Column()
  public street: string;

  @Column()
  public zipCode: string;

  // @Column()
  // public houseNumber: number;

  @ManyToMany(() => User, (user: User) => user.addresses, { eager: false })
  @JoinTable()
  public users: User[];
}
