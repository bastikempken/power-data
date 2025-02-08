import { Injectable } from '@nestjs/common';
import { DeviceDto } from './device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MeasurementEntity } from '../measurement/measurement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(MeasurementEntity)
    private measurementRepository: Repository<MeasurementEntity>,
  ) {}

  async getDevices(): Promise<DeviceDto[]> {
    const x = await this.measurementRepository
      .createQueryBuilder('measurement')
      .select('DISTINCT(device) ain')
      .getRawMany();
    console.log(x);

    return Promise.resolve([]);
  }
}
