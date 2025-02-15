import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DataSetEntity } from './data-set.entity';

@Entity({ name: 'devices' })
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  ain: string;

  @Column()
  name: string;

  @Column()
  active: boolean;

  @OneToMany(() => DataSetEntity, (dataSetEntity) => dataSetEntity.deviceId)
  dataSet: DataSetEntity[];

  @CreateDateColumn()
  createDate?: Date;
}
