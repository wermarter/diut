import { PopulateConfig } from '@diut/nestjs-infra'
import { UpdateOptions } from 'mongodb'
import {
  FilterQuery,
  MongooseQueryOptions,
  PipelineStage,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from 'mongoose'

import { BaseEntity } from 'src/domain/entity'

export type EntityFindOneOptions<TEntity extends BaseEntity = BaseEntity> = {
  filter?: FilterQuery<TEntity>
  projection?:
    | keyof TEntity
    | (keyof TEntity)[]
    | Partial<Record<keyof TEntity, number | boolean | object>>
  populates?: PopulateConfig<TEntity>[]
  isDeleted?: boolean | null
}

export type EntitySearchOptions<TEntity extends BaseEntity = BaseEntity> =
  EntityFindOneOptions<TEntity> & {
    offset?: number
    limit?: number
    sort?: { [key in keyof TEntity]: SortOrder | { $meta: 'textScore' } }
  }

export type SearchResult<TEntity extends BaseEntity> = {
  total: number
  offset: number
  limit: number
  items: TEntity[]
}

export interface IRepository<TEntity extends BaseEntity = BaseEntity> {
  findById(id: string, isDeleted?: boolean | null): Promise<TEntity | null>

  findOne(options?: EntityFindOneOptions<TEntity>): Promise<TEntity | null>

  exists(
    filter: FilterQuery<TEntity>,
    isDeleted?: boolean | null,
  ): Promise<boolean>

  create(entity: Omit<TEntity, keyof BaseEntity>): Promise<TEntity>

  count(
    filter: FilterQuery<TEntity>,
    isDeleted?: boolean | null,
  ): Promise<number>

  search(options?: EntitySearchOptions<TEntity>): Promise<SearchResult<TEntity>>

  updateByIdIgnoreSoftDelete(
    id: string,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
  ): Promise<TEntity | null>

  update(
    filter: FilterQuery<TEntity>,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
    isDeleted?: boolean | null,
  ): Promise<TEntity | null>

  updateMany(
    filter: FilterQuery<TEntity>,
    data: UpdateQuery<TEntity>,
    options?: UpdateOptions & Omit<MongooseQueryOptions<TEntity>, 'lean'>,
    isDeleted?: boolean | null,
  ): Promise<void>

  deleteById(id: string, softDelete?: boolean): Promise<TEntity | null>

  deleteMany(filter: FilterQuery<TEntity>, softDelete?: boolean): Promise<void>

  bulkUpsertIgnoreSoftDelete(
    docs: unknown[],
    upsert?: {
      conditions?: Array<string>
      operator?: string
      selectedFields?: Array<string>
    },
  ): Promise<void>

  bulkWriteIgnoreSoftDelete(data: Array<object>): Promise<void>

  aggregateIgnoreSoftDelete<Result = any>(
    pipelines: Array<PipelineStage>,
    allowDiskUse?: boolean,
  ): Promise<Array<Result>>
}
