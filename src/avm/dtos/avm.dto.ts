import {
  InternalDeviceDto,
  InternalPowermeterDto,
  InternalSimpleOnOffDto,
  InternalSwitchDto,
  InternalTemperatureDto,
} from './avm-internal.dto';

export type SwitchDto = InternalSwitchDto;

export type SimpleOnOffDto = InternalSimpleOnOffDto;

export type PowermeterDto = InternalPowermeterDto;

export type TemperatureDto = InternalTemperatureDto;

export interface DeviceDto
  extends Omit<
    InternalDeviceDto,
    | '@_functionbitmask'
    | '@_identifier'
    | '@_fwversion'
    | '@_id'
    | '@_manufacturer'
    | '@_productname'
    | 'switch'
    | 'simpleonoff'
    | 'powermeter'
    | 'temperature'
  > {
  ain: string;
  switch: SwitchDto;
  simpleonoff: SimpleOnOffDto;
  powermeter: PowermeterDto;
  temperature: TemperatureDto;
}

export interface DeviceListDto {
  devicelist: DeviceDto[];
}
