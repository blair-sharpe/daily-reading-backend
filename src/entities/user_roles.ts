import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('users_roles')
export class UsersRole {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  user_id: number;

  @Column()
  role: string;
}
