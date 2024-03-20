import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ unique: true })
  google: string;

  @Column()
  d: string;

  @Column({ nullable: true, default: null })
  nickname?: string;

  @Column({ nullable: true, default: null })
  lastLoginDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
