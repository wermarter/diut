import { BioProduct } from '@diut/hcdc'

import { IRepository } from './interface'

export const BioProductRepositoryToken = Symbol('BioProductRepository')

export interface IBioProductRepository extends IRepository<BioProduct> {}
