import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class CreateDoctorRequestDto {
  @ApiProperty({
    example: 'BS. Lê Văn A',
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
}
