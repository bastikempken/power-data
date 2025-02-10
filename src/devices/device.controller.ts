import { Controller, Get } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceEntity } from './device.entity';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  devices(): Promise<DeviceEntity[]> {
    return this.deviceService.getDevices();
  }
}
