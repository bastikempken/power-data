import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { XMLParser } from 'fast-xml-parser';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';

interface SessionInfo {
  Challenge: string;
  SID: string;
}

interface LoginSid {
  SessionInfo: SessionInfo;
}

@Injectable()
export class LoginService {
  private readonly logger: Logger = new Logger(LoginService.name);
  private readonly fb: string;
  private readonly fbPw: string;
  private readonly fbUser: string;

  constructor(
    private readonly httpService: HttpService,
    readonly configService: ConfigService,
  ) {
    this.fb = configService.getOrThrow<string>('FB');
    this.fbUser = configService.getOrThrow<string>('FB_USERNAME');
    this.fbPw = configService.getOrThrow<string>('FB_PW');
  }

  private parseSessionInfo(xml: string): SessionInfo {
    const parser = new XMLParser();
    const loginSid = <LoginSid>parser.parse(xml);
    return loginSid.SessionInfo;
  }

  private convertTo16LE(text: string): string {
    const byteArray = new Uint8Array(text.length * 2);
    for (let i = 0; i < text.length; i++) {
      byteArray[i * 2] = text.charCodeAt(i); // & 0xff;
      byteArray[i * 2 + 1] = text.charCodeAt(i) >> 8; // & 0xff;
    }
    return new TextDecoder().decode(byteArray);
  }

  private async getLoginStatus(): Promise<SessionInfo> {
    const challengeRequest = this.httpService
      .get<string>(`${this.fb}/login_sid.lua`)
      .pipe(
        map((res) => {
          return this.parseSessionInfo(res.data);
        }),
      );
    return firstValueFrom(challengeRequest);
  }

  private getResponse(challenge: string): string {
    const hash = createHash('md5')
      .update(this.convertTo16LE(`${challenge}-${this.fbPw}`))
      .digest('hex');
    return `${challenge}-${hash}`;
  }

  public async getSid(): Promise<string> {
    const sessionInfo = await this.getLoginStatus();
    const { Challenge, SID } = sessionInfo;
    // TODO reusable session
    if (SID !== '0') {
      // return Promise.resolve(SID);
    }
    const response = this.getResponse(Challenge);
    const request = this.httpService
      .get<string>(
        `${this.fb}/login_sid.lua?username=${this.fbUser}&response=${response}`,
      )
      .pipe(
        map((res) => {
          const { SID } = this.parseSessionInfo(res.data);
          return SID;
        }),
      );
    return await firstValueFrom(request);
  }
}
