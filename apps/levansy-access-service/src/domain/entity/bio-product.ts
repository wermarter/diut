import { BaseEntity, EntityExample } from './base-entity'

export type BioProduct = BaseEntity & {
  name: string
  index: number
}

export const exampleBioProduct: EntityExample<BioProduct> = {
  index: {
    example: 1,
    description: 'index',
  },
  name: {
    example: 'CHIV Advia centaur',
    description: 'name',
  },
}
