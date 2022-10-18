import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  children: string[]
}
