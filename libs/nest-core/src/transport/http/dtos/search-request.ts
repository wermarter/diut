import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsObject, IsOptional, Min } from 'class-validator'
import { FilterQuery, SortOrder } from 'mongoose'

export class SearchRequestDto<TEntity> {
  @ApiProperty({
    default: 0,
    required: false,
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number

  @ApiProperty({
    default: 10,
    required: false,
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit = 10

  @ApiProperty({
    example: { createdAt: -1 },
    description: 'mongoose Query.sort()',
    required: false,
  })
  @IsOptional()
  @IsObject()
  sort?: { [key in keyof TEntity]: SortOrder | { $meta: 'textScore' } }

  @ApiProperty({
    example: {},
    description: 'mongoose FilterQuery',
    required: false,
  })
  @IsOptional()
  @IsObject()
  filter?: FilterQuery<TEntity>

  @ApiProperty({
    example: [],
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  populates?: Array<{
    path: keyof TEntity
    fields?: Array<string>
  }>
}
