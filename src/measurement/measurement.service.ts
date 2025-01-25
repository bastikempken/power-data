import { Injectable } from '@nestjs/common';
import { CreateMeasurementDto } from './create-measurement.dto';
import { MeasurementEntity } from './measurement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(MeasurementEntity)
    private measurementRepository: Repository<MeasurementEntity>,
  ) {}

  crate(dto: CreateMeasurementDto): Promise<MeasurementEntity> {
    const entity = new MeasurementEntity();
    entity.ain = dto.ain;
    entity.device = dto.device;
    entity.energy = dto.energy;
    entity.power = dto.power;
    entity.voltage = dto.voltage;
    entity.temperature = dto.temperature;
    return this.measurementRepository.save(entity);
  }
}
