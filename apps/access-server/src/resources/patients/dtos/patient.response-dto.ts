import { Gender, numericEnumArray } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

import { BaseResourceResponseDto } from 'src/clients/mongo'

export class PatientResponseDto extends BaseResourceResponseDto {
  @Expose()
  @ApiProperty({
    example: '1220406272',
  })
  @IsString()
  @IsNotEmpty()
  externalId: string

  @Expose()
  @ApiProperty({
    example: 'Lê Văn A',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @Expose()
  @ApiProperty({
    example: Gender.Male,
    enum: numericEnumArray(Gender),
  })
  @IsEnum(Gender)
  gender: Gender

  @Expose()
  @ApiProperty({
    example: 1999,
  })
  @IsNumber()
  birthYear: number

  @Expose()
  @ApiProperty({
    example: 'QUẬN 11 - HCM',
  })
  @IsString()
  @IsNotEmpty()
  address: string

  @Expose()
  @ApiProperty({
    example: '0335330808',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string

  @Expose()
  @ApiProperty({
    example: '301719666',
  })
  @IsString()
  @IsNotEmpty()
  SSN: string
}
