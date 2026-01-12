import { isNil, pick } from 'es-toolkit'
import { UpdateOptions } from 'mongodb'
import {
  FilterQuery,
  Model,
  MongooseUpdateQueryOptions,
  PipelineStage,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from 'mongoose'
import { BaseSchema, PopulateConfig } from './common'

export abstract class MongoRepository<TEntity extends BaseSchema> {
  constructor(public readonly model: Model<TEntity>) {}

  public async findById(
    id: string,
    isDeleted: boolean | null = false,
  ): Promise<TEntity | null> {
    if (isDeleted === null) {
      const item = await this.model.findById(id).lean()
      return item as TEntity | null
    }

    return this.findOne({ filter: { _id: id }, isDeleted })
  }

  public async findOne(options: {
    filter: FilterQuery<TEntity>
    projection?:
      | keyof TEntity
      | (keyof TEntity)[]
      | Partial<Record<keyof TEntity, number | boolean | object>>
    populates?: PopulateConfig<TEntity>[]
    isDeleted?: boolean | null
  }): Promise<TEntity | null> {
    const { filter, projection, populates, isDeleted } = options ?? {}
    let query: any

    if (isDeleted === null) {
      query = this.model.findOne(filter as any)
    } else {
      query = this.model.findOne({
        $and: [filter, { isDeleted: isDeleted ?? false }],
      } as any)
    }

    if (projection != undefined) {
      // @ts-ignore
      query.select(projection)
    }

    if (populates != undefined) {
      this.populate(query, populates)
    }

    const item = await query.lean()
    return item as TEntity | null
  }

  public async exists(
    filter: FilterQuery<TEntity>,
    isDeleted: boolean | null = false,
  ): Promise<boolean> {
    let filterObj = filter

    if (isDeleted !== null) {
      filterObj = {
        $and: [filter, { isDeleted }],
      }
    }

    return !isNil((await this.model.exists(filterObj).lean())?._id)
  }

  public async create(data: Omit<TEntity, keyof BaseSchema>): Promise<TEntity> {
    const item = await this.model.create(data)

    return item.toObject<TEntity>()
  }

  public async count(
    filter: FilterQuery<TEntity>,
    isDeleted: boolean | null = false,
  ): Promise<number> {
    let filterObj = filter

    if (isDeleted !== null) {
      filterObj = {
        $and: [filter, { isDeleted }],
      }
    }

    return await this.model.countDocuments(filterObj).exec()
  }

  private populate(query: any, populates: PopulateConfig<TEntity>[]) {
    populates.forEach((populate) => {
      const isDeleted =
        populate.isDeleted !== null ? (populate.isDeleted ?? false) : null
      if (populate.path) {
        let populateObj = { path: populate.path, populate: populate.populate }

        if (populate.fields) {
          populateObj['select'] = populate.fields.join(' ')
        }

        if (populate.match !== undefined) {
          let matchObject: typeof populate.match

          if (typeof populate.match === 'function') {
            matchObject = populate.match()
          } else {
            matchObject = populate.match
          }

          if (isDeleted !== null) {
            matchObject = {
              $and: [{ isDeleted }, matchObject],
            }
          }

          populateObj['match'] = matchObject
        } else {
          if (isDeleted !== null) {
            populateObj['match'] = { isDeleted }
          }
        }

        query = query.populate(populateObj)
      }
    })
  }

  public async search(options: {
    offset?: number
    limit?: number
    filter?: FilterQuery<TEntity>
    sort?: { [key in keyof TEntity]?: SortOrder | { $meta: 'textScore' } }
    projection?:
      | keyof TEntity
      | (keyof TEntity)[]
      | Partial<Record<keyof TEntity, number | boolean | object>>
    populates?: PopulateConfig<TEntity>[]
    isDeleted?: boolean | null
  }): Promise<{
    total: number
    offset: number
    limit: number
    items: TEntity[]
  }> {
    const { offset, limit, filter, sort, projection, populates } = options ?? {}
    const isDeleted =
      options.isDeleted !== null ? (options.isDeleted ?? false) : null

    let filterObj = filter ?? {}

    if (isDeleted !== null) {
      filterObj = {
        $and: [filterObj, { isDeleted }],
      }
    }

    const query = this.model.find(filterObj)

    if (sort) {
      // @ts-ignore
      query.sort(sort)
    }

    if (offset != undefined && limit != undefined) {
      query.skip(offset * limit)
      query.limit(limit)
    }

    if (projection != undefined) {
      // @ts-ignore
      query.select(projection)
    }

    if (populates) {
      this.populate(query, populates)
    }

    const items = (await query.exec()) as any[]

    const total = await this.count(filter ?? {})

    return {
      total,
      offset: offset ?? 0,
      limit: limit ?? -1,
      items: items?.map((item) => item.toObject()) ?? [],
    }
  }

  public async updateByIdIgnoreSoftDelete(
    id: string,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
  ): Promise<TEntity | null> {
    const item = (await (this.model as any)
      .findByIdAndUpdate(id, data as any, options as any)
      .lean()) as any

    return item as TEntity | null
  }

  public async update(
    filter: FilterQuery<TEntity>,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
    isDeleted: boolean | null = false,
  ): Promise<TEntity | null> {
    let filterObj = filter

    if (isDeleted !== null) {
      filterObj = {
        $and: [filter, { isDeleted }],
      } as any
    }

    const query = (this.model as any).findOneAndUpdate(
      filterObj as any,
      data as any,
      options as any,
    )
    const item = (await query.lean()) as TEntity | null

    return item
  }

  public async updateMany(
    filter: FilterQuery<TEntity>,
    data: UpdateQuery<TEntity>,
    options?: UpdateOptions & Omit<MongooseUpdateQueryOptions<TEntity>, 'lean'>,
    isDeleted: boolean | null = false,
  ): Promise<void> {
    let filterObj = filter

    if (isDeleted !== null) {
      filterObj = {
        $and: [filter, { isDeleted }],
      }
    }

    await this.model.updateMany(filterObj, data, options as any).lean()
  }

  public async deleteById(
    id: string,
    softDelete = true,
  ): Promise<TEntity | null> {
    if (!softDelete) {
      const query = (this.model as any).findByIdAndDelete(id)
      const item = await query.lean()
      return item as TEntity | null
    }

    const query = (this.model as any).findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    })
    const item = await query.lean()
    return item as TEntity | null
  }

  public async deleteMany(
    filter: FilterQuery<TEntity>,
    softDelete = true,
  ): Promise<void> {
    if (!softDelete) {
      this.model.deleteMany(filter).exec()
      return
    }

    await this.model
      .updateMany(filter, { isDeleted: true, deletedAt: new Date() })
      .exec()
  }

  public async bulkUpsertIgnoreSoftDelete(
    docs: unknown[],
    upsert?: {
      conditions?: Array<string>
      operator?: string
      selectedFields?: Array<string>
    },
  ): Promise<void> {
    let { selectedFields, conditions, operator = 'set' } = upsert ?? {}

    const writes = docs?.map((doc) => {
      return {
        updateOne: {
          filter: pick(doc as any, conditions ?? ['id']),
          update: {
            [`$${operator}`]: selectedFields
              ? pick(doc as any, selectedFields)
              : doc,
          },
          upsert: true,
        },
      }
    })

    await this.model.bulkWrite(writes as any)
  }

  public async bulkWriteIgnoreSoftDelete(data: Array<object>): Promise<void> {
    await this.model.bulkWrite(data as any)
  }

  public async aggregateIgnoreSoftDelete<Result = any>(
    pipelines: Array<PipelineStage>,
    allowDiskUse = true,
  ): Promise<Array<Result>> {
    return await this.model
      .aggregate<Result>(pipelines)
      .allowDiskUse(allowDiskUse)
      .exec()
  }

  // public async aggregateCursor(
  //   pipelines: Array<PipelineStage>,
  //   batchSize: number
  // ): Promise<any> {
  //   return this.model
  //     .aggregate(pipelines)
  //     .allowDiskUse(true)
  //     .cursor({ batchSize: batchSize })
  //     .exec()
  // }
}
