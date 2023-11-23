import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { BaseResourceResponseDto } from '@diut/server-core'

export class SampleOriginResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'Đơn vị A',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @Min(1)
  index: number
}
