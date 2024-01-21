import {
  FilterQuery,
  PipelineStage,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from 'mongoose'

import { BaseEntity } from 'src/domain/entity'

export type EntitySearchOptions<TEntity> = {
  offset?: number
  limit?: number
  filter?: FilterQuery<TEntity>
  sort?: { [key in keyof TEntity]: SortOrder | { $meta: 'textScore' } }
  projection?:
    | keyof TEntity
    | (keyof TEntity)[]
    | Record<keyof TEntity, number | boolean | object>
  populates?: Array<{
    path: keyof TEntity
    fields?: Array<string>
  }>
}

export type SearchResult<TEntity extends BaseEntity> = {
  total: number
  offset: number
  limit: number
  items: TEntity[]
}

export type EntityFindOneOptions<TEntity> = {
  filter: FilterQuery<TEntity>
  projection?:
    | keyof TEntity
    | (keyof TEntity)[]
    | Record<keyof TEntity, number | boolean | object>
  populates?: Array<{
    path: keyof TEntity
    fields?: Array<string>
  }>
}

export interface IRepository<TEntity extends BaseEntity> {
  findById(id: string): Promise<TEntity | null>

  findOne(options?: EntityFindOneOptions<TEntity>): Promise<TEntity | null>

  exists(filter: FilterQuery<TEntity>): Promise<boolean>

  create(entity: Omit<TEntity, keyof BaseEntity>): Promise<TEntity>

  count(filter: FilterQuery<TEntity>): Promise<number>

  search(options?: EntitySearchOptions<TEntity>): Promise<SearchResult<TEntity>>

  updateById(
    id: string,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
  ): Promise<TEntity | null>

  update(
    filter: FilterQuery<TEntity>,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
  ): Promise<TEntity | null>

  updateMany(
    filter: FilterQuery<TEntity>,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
  ): Promise<void>

  deleteById(id: string): Promise<TEntity>

  deleteMany(filter: FilterQuery<TEntity>): Promise<void>

  bulkUpsert(
    docs: unknown[],
    upsert?: {
      conditions?: Array<string>
      operator?: string
      selectedFields?: Array<string>
    },
  ): Promise<void>

  bulkWrite(data: Array<object>): Promise<void>

  aggregate<Result = any>(
    pipelines: Array<PipelineStage>,
    allowDiskUse?: boolean,
  ): Promise<Array<Result>>
}
