import { IsArray, IsEnum, IsOptional } from 'class-validator';

export enum ImportStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export class ImportDto {
  id: string;

  @IsEnum(ImportStatus)
  @IsOptional()
  status?: ImportStatus = ImportStatus.PENDING;

  resource: string;

  @IsArray()
  @IsOptional()
  products?: number[] = [];
}
