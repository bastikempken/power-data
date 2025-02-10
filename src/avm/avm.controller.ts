import { Controller, Get, Param } from '@nestjs/common';
import { AvmService } from './avm.service';
import { LoginService } from './login.service';
import { MeasurementEntity } from './measurement.entity';

@Controller('avm/:ain')
export class AvmController {
  constructor(
    private readonly avmService: AvmService,
    private readonly loginService: LoginService,
  ) {}

  @Get('measurement')
  async getEnergy(@Param('ain') ain: string): Promise<MeasurementEntity> {
    return this.avmService.getMeasurement(ain);
  }
}
