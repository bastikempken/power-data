import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MeasurementModule } from './measurement/measurement.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MeasurementEntity } from './measurement/measurement.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HTTPLoggingInterceptor } from './logging-interceptor';
import { DeviceModule } from './devices/device.modules';
import { AvmModule } from './avm/avm.modules';

@Module({
  imports: [
    MeasurementModule,
    DeviceModule,
    AvmModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'client'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('DB_HOST'),
          port: 5432,
          password: configService.getOrThrow('DB_PW'),
          username: configService.getOrThrow('DB_USER'),
          entities: [MeasurementEntity],
          database: configService.getOrThrow('DB_NAME'),
          synchronize: true,
          logging: false,
        };
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HTTPLoggingInterceptor,
    },
  ],
})
export class AppModule {}
