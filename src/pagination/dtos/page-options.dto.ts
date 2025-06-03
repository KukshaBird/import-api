import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PageOptionsDto {
  @IsInt()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => Number(value) || 0)
  readonly skip: number;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Transform(({ value }) => Number(value) || 10)
  readonly take: number;
}
