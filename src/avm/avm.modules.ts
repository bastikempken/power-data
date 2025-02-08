import { Module } from '@nestjs/common';
import { AvmController } from './avm.controller';
import { AvmService } from './avm.service';

@Module({
  imports: [],
  controllers: [AvmController],
  providers: [AvmService],
  exports: [],
})
export class AvmModule {}
