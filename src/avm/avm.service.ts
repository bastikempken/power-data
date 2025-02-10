import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { MeasurementEntity } from './measurement.entity';
import { LoginService } from './login.service';
import { XMLParser } from 'fast-xml-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AvmService {
  private readonly logger: Logger = new Logger(AvmService.name);
  private readonly endpoint = '/webservices/homeautoswitch.lua';
  private readonly fb: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly loginService: LoginService,
    readonly configService: ConfigService,
    @InjectRepository(MeasurementEntity)
    private measurementRepository: Repository<MeasurementEntity>,
  ) {
    this.fb = configService.getOrThrow<string>('FB');
  }

  public async getMeasurement(ain: string): Promise<MeasurementEntity> {
    const sid = await this.loginService.getSid();
    const energy = await this.getEnergy(ain, sid);
    const power = await this.getPower(ain, sid);
    const temperature = await this.getTemperature(ain, sid);
    const voltage = await this.getVoltage(ain, sid);
    const parser = new XMLParser();
    const entity = new MeasurementEntity();
    entity.energy = energy;
    entity.power = power;
    entity.temperature = temperature;

    return entity;
  }

  private async getEnergy(ain: string, sid: string): Promise<number> {
    const request = this.httpService
      .get<string>(`${this.fb}/${this.endpoint}`, {
        params: {
          sid,
          ain,
          switchcmd: 'getswitchenergy',
        },
      })
      .pipe(map((res) => parseInt(res.data)));
    return firstValueFrom(request);
  }

  private async getTemperature(ain: string, sid: string): Promise<number> {
    const request = this.httpService
      .get<string>(`${this.fb}/${this.endpoint}`, {
        params: {
          sid,
          ain,
          switchcmd: 'gettemperature',
        },
      })
      .pipe(map((res) => parseInt(res.data)));
    return firstValueFrom(request);
  }

  private async getPower(ain: string, sid: string): Promise<number> {
    const request = this.httpService
      .get<string>(`${this.fb}/${this.endpoint}`, {
        params: {
          sid,
          ain,
          switchcmd: 'getswitchpower',
        },
      })
      .pipe(map((res) => parseInt(res.data)));
    return firstValueFrom(request);
  }

  private async getVoltage(ain: string, sid: string): Promise<string> {
    const request = this.httpService
      .get<string>(`${this.fb}/${this.endpoint}`, {
        params: {
          sid,
          ain,
          switchcmd: 'getdevicelistinfos',
        },
      })
      .pipe(map((res) => res.data));
    return firstValueFrom(request);
  }
}
