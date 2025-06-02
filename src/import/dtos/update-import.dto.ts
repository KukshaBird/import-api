import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ImportDto } from './import.dto';

export class UpdateImportDto extends PartialType(
  OmitType(ImportDto, ['id'] as const),
) {}
