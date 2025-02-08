import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementEntity } from '../measurement/measurement.entity';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeasurementEntity])],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [],
})
export class DeviceModule {}
