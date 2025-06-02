import { OmitType } from '@nestjs/mapped-types';
import { ImportDto } from './import.dto';

export class CreateImportDto extends OmitType(ImportDto, ['id'] as const) {}
