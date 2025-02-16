import { Controller, Get, Param } from '@nestjs/common';
import { AvmService } from './avm.service';
import { DeviceDto, DeviceListDto } from './dtos/avm.dto';

@Controller('homeautoswitch')
export class AvmController {
  constructor(private readonly avmService: AvmService) {}

  @Get('setswitchon/:ain/on')
  async setSwitchOn(@Param('ain') ain: string): Promise<number> {
    return await this.avmService.setSimpleOnOff(ain, 1);
  }

  @Get('setswitchon/:ain/off')
  async setSwitchOff(@Param('ain') ain: string): Promise<number> {
    return await this.avmService.setSimpleOnOff(ain, 0);
  }

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
