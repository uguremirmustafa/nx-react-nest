import { Exclude } from 'class-transformer';
import { Address } from 'src/addresses/entities/address.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @ManyToMany(() => Address, (address: Address) => address.users, {
    cascade: true,
    eager: false,
  })
  public addresses: Address[];
}
