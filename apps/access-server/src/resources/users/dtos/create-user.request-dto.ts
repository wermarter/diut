import { Role, Permission } from '@diut/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'levana',
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    example: 'Lê Văn A',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({
    example: '0330556666',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string

  @ApiProperty({
    example: [Role.User],
    enum: Role,
    isArray: true,
  })
  @IsEnum(Role, { each: true })
  roles: Role[]

  @ApiProperty({
    example: [Permission.ManageDoctor],
    enum: Permission,
    isArray: true,
  })
  @IsEnum(Permission, { each: true })
  permissions: Permission[]
}
