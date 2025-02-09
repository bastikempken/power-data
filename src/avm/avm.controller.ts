import { Controller, Get, Param } from '@nestjs/common';
import { AvmService } from './avm.service';
import { LoginService } from './login.service';

@Controller('avm/:ain')
export class AvmController {
  constructor(
    private readonly avmService: AvmService,
    private readonly loginService: LoginService,
  ) {}

  @Get('energy')
  async getEnergy(@Param('ain') ain: string): Promise<string> {
    const sid = await this.loginService.getSid();
    return this.avmService.getEnergy(ain, sid);
  }
}
