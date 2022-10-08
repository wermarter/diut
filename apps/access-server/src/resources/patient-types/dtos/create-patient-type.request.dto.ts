import { ApiProperty } from '@nestjs/swagger'

export class CreatePatientTypeRequestDto {
  @ApiProperty({
    example: 'Bảo hiểm y tế',
  })
  name: string
}
