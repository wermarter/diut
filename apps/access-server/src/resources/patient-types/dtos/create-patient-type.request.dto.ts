import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreatePatientTypeRequestDto {
  @ApiProperty({
    example: 'Bảo hiểm y tế',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}
