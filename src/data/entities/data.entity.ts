import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Data {
  @PrimaryColumn()
  uid: number;

  @PrimaryColumn()
  category: string;

  @Column({ nullable: true, type: 'text' })
  data: string;
}
