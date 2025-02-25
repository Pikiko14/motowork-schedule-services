import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsDate,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  hour: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsOptional()
  hourType?: string;

  @IsObject()
  @IsNotEmpty()
  client: {
    name: string;
    lastName: string;
    email: string;
    dni: string;
    phone: string;
  };

  @IsString()
  @IsNotEmpty()
  vehicle_dni?: string;

  @IsString()
  @IsNotEmpty()
  vehicle_type?: string;

  @IsString()
  @IsNotEmpty()
  vehicle_km?: string;

  @IsString()
  @IsNotEmpty()
  complement?: string;

  @IsString()
  @IsOptional()
  level_to_schedule?: string;
}
