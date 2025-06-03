import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { Expose, Exclude, Type } from 'class-transformer';

export enum ImportStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export class ImportDto {
  @Expose()
  id: string;

  @Expose()
  @IsEnum(ImportStatus)
  @IsOptional()
  status?: ImportStatus = ImportStatus.PENDING;

  @Exclude()
  resource: string;

  @Expose()
  @Type(() => Number)
  @IsArray()
  @IsOptional()
  products?: number[] = [];
}
