import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMeasurementDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly device: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  readonly ain: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly energy: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly power: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly temperature: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly voltage: number;
}
