import { IsObjectId } from '@diut/nestjs-core'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

import { exampleDoctor } from 'src/domain'

export class DoctorCreateRequestDto {
  @Expose()
  @ApiProperty(exampleDoctor.displayIndex)
  @IsNumber()
  @Min(1)
  displayIndex: number

  @Expose()
  @ApiProperty(exampleDoctor.name)
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty(exampleDoctor.branchId)
  @IsObjectId()
  branchId: string
}
