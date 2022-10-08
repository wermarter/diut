import { ApiProperty } from '@nestjs/swagger'
import { Expose, Transform } from 'class-transformer'

export class BaseResponseDto {
  // https://github.com/typestack/class-transformer/issues/494
  @Expose()
  @Transform(({ obj }) => obj._id, { toClassOnly: true })
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  _id: string

  @Expose()
  @ApiProperty({ format: 'date-time', example: '2018-03-20T09:12:28Z' })
  createdAt: Date

  @Expose()
  @ApiProperty({ format: 'date-time', example: '2018-03-20T09:12:28Z' })
  updatedAt: Date
}
