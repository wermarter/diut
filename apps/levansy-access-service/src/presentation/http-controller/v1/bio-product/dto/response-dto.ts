import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { BaseResourceResponseDto } from '@diut/nest-core'

export class BioProductResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: 'CHIV Advia centaur',
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
