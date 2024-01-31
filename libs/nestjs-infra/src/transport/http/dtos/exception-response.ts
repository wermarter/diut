import { ApiProperty } from '@nestjs/swagger'

export class AppExceptionResponse {
  @ApiProperty()
  statusCode: number

  @ApiProperty()
  error: string
}
