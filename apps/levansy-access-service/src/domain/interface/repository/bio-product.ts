import { BioProduct } from 'src/domain/entity'
import { IRepository } from './interface'

export const BioProductRepositoryToken = Symbol('BioProductRepository')

export interface IBioProductRepository extends IRepository<BioProduct> {
  helloCleanArchitecture(): string
}
