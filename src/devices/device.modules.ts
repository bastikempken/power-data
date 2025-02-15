import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from './device.entity';
import { DataSetEntity } from './data-set.entity';
import { AvmModule } from '../avm/avm.modules';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity, DataSetEntity]), AvmModule],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [],
})
export class DeviceModule {}
