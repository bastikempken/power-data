import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'data-sets' })
export class DataSetEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  deviceId!: string;

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
