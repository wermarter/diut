import { ApiProperty } from '@nestjs/swagger'
import { IsDateString } from 'class-validator'

export class DateRangeDto {
  @ApiProperty({
    format: 'date-time',
    example: '2023-01-02T10:15:00Z',
  })
  @IsDateString()
  startDate: Date

  @ApiProperty({
    format: 'date-time',
    example: '2023-01-06T10:15:00Z',
  })
  @IsDateString()
  endDate: Date
}
