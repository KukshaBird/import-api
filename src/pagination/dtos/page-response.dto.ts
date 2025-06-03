import { Expose } from 'class-transformer';

export class PageResponseDto<T> {
  @Expose()
  readonly data: T[];
  @Expose()
  readonly total: number;
  @Expose()
  readonly skip: number;
  @Expose()
  readonly take: number;

  constructor(data: T[], total: number, skip: number, take: number) {
    this.data = data;
    this.total = total;
    this.skip = skip;
    this.take = take;
  }
}
