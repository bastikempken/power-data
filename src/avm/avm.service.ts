import { Injectable } from '@nestjs/common';
import { AvmDto } from './avm.dto';

@Injectable()
export class AvmService {
  constructor() {}

  async getDevices(): Promise<AvmDto[]> {
    return Promise.resolve([]);
  }
}
