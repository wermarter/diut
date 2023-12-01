import {
  FilterQuery,
  Model,
  PipelineStage,
  QueryOptions,
  Require_id,
  SortOrder,
  UpdateQuery,
} from 'mongoose'
import { pick, isNil } from 'lodash'
import { DeleteResult } from 'mongodb'

import { BaseSchema } from './mongo.common'

export abstract class MongoRepository<Entity extends BaseSchema> {
  constructor(public readonly model: Model<Entity>) {}

  private cleanEntity(object: Require_id<Entity>) {
    if (object == null) {
      return object
    }

    // stringify ID
    const id = object._id.toString()
    object._id = id

    // @ts-ignore
    delete object.__v!

    return object
  }

  public async findById(id: string): Promise<Entity> {
    const item = await this.model.findById(id).exec()

    return this.cleanEntity(item?.toObject<Entity>()) ?? null
  }

  public async findOne(options?: {
    filter?: FilterQuery<Entity>
    projection?:
      | keyof Entity
      | (keyof Entity)[]
      | Record<keyof Entity, number | boolean | object>
  }): Promise<Entity> {
    const { filter, projection } = options ?? {}

    const query = this.model.findOne(filter)

    if (projection !== undefined) {
      // @ts-ignore
      query.select(projection)
    }

    const item = await query.exec()

    return this.cleanEntity(item?.toObject<Entity>()) ?? null
  }

  public async exists(filter: FilterQuery<Entity>): Promise<boolean> {
    return !isNil((await this.model.exists(filter).exec())?._id)
  }

  public async create(data: Omit<Entity, keyof BaseSchema>): Promise<Entity> {
    const item = await this.model.create(data)

    return this.cleanEntity(item.toObject<Entity>())
  }

  public async count(filter: FilterQuery<Entity>): Promise<number> {
    return await this.model.countDocuments(filter).exec()
  }

  private populate(
    query: any,
    populates?: Array<{
      path: keyof Entity
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
    filter?: FilterQuery<Entity>
    sort?: { [key in keyof Entity]?: SortOrder | { $meta: 'textScore' } }
    projection?:
      | keyof Entity
      | (keyof Entity)[]
      | Record<keyof Entity, number | boolean | object>
    populates?: Array<{
      path: keyof Entity
      fields?: Array<string>
    }>
  }) {
    const { offset, limit, filter, sort, projection, populates } = options ?? {}

    const query = this.model.find(filter)

    if (sort) {
      query.sort(sort)
    }

    if (offset !== undefined) {
      query.skip(offset * limit)
      query.limit(limit)
    }

    if (projection !== undefined) {
      // @ts-ignore
      query.select(projection)
    }

    if (populates) {
      this.populate(query, populates)
    }

    const items = await query.exec()

    const total = await this.count(filter)

    return {
      total,
      offset,
      limit,
      items:
        items.map((item) => this.cleanEntity(item.toObject<Entity>())) ?? [],
    }
  }

  public async updateById(
    id: string,
    data: UpdateQuery<Entity>,
    options?: QueryOptions<Entity>,
  ): Promise<Entity> {
    const item = await this.model.findByIdAndUpdate(id, data, options).exec()

    return this.cleanEntity(item?.toObject<Entity>()) ?? null
  }

  public async update(
    filter: FilterQuery<Entity>,
    data: UpdateQuery<Entity>,
    options?: QueryOptions<Entity>,
  ): Promise<Entity> {
    const item = await this.model.findOneAndUpdate(filter, data, options).exec()

    return this.cleanEntity(item?.toObject<Entity>()) ?? null
  }

  public async updateMany(
    filter: FilterQuery<Entity>,
    data: UpdateQuery<Entity>,
    options?: QueryOptions<Entity>,
  ): Promise<void> {
    await this.model.updateMany(filter, data, options).exec()
  }

  public async deleteById(id: string): Promise<Entity> {
    const item = await this.model.findByIdAndDelete(id).exec()

    return this.cleanEntity(item?.toObject<Entity>()) ?? null
  }

  public async deleteMany(filter: FilterQuery<Entity>): Promise<DeleteResult> {
    return this.model.deleteMany(filter).exec()
  }

  public async bulkUpsert(
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

  public async bulkWrite(data: Array<object>): Promise<void> {
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
