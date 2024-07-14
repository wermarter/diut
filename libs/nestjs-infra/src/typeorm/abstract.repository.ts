import { ObjectLiteral, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export class AbstractTypeOrmRepository<TEntity extends ObjectLiteral> {
  constructor(public readonly repo: Repository<TEntity>) {}

  async create(entity: Omit<TEntity, 'id'>) {
    const result = await this.repo
      .createQueryBuilder()
      .insert()
      .values(entity as any)
      .execute()

    return result.identifiers[0].id as TEntity['id']
  }

  findOne(query: QueryDeepPartialEntity<TEntity>) {
    return this.repo.createQueryBuilder().select().where(query).getOne()
  }

  findMany(query: QueryDeepPartialEntity<TEntity>) {
    return this.repo.createQueryBuilder().select().where(query).getMany()
  }

  updateOne(query: QueryDeepPartialEntity<TEntity>, entity: Partial<TEntity>) {
    return this.repo
      .createQueryBuilder()
      .update()
      .set(entity)
      .where(query)
      .execute()
  }

  deleteOne(query: QueryDeepPartialEntity<TEntity>) {
    return this.repo.createQueryBuilder().delete().where(query).execute()
  }
}
