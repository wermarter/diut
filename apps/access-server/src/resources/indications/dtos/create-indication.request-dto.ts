import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateIndicationRequestDto {
  @ApiProperty({
    example: 'Kiểm tra sức khỏe',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}
