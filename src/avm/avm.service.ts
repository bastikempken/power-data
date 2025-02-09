import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AvmService {
  private readonly logger: Logger = new Logger(AvmService.name);
  private readonly endpoint = '/webservices/homeautoswitch.lua';
  private readonly fb: string;

  constructor(
    private readonly httpService: HttpService,
    readonly configService: ConfigService,
  ) {
    this.fb = configService.getOrThrow<string>('FB');
  }

  public async getEnergy(ain: string, sid: string): Promise<string> {
    const request = this.httpService
      .get<string>(`${this.fb}/${this.endpoint}`, {
        params: {
          sid,
          ain,
          switchcmd: 'getswitchenergy',
        },
      })
      .pipe(map((res) => res.data));
    return firstValueFrom(request);
  }
}
