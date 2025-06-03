import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface SerializeDto {
  new (...args: any[]): any;
}

export function Serialize(dto: SerializeDto) {
  return UseInterceptors(new SerializeInterceptor<SerializeDto>(dto));
}

export class SerializeInterceptor<DTOType> implements NestInterceptor {
  constructor(private dto: SerializeDto) {}
  intercept(
    _context: ExecutionContext,
    next: CallHandler<DTOType>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: DTOType) =>
        plainToInstance<DTOType, DTOType>(this.dto, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
