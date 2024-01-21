import { EntityDataExample } from '../base-entity'
import { BioProduct } from './entity'

export const exampleBioProduct = {
  index: {
    example: 1,
  },
  name: {
    example: 'CHIV Advia centaur',
  },
} satisfies EntityDataExample<BioProduct>
