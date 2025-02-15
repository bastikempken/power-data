import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceEntity } from './device.entity';
import { CreateDeviceDto } from './create-device.dto';
import { DataSetEntity } from './data-set.entity';
import { AvmService } from '../avm/avm.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DeviceService {
  private readonly logger: Logger = new Logger(DeviceService.name);

  constructor(
    @InjectRepository(DeviceEntity)
    private deviceRepository: Repository<DeviceEntity>,
    @InjectRepository(DataSetEntity)
    private dataSetRepository: Repository<DataSetEntity>,
    private avmService: AvmService,
  ) {}

  async getDevices(active: boolean): Promise<DeviceEntity[]> {
    return this.deviceRepository.findBy({ active });
  }

  create(dto: CreateDeviceDto): Promise<DeviceEntity> {
    const entity = new DeviceEntity();
    entity.ain = dto.ain;
    entity.active = dto.active;
    entity.name = dto.name;
    return this.deviceRepository.save(entity);
  }

  async storeDataset(deviceId: string): Promise<DataSetEntity> {
    const device = await this.deviceRepository.findOneBy({ id: deviceId });
    if (device === null) {
      throw new BadRequestException('Device not found');
    }
    const { ain } = device;
    const avmDeviceDto = await this.avmService.getDevice(ain);
    if (avmDeviceDto === undefined) {
      throw new BadRequestException('Device with ain not found on fritzbox');
    }
    const { powermeter, temperature } = avmDeviceDto;
    const dataSetEntity = new DataSetEntity();
    dataSetEntity.deviceId = deviceId;
    dataSetEntity.energy = powermeter.energy;
    dataSetEntity.power = powermeter.power;
    dataSetEntity.temperature = temperature.celsius;
    dataSetEntity.voltage = powermeter.voltage;
    return this.dataSetRepository.save(dataSetEntity);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async task(): Promise<void> {
    const devices = await this.getDevices(true);
    if (devices.length === 0) {
      this.logger.debug('no devices found');
    }
    devices.forEach(({ id }: DeviceEntity) => {
      this.logger.debug(`store new dataset for device ${id}`);
      this.storeDataset(id);
    });
  }

  getDatasets(deviceId: string) {
    return this.dataSetRepository.findBy({ deviceId });
  }
}
