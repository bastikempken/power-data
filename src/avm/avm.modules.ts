import { Module } from '@nestjs/common';
import { AvmController } from './avm.controller';
import { AvmService } from './avm.service';
import { HttpModule } from '@nestjs/axios';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSetEntity } from '../devices/data-set.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([DataSetEntity])],
  controllers: [AvmController],
  providers: [AvmService, LoginService],
  exports: [AvmService],
})
export class AvmModule {}
