import { Body, Controller, Post } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { CreateMeasurementDto } from './create-measurement.dto';
import { MeasurementEntity } from './measurement.entity';

@Controller('measurements')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Post()
  create(@Body() dto: CreateMeasurementDto): Promise<MeasurementEntity> {
    return this.measurementService.crate(dto);
  }
}
