import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateDoctorRequestDto {
  @ApiProperty({
    example: 'BS.',
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    example: 'Lê Văn A',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}
