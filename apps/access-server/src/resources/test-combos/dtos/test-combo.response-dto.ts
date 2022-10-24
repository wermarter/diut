import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

import { BaseResourceResponseDto, ExposeObjectId } from 'src/clients/mongo'

export class TestComboResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Combo Sinh hoá',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ExposeObjectId()
  @ApiProperty({
    example: ['634180269de1f07e47bbf494'],
  })
  @IsString({ each: true })
  children: string[]
}
