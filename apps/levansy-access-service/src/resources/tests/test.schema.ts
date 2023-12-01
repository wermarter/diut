import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { BaseSchema, baseSchemaOptions } from '@diut/nest-core'
import { COLLECTION } from 'src/common/collections'
import { PrintForm } from '../print-forms/print-form.schema'
import { BioProduct } from '../bio-products/bio-product.schema'
import { TestCategory } from '../test-categories/test-category.schema'

@Schema({
  ...baseSchemaOptions,
  collection: COLLECTION.TEST,
})
export class Test extends BaseSchema {
  @Prop({
    type: Types.ObjectId,
    ref: TestCategory.name,
    index: true,
    required: true,
    autopopulate: true,
  })
  category: string | TestCategory | null

  @Prop({
    type: Types.ObjectId,
    ref: BioProduct.name,
    index: true,
    autopopulate: true,
  })
  bioProduct?: string | BioProduct | null

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  index: number

  @Prop({ type: Types.ObjectId, ref: PrintForm.name, required: true })
  printForm: string | PrintForm

  @Prop({ required: true })
  shouldNotPrint: boolean

  @Prop({ required: true })
  shouldDisplayWithChildren: boolean
}
