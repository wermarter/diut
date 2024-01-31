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
  constructor(private dtoClass: ClassConstructor<unknown>) {}

  intercept(context: ExecutionContext, next: CallHandler<unknown>) {
    return next.handle().pipe(
      map((response) => {
        // TODO: validate response DTO?
        return plainToClass(this.dtoClass, response, {
          excludeExtraneousValues: true,
        })
      }),
    )
  }
}
