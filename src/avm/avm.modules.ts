import { Module } from '@nestjs/common';
import { AvmController } from './avm.controller';
import { AvmService } from './avm.service';
import { HttpModule } from '@nestjs/axios';
import { LoginService } from './login.service';

@Module({
  imports: [HttpModule],
  controllers: [AvmController],
  providers: [AvmService, LoginService],
  exports: [],
})
export class AvmModule {}
