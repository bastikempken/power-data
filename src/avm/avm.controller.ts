import { Controller, Get } from '@nestjs/common';
import { AvmDto } from './avm.dto';
import { AvmService } from './avm.service';

@Controller('avm')
export class AvmController {
  constructor(private readonly deviceService: AvmService) {}

  @Get()
  devices(): Promise<AvmDto[]> {
    return this.deviceService.getDevices();
  }
}
