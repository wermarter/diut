import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { BaseResourceResponseDto } from '@diut/nest-core'

import { exampleRole } from 'src/domain'

export class RoleResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty(exampleRole.index)
  @IsNumber()
  @Min(1)
  index: number

  @Expose()
  @ApiProperty(exampleRole.name)
  @IsString()
  @IsNotEmpty()
  name: string
}
