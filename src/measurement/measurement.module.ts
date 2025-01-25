import { Module } from '@nestjs/common';
import { MeasurementController } from './measurement.controller';
import { MeasurementService } from './measurement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementEntity } from './measurement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeasurementEntity])],
  controllers: [MeasurementController],
  providers: [MeasurementService],
  exports: [],
})
export class MeasurementModule {}
