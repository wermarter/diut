import { DeleteResult } from 'mongodb'
import {
  FilterQuery,
  PipelineStage,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from 'mongoose'
import { BaseEntity } from 'src/domain/entity'

export interface IRepository<TEntity extends BaseEntity> {
  findById(id: string): Promise<TEntity>

  findOne(options?: {
    filter?: FilterQuery<TEntity>
    projection?:
      | keyof TEntity
      | (keyof TEntity)[]
      | Record<keyof TEntity, number | boolean | object>
  }): Promise<TEntity>

  exists(filter: FilterQuery<TEntity>): Promise<boolean>

  create(entity: Omit<TEntity, keyof BaseEntity>): Promise<TEntity>

  count(filter: FilterQuery<TEntity>): Promise<number>

  search(options?: {
    offset?: number
    limit?: number
    filter?: FilterQuery<TEntity>
    sort?: { [key in keyof TEntity]?: SortOrder | { $meta: 'textScore' } }
    projection?:
      | keyof TEntity
      | (keyof TEntity)[]
      | Record<keyof TEntity, number | boolean | object>
    populates?: Array<{
      path: keyof TEntity
      fields?: Array<string>
    }>
  }): Promise<{
    total: number
    offset: number
    limit: number
    items: TEntity[]
  }>

  updateById(
    id: string,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
  ): Promise<TEntity>

  update(
    filter: FilterQuery<TEntity>,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
  ): Promise<TEntity>

  updateMany(
    filter: FilterQuery<TEntity>,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
  ): Promise<void>

  deleteById(id: string): Promise<TEntity>

  deleteMany(filter: FilterQuery<TEntity>): Promise<DeleteResult>

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
