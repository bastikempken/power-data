import { Controller, Get, Param } from '@nestjs/common';
import { AvmService } from './avm.service';
import { DeviceDto, DeviceListDto } from './dtos/avm.dto';

@Controller('homeautoswitch')
export class AvmController {
  constructor(private readonly avmService: AvmService) {}

  @Get('devicelist/:ain')
  async device(@Param('ain') ain: string): Promise<DeviceDto> {
    const device = await this.avmService.getDevice(ain);
    //TODO 403
    return device!;
  }

  @Get('devicelist')
  async deviceList(): Promise<DeviceListDto> {
    return this.avmService.getDeviceList();
  }
}
