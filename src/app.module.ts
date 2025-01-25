import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MeasurementModule } from './measurement/measurement.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MeasurementEntity } from './measurement/measurement.entity';

@Module({
  imports: [
    MeasurementModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
