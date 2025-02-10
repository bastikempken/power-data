import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'measurements' })
export class MeasurementEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  device!: string;

  @Column()
  ain!: string;

  @Column()
  energy: number;

  @Column()
  power: number;

  @Column()
  temperature: number;

  @Column()
  voltage: number;

  @CreateDateColumn()
  createDate?: Date;
}
