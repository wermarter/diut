#!/usr/bin/env ts-node -r tsconfig-paths/register

import { SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import { TestElement, TestElementService } from 'src/resources/test-elements'
import { COLLECTION } from 'src/common/collections'

async function main(srcTestId: string, destTestId: string) {
  await mongoose.connect(process.env.PROD_MONGO_URI)
  console.log('MongoDB connected !')

  const model = mongoose.model(
    COLLECTION.TEST_ELEMENT,
    SchemaFactory.createForClass(TestElement)
  )
  const service = new TestElementService(model)

  const isNotEmpty =
    (await service.search({ filter: { test: destTestId } })).total > 0
  if (isNotEmpty) {
    console.log('Destination collection is not empty. Skipping...')
    process.exit(1)
  }

  const elements = (
    await service.search({
      filter: { test: srcTestId },
    })
  ).items.map((item) => ({
    ...item,
    test: '',
  }))

  const promises = elements.map(({ _id, ...restElement }) => {
    return service.create({
      ...restElement,
      test: destTestId,
    })
  })

  await Promise.all(promises)
  console.log(`Sucessfully duplicated test elements!`)

  process.exit(0)
}

main('635341543b685db3059d8b97', '6353415e3b685db3059d8ba1')
