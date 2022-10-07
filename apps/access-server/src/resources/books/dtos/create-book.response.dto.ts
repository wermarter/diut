import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsInt, IsString, Min, MinLength } from 'class-validator'
import { BookGenre } from '@diut/common'
import { Expose } from 'class-transformer'

export class CreateBookResponseDto {
  @ApiProperty({
    default: 'RandomBookname',
  })
  @Expose()
  @IsString()
  @MinLength(1)
  name: string

  // @ApiProperty({
  //   type: String,
  //   enum: BookGenre,
  //   default: BookGenre.Classic,
  // })
  // @IsEnum(BookGenre)
  // genre: BookGenre

  // @ApiProperty({
  //   default: 1,
  // })
  // @IsInt()
  // @Min(0)
  // stock: number
}
