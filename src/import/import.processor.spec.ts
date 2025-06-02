import { ImportProcessor } from './import.processor';

describe('ProductsProcessor', () => {
  it('should be defined', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(new ImportProcessor({} as any, {} as any)).toBeDefined();
  });
});
