import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { BaseResponseDto } from 'src/core'

export class PatientTypeResponseDto extends BaseResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Bảo hiểm y tế',
  })
  name: string
}
