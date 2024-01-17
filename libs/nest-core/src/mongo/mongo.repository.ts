import {
  FilterQuery,
  Model,
  PipelineStage,
  QueryOptions,
  SortOrder,
  ToObjectOptions,
  UpdateQuery,
} from 'mongoose'
import { pick, isNil } from 'lodash'

import { BaseSchema } from './mongo.common'

export abstract class MongoRepository<TEntity extends BaseSchema> {
  private toObjectOptions: ToObjectOptions = {
    getters: true,
    virtuals: true,
    minimize: false,
    versionKey: false,
    flattenMaps: true,
    flattenObjectIds: true,
  }

  constructor(public readonly model: Model<TEntity>) {}

  public async findById(id: string) {
    const item: TEntity | null = await this.model.findById(id).lean()

    return item
  }

  public async findOne(options?: {
    filter?: FilterQuery<TEntity>
    projection?:
      | keyof TEntity
      | (keyof TEntity)[]
      | Record<keyof TEntity, number | boolean | object>
    populates?: Array<{
      path: keyof TEntity
      fields?: Array<string>
    }>
  }) {
    const { filter, projection, populates } = options ?? {}

    const query = this.model.findOne(filter)

    if (projection != undefined) {
      // @ts-ignore
      query.select(projection)
    }

    if (populates != undefined) {
      this.populate(query, populates)
    }

    const item: TEntity | null = await query.lean()
    return item
  }

  public async exists(filter: FilterQuery<TEntity>) {
    return !isNil((await this.model.exists(filter).lean())?._id)
  }

  public async create(data: Omit<TEntity, keyof BaseSchema>): Promise<TEntity> {
    const item = await this.model.create(data)

    return item.toObject<TEntity>(this.toObjectOptions)
  }

  public async count(filter: FilterQuery<TEntity>) {
    return await this.model.countDocuments(filter).exec()
  }

  private populate(
    query: any,
    populates: Array<{
      path: keyof TEntity
      fields?: Array<string>
    }>,
  ) {
    populates.forEach((populate) => {
      if (populate.path) {
        let populateObj = { path: populate.path }

        if (populate.fields) {
          populateObj['select'] = populate.fields.join(' ')
        }

        query = query.populate(populateObj)
      }
    })
  }

  public async search(options?: {
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
  }) {
    const { offset, limit, filter, sort, projection, populates } = options ?? {}

    const query = this.model.find(filter ?? {})

    if (sort) {
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

    const items = await query.lean()

    const total = await this.count(filter ?? {})

    return {
      total,
      offset: offset ?? 0,
      limit: limit ?? -1,
      items: items?.map((item) => item as TEntity) ?? [],
    }
  }

  public async updateById(
    id: string,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
  ) {
    const item: TEntity | null = await this.model
      .findByIdAndUpdate(id, data, options)
      .lean()

    return item
  }

  public async update(
    filter: FilterQuery<TEntity>,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
  ) {
    const item: TEntity | null = await this.model
      .findOneAndUpdate(filter, data, options)
      .lean()

    return item
  }

  public async updateMany(
    filter: FilterQuery<TEntity>,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
  ) {
    await this.model.updateMany(filter, data, options).lean()
  }

  public async deleteById(id: string) {
    const item: TEntity = await this.model.findByIdAndDelete(id).lean()

    return item
  }

  public async deleteMany(filter: FilterQuery<TEntity>) {
    await this.model.deleteMany(filter).exec()
  }

  public async bulkUpsert(
    docs: unknown[],
    upsert?: {
      conditions?: Array<string>
      operator?: string
      selectedFields?: Array<string>
    },
  ) {
    let { selectedFields, conditions, operator = 'set' } = upsert ?? {}

    const writes = docs?.map((doc) => {
      return {
        updateOne: {
          filter: pick(doc, conditions ?? ['id']),
          update: {
            [`$${operator}`]: selectedFields ? pick(doc, selectedFields) : doc,
          },
          upsert: true,
        },
      }
    })

    await this.model.bulkWrite(writes)
  }

  public async bulkWrite(data: Array<object>) {
    await this.model.bulkWrite(data as any)
  }

  public async aggregate<Result = any>(
    pipelines: Array<PipelineStage>,
    allowDiskUse = false,
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
