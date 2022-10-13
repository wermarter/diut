import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateDoctorRequestDto {
  @ApiProperty({
    example: 'BS. Lê Văn A',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}
