import { Module } from '@nestjs/common';
import { AvmController } from './avm.controller';
import { AvmService } from './avm.service';
import { HttpModule } from '@nestjs/axios';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementEntity } from './measurement.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([MeasurementEntity])],
  controllers: [AvmController],
  providers: [AvmService, LoginService],
  exports: [],
})
export class AvmModule {}
