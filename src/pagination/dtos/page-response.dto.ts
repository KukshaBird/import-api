export class PageResponseDto<T> {
  readonly data: T[];
  readonly total: number;
  readonly skip: number;
  readonly take: number;

  constructor(data: T[], total: number, skip: number, take: number) {
    this.data = data;
    this.total = total;
    this.skip = skip;
    this.take = take;
  }
}
