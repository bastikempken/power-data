import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly ain: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Type(() => Boolean)
  @IsBoolean()
  readonly active: boolean = true;
}
