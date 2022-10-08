import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class UserResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Le Van A',
  })
  name: string
}
