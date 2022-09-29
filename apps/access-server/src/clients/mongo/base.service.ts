import { Logger } from '@nestjs/common'
import {
  FilterQuery,
  Model,
  PipelineStage,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from 'mongoose'
import { pick, isNil } from 'lodash'

export abstract class BaseMongoService<Entity> {
  constructor(protected model: Model<Entity>, protected logger: Logger) {}

  public async findById(id: string): Promise<Entity> {
    const item = await this.model.findById(id).exec()

    return item?.toObject<Entity>() ?? null
  }

  public async findOne(options?: {
    filter?: FilterQuery<Entity>
    selectedFields?: Array<string>
  }): Promise<Entity> {
    const { filter, selectedFields } = options ?? {}

    const query = this.model.findOne(filter)

    if (selectedFields?.length) {
      query.select(selectedFields.join(' '))
    }

    const item = await query.exec()

    return item?.toObject<Entity>() ?? null
  }

  public async exists(filter: FilterQuery<Entity>): Promise<boolean> {
    return !isNil((await this.model.exists(filter))?._id)
  }

  public async create(data: Partial<Entity>): Promise<Entity> {
    const item = await this.model.create(data)

    return item.toObject<Entity>()
  }

  public async count(filter: FilterQuery<Entity>): Promise<number> {
    return await this.model.countDocuments(filter)
  }

  private populate(
    query: any,
    populates?: Array<{
      collection: string
      fields?: Array<string>
    }>
  ) {
    populates.forEach((populate) => {
      if (populate.collection) {
        let populateObj = { path: populate.collection }

        if (populate.fields) {
          populateObj['select'] = populate.fields.join(' ')
        }

        query = query.populate(populateObj)
      }
    })
  }

  public async find(options?: {
    offset?: number
    limit?: number
    filter?: FilterQuery<Entity>
    sort?: string | { [key: string]: SortOrder | { $meta: 'textScore' } }
    selectedFields?: Array<string>
    populates?: Array<{
      collection: string
      fields?: Array<string>
    }>
  }): Promise<{
    total: number
    items: Entity[]
  }> {
    const { offset, limit, filter, sort, selectedFields, populates } =
      options ?? {}

    const query = this.model.find(filter)

    if (sort) {
      query.sort(sort)
    }

    if (offset) {
      query.skip((offset - 1) * limit)
      query.limit(limit)
    }

    if (selectedFields) {
      query.select(selectedFields.join(' '))
    }

    if (populates) {
      this.populate(query, populates)
    }

    const items = await query.exec()

    const total = await this.model.countDocuments(filter)

    return {
      total,
      items: items.map((item) => item.toObject<Entity>()) ?? [],
    }
  }

  public async updateById(
    id: string,
    data: UpdateQuery<Entity>,
    options?: QueryOptions<Entity>
  ): Promise<Entity> {
    const item = await this.model.findByIdAndUpdate(id, data, options).exec()

    return item?.toObject<Entity>() ?? null
  }

  public async update(
    filter: FilterQuery<Entity>,
    data: UpdateQuery<Entity>,
    options?: QueryOptions<Entity>
  ): Promise<Entity> {
    const item = await this.model.findOneAndUpdate(filter, data, options).exec()

    return item?.toObject<Entity>() ?? null
  }

  public async updateMany(
    filter: FilterQuery<Entity>,
    data: UpdateQuery<Entity>,
    options?: QueryOptions<Entity>
  ): Promise<void> {
    await this.model.updateMany(filter, data, options).exec()
  }

  public async deleteById(id: string): Promise<Entity> {
    const item = await this.model.findByIdAndDelete(id).exec()

    return item?.toObject<Entity>() ?? null
  }

  public async delete(filter: FilterQuery<Entity>): Promise<Entity> {
    const item = await this.model.findOneAndDelete(filter).exec()

    return item?.toObject<Entity>() ?? null
  }

  public async bulkUpsert(
    docs: any[],
    upsert?: {
      conditions?: Array<string>
      operator?: string
      selectedFields?: Array<string>
    }
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
    allowDiskUse = false
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
