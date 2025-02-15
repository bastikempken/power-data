import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSetEntity } from './devices/data-set.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HTTPLoggingInterceptor } from './logging-interceptor';
import { DeviceModule } from './devices/device.modules';
import { AvmModule } from './avm/avm.modules';
import { DeviceEntity } from './devices/device.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DeviceModule,
    AvmModule,
    ScheduleModule.forRoot(),
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
          entities: [DataSetEntity, DeviceEntity],
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
