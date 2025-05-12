import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: string;

  @Column()
  daily_reading_id: number;

  @Column()
  user_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
