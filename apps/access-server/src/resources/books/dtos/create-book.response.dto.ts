import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class CreateBookResponseDto {
  @ApiProperty({
    example: 'RandomBook',
  })
  @Expose()
  name: string

  // @ApiProperty({
  //   type: String,
  //   enum: BookGenre,
  //   default: BookGenre.Classic,
  // })
  // genre: BookGenre

  // @ApiProperty({
  //   default: 1,
  // })
  // stock: number
}
