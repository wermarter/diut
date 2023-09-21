import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class CreateTestComboRequestDto {
  @ApiProperty({
    example: 'Combo Sinh hoá',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  index: number

  // TODO: impl IsObjectIdArray
  @ApiProperty({
    example: ['634180269de1f07e47bbf494'],
  })
  @IsString({ each: true })
  children: string[]
}
