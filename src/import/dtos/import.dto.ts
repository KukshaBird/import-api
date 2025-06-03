import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { Expose, Exclude, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ImportStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export class ImportDto {
  @ApiProperty({
    description: 'Unique identifier of the import',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiPropertyOptional({
    enum: ImportStatus,
    default: ImportStatus.PENDING,
    description: 'Current status of the import process',
  })
  @Expose()
  @IsEnum(ImportStatus)
  @IsOptional()
  status?: ImportStatus = ImportStatus.PENDING;

  @Exclude()
  resource: string;

  @ApiPropertyOptional({
    type: [Number],
    description: 'Array of product IDs included in the import',
    default: [],
    example: [1, 2, 3],
  })
  @Expose()
  @Type(() => Number)
  @IsArray()
  @IsOptional()
  products?: number[] = [];
}
