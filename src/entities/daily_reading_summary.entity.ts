import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Daily_reading_summary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 600 })
  summary: string;
}
