import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { IsObjectId } from 'src/clients/mongo'

export class CreateTestRequestDto {
  @ApiProperty({
    example: '634180269de1f07e47bbf494',
  })
  @IsObjectId()
  category: string

  @ApiProperty({
    example: 'Tên XN',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  topBottomIndex: number
}
