import { ApiProperty } from '@nestjs/swagger'
import { ClassConstructor, Expose, Type } from 'class-transformer'
import { IsNumber, ValidateNested } from 'class-validator'

export function PaginatedResponse<ItemType extends ClassConstructor<unknown>>(
  ItemClass: ItemType,
) {
  class PaginationDtoClass {
    @Expose()
    @ApiProperty()
    @IsNumber()
    total: number

    @Expose()
    @ApiProperty()
    @IsNumber()
    offset: number

    @Expose()
    @ApiProperty()
    @IsNumber()
    limit: number

    @Expose()
    @ApiProperty({
      type: () => ItemClass,
      isArray: true,
    })
    @Type(() => ItemClass)
    @ValidateNested({ each: true })
    items: (typeof ItemClass)[]
  }

  return PaginationDtoClass
}
