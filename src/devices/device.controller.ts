import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceEntity } from './device.entity';
import { CreateDeviceDto } from './create-device.dto';
import { DataSetEntity } from './data-set.entity';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body() dto: CreateDeviceDto): Promise<DeviceEntity> {
    return this.deviceService.create(dto);
  }

  @Get()
  devices(@Param('active') active: boolean = true): Promise<DeviceEntity[]> {
    return this.deviceService.getDevices(active);
  }

  @Get(':id/on')
  switchDeviceOn(@Param('id') id: string): Promise<number> {
    return this.deviceService.switchDeviceOn(id);
  }

  @Get(':id/off')
  switchDeviceOff(@Param('id') id: string): Promise<number> {
    return this.deviceService.switchDeviceOff(id);
  }

  @Post(':id/data-sets')
  soreDataset(@Param('id') id: string): Promise<DataSetEntity> {
    return this.deviceService.storeDataset(id);
  }

  @Get(':id/data-sets')
  getDataset(@Param('id') id: string): Promise<DataSetEntity[]> {
    return this.deviceService.getDatasets(id);
  }
}
