import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { DataSetEntity } from '../devices/data-set.entity';
import { LoginService } from './login.service';
import { XMLParser } from 'fast-xml-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceDto, DeviceListDto } from './dtos/avm.dto';
import { Response } from './dtos/avm-internal.dto';

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
