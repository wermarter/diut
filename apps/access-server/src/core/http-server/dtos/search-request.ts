import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsObject, IsOptional, Min } from 'class-validator'
import { FilterQuery, SortOrder } from 'mongoose'

export class SearchRequestDto<Entity> {
  @ApiProperty({
    default: 1,
    required: false,
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  offset = 1

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
  sort?: { [key: string]: SortOrder | { $meta: 'textScore' } }

  @ApiProperty({
    example: {
      $and: [{ someField: 18 }, { randomField: 'will be ignored' }],
    },
    description: 'mongoose FilterQuery',
    required: false,
  })
  @IsOptional()
  @IsObject()
  filter?: FilterQuery<Entity>
}
