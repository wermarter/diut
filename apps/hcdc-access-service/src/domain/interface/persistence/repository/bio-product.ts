import { BioProduct } from '@diut/hcdc'

import { IRepository } from './interface'

export const BIOPRODUCT_REPO_TOKEN = Symbol('BIOPRODUCT_REPO_TOKEN')

export interface IBioProductRepository extends IRepository<BioProduct> {}
