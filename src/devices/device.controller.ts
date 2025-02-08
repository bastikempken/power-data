import { Controller, Get } from '@nestjs/common';
import { DeviceDto } from './device.dto';
import { DeviceService } from './device.service';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  devices(): Promise<DeviceDto[]> {
    return this.deviceService.getDevices();
  }
}
