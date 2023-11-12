import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

import { AppExceptionResponse } from './exception-response'

export class BadRequestDto extends AppExceptionResponse {
  @ApiProperty({
    default: HttpStatus.BAD_REQUEST,
  })
  statusCode = HttpStatus.BAD_REQUEST

  @ApiProperty({
    default: 'Bad Request',
  })
  error = 'Bad Request'
}
