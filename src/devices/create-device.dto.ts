import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly ain: string;
}
