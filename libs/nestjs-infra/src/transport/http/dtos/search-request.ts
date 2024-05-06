import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'
import { FilterQuery, SortOrder } from 'mongoose'

import { PopulatePath } from '../../../mongo'
import { Type } from 'class-transformer'

class PopulateOptionDto<TEntity = unknown> {
  @ApiProperty({
    example: 'results.elements.testElementId',
    type: 'string',
  })
  @IsString()
  path: PopulatePath<TEntity>

  @ApiProperty({ required: false, nullable: true, type: 'boolean' })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean | null

  @ApiProperty({ required: false, isArray: true, type: 'string' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fields?: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  match?: FilterQuery<unknown>
}

export class SearchRequestDto<TEntity = unknown> {
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
    required: false,
    type: 'number',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit: number

  @ApiProperty({
    example: { createdAt: -1 },
    description: 'mongoose Query.sort()',
    required: false,
  })
  @IsOptional()
  @IsObject()
  sort?: { [key in keyof TEntity]?: SortOrder | { $meta: 'textScore' } }

  @ApiProperty({
    example: { _id: 1 },
    required: false,
  })
  @IsOptional()
  projection?:
    | keyof TEntity
    | (keyof TEntity)[]
    | Partial<Record<keyof TEntity, number | boolean | object>>

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
    type: () => PopulateOptionDto,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PopulateOptionDto)
  populates?: PopulateOptionDto<TEntity>[]
}
