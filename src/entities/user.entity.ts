import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @Column()
  unique_id: number;

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;
}
