export interface InternalSwitchDto {
  state: number;
  mode: string;
  lock: number;
  devicelock: number;
}

export interface InternalSimpleOnOffDto {
  state: number;
}

export interface InternalPowermeterDto {
  voltage: number;
  power: number;
  energy: number;
}

export interface InternalTemperatureDto {
  celsius: number;
  offset: number;
}

export interface InternalDeviceDto {
  present: number;
  txbusy: number;
  name: string;
  switch: InternalSwitchDto;
  simpleonoff: InternalSimpleOnOffDto;
  powermeter: InternalPowermeterDto;
  temperature: InternalTemperatureDto;
  '@_identifier': string;
  '@_id': string;
  '@_functionbitmask': string;
  '@_fwversion': string;
  '@_manufacturer': string;
  '@_productname': string;
}

export interface InternalDeviceListDto {
  device: InternalDeviceDto[];
  '@_version': string;
  '@_fwversion': string;
}

export interface Response {
  devicelist: InternalDeviceListDto;
}
