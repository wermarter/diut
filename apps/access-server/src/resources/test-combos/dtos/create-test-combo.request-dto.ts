import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTestComboRequestDto {
  @ApiProperty({
    example: 'Combo Sinh hoá',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  // TODO: impl IsObjectIdArray
  @ApiProperty({
    example: ['634180269de1f07e47bbf494'],
  })
  @IsString({ each: true })
  children: string[]
}
