import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { DateRangeDto } from './date-range.request-dto'

export class ExportGiaoNhanRequestDto extends DateRangeDto {
  @ApiProperty({
    example: ['634180269de1f07e47bbf494'],
  })
  @IsString({ each: true })
  testIds: string[]

  @ApiProperty({
    example: ['634180269de1f07e47bbf494'],
  })
  @IsString({ each: true })
  testComboIds: string[]
}
