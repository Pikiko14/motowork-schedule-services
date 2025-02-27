import { Type } from 'class-transformer';
import { IsDate, IsJSON, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationDto {

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  perPage?: number = 10;

  @IsString()
  @IsOptional()
  @Type(() => String)
  search?: string = '';

  @IsString()
  @IsOptional()
  from?: string;

  @IsString()
  @IsOptional()
  to?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  filter: string = '';
}