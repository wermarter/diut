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

  public async findById(id: string, isDeleted: boolean | null = false) {
    if (isDeleted === null) {
      return this.model.findById(id).lean()
    }

    return this.findOne({ filter: { _id: id }, isDeleted })
  }

  public async findOne(options: {
    filter: FilterQuery<TEntity>
    projection?:
      | keyof TEntity
      | (keyof TEntity)[]
      | Record<keyof TEntity, number | boolean | object>
    populates?: Array<{
      path: keyof TEntity
      isDeleted?: boolean | null
      fields?: Array<string>
      match?: FilterQuery<TEntity> | (() => FilterQuery<TEntity>)
    }>
    isDeleted?: boolean | null
  }) {
    const { filter, projection, populates, isDeleted } = options ?? {}
    let query: ReturnType<typeof this.model.findOne>

    if (isDeleted === null) {
      query = this.model.findOne(filter)
    } else {
      query = this.model.findOne({
        $and: [filter, { isDeleted: isDeleted ?? false }],
      })
    }

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

  public async exists(
    filter: FilterQuery<TEntity>,
    isDeleted: boolean | null = false,
  ) {
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

    return item.toObject<TEntity>(this.toObjectOptions)
  }

  public async count(
    filter: FilterQuery<TEntity>,
    isDeleted: boolean | null = false,
  ) {
    let filterObj = filter

    if (isDeleted !== null) {
      filterObj = {
        $and: [filter, { isDeleted }],
      }
    }

    return await this.model.countDocuments(filterObj).exec()
  }

  private populate(
    query: any,
    populates: Array<{
      path: keyof TEntity
      isDeleted?: boolean | null
      fields?: Array<string>
      match?: FilterQuery<TEntity> | (() => FilterQuery<TEntity>)
    }>,
  ) {
    populates.forEach((populate) => {
      const isDeleted =
        populate.isDeleted !== null ? populate.isDeleted ?? false : null
      if (populate.path) {
        let populateObj = { path: populate.path }

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
    sort?: { [key in keyof TEntity]: SortOrder | { $meta: 'textScore' } }
    projection?:
      | keyof TEntity
      | (keyof TEntity)[]
      | Record<keyof TEntity, number | boolean | object>
    populates?: Array<{
      path: keyof TEntity
      isDeleted?: boolean | null
      fields?: Array<string>
      match?: FilterQuery<TEntity> | (() => FilterQuery<TEntity>)
    }>
    isDeleted?: boolean | null
  }) {
    const { offset, limit, filter, sort, projection, populates } = options ?? {}
    const isDeleted =
      options.isDeleted !== null ? options.isDeleted ?? false : null

    let filterObj = filter ?? {}

    if (isDeleted !== null) {
      filterObj = {
        $and: [filterObj, { isDeleted }],
      }
    }

    const query = this.model.find(filterObj)

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

  public async updateByIdIgnoreSoftDelete(
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
    isDeleted: boolean | null = false,
  ) {
    let filterObj = filter

    if (isDeleted !== null) {
      filterObj = {
        $and: [filter, { isDeleted }],
      }
    }

    const item: TEntity | null = await this.model
      .findOneAndUpdate(filterObj, data, options)
      .lean()

    return item
  }

  public async updateMany(
    filter: FilterQuery<TEntity>,
    data: UpdateQuery<TEntity>,
    options?: QueryOptions<TEntity>,
    isDeleted: boolean | null = false,
  ) {
    let filterObj = filter

    if (isDeleted !== null) {
      filterObj = {
        $and: [filter, { isDeleted }],
      }
    }

    await this.model.updateMany(filterObj, data, options).lean()
  }

  public async deleteById(id: string, softDelete = true) {
    if (!softDelete) {
      return this.model.findByIdAndDelete(id).lean<TEntity>()
    }

    return this.model
      .findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() })
      .lean<TEntity>()
  }

  public async deleteMany(filter: FilterQuery<TEntity>, softDelete = true) {
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

  public async bulkWriteIgnoreSoftDelete(data: Array<object>) {
    await this.model.bulkWrite(data as any)
  }

  public async aggregateIgnoreSoftDelete<Result = any>(
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
