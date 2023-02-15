import { Gender, numericEnumArray } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreatePatientRequestDto {
  @ApiProperty({
    example: '1220406272',
    required: false,
  })
  @IsOptional()
  @IsString()
  externalId?: string

  @ApiProperty({
    example: 'Lê Văn A',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: Gender.Male,
    enum: numericEnumArray(Gender),
  })
  @IsEnum(Gender)
  gender: Gender

  @ApiProperty({
    example: 1999,
  })
  @IsNumber()
  birthYear: number

  @ApiProperty({
    example: 'QUẬN 11 - HCM',
  })
  @IsString()
  address: string

  @ApiProperty({
    example: '0335330808',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string

  @ApiProperty({
    example: '301719666',
    required: false,
  })
  @IsOptional()
  @IsString()
  SSN?: string
}
