import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Daily_reading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reading: string;

  @Column()
  reading_day: number;
}
