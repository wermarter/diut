import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common'
import { ClassConstructor, plainToClass } from 'class-transformer'
import { map } from 'rxjs'

export function Serialize(dto: ClassConstructor<unknown>) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor<unknown>) {}

  intercept(context: ExecutionContext, next: CallHandler<unknown>) {
    return next.handle().pipe(
      map((response) => {
        return plainToClass(this.dto, response, {
          excludeExtraneousValues: true,
        })
      }),
    )
  }
}
