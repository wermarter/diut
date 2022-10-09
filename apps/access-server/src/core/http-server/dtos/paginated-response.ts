import { ApiProperty } from '@nestjs/swagger'
import { ClassConstructor, Expose, Type } from 'class-transformer'

export function PaginatedResponse<ItemType extends ClassConstructor<unknown>>(
  ItemClass: ItemType
) {
  abstract class PaginationDtoClass {
    @Expose()
    @ApiProperty()
    total: number

    @Expose()
    @ApiProperty()
    offset: number

    @Expose()
    @ApiProperty()
    limit: number

    @Expose()
    @ApiProperty({
      type: () => ItemClass,
      isArray: true,
    })
    @Type(() => ItemClass)
    items: ItemType[]
  }

  return PaginationDtoClass as ClassConstructor<{
    total: number
    offset: number
    limit: number
    items: ItemType[]
  }>
}
