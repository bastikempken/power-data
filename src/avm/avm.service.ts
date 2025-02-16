import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { DataSetEntity } from '../devices/data-set.entity';
import { LoginService } from './login.service';
import { XMLParser } from 'fast-xml-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceDto, DeviceListDto } from './dtos/avm.dto';
import { Response } from './dtos/avm-internal.dto';
import { AxiosError } from 'axios';

@Injectable()
export class AvmService {
  private readonly logger: Logger = new Logger(AvmService.name);
  private readonly endpoint = '/webservices/homeautoswitch.lua';
  private readonly fb: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly loginService: LoginService,
    readonly configService: ConfigService,
    @InjectRepository(DataSetEntity)
    private measurementRepository: Repository<DataSetEntity>,
  ) {
    this.fb = configService.getOrThrow<string>('FB');
  }

  async setSimpleOnOff(ain: string, onoff: 1 | 0): Promise<number> {
    const sid = await this.loginService.getSid();
    const request = this.httpService
      .get<string>(`${this.fb}/${this.endpoint}`, {
        params: {
          sid,
          ain,
          switchcmd: 'setsimpleonoff',
          onoff,
        },
      })
      .pipe(
        map((res) => {
          return parseInt(res.data);
        }),
        catchError((err: AxiosError) => {
          this.logger.error('error on simple on off', err.request);
          return of(-1);
        }),
      );
    return firstValueFrom(request);
  }

  async getDeviceList(): Promise<DeviceListDto> {
    const sid = await this.loginService.getSid();
    return await this.callDeviceList(sid);
  }

  async getDevice(ain: string): Promise<DeviceDto | undefined> {
    const sid = await this.loginService.getSid();
    const { devicelist } = await this.callDeviceList(sid);
    return devicelist.find((device) => device.ain === ain);
  }

  private async callDeviceList(sid: string): Promise<DeviceListDto> {
    const request = this.httpService
      .get<string>(`${this.fb}/${this.endpoint}`, {
        params: {
          sid,
          switchcmd: 'getdevicelistinfos',
        },
      })
      .pipe(
        map((res) => {
          const parser = new XMLParser({
            ignoreAttributes: false,
            isArray: (tagName) => tagName === 'device',
          });
          const { devicelist } = <Response>parser.parse(res.data);
          const deviceDtos: DeviceDto[] = devicelist.device.map((d) => ({
            ...d,
            ain: d['@_identifier'],
          }));
          return {
            devicelist: [...deviceDtos],
          };
        }),
      );
    return firstValueFrom(request);
  }
}
