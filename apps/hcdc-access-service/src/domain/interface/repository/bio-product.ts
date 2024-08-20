import { BioProduct } from '@diut/hcdc'

import { IRepository } from './interface'

export const BIOPRODUCT_REPO_TOKEN = Symbol('BioProductRepository')

export interface IBioProductRepository extends IRepository<BioProduct> {}
