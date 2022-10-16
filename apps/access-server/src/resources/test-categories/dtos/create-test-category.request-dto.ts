import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class CreateTestCategoryRequestDto {
  @ApiProperty({
    example: 'XN Huyết học - Đông máu',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  leftRightIndex: number
}
