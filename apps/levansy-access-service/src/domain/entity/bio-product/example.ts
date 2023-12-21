import { EntityExample } from '../base-entity'
import { BioProduct } from './entity'

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
