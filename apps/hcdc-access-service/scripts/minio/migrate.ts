#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register
import { AwsS3ClientService } from '@diut/nestjs-infra'
import { SchemaFactory } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'
dotenv.config()

import { StorageBucket, StorageKeyFactory } from 'src/domain'
import { COLLECTION } from 'src/infra/mongo'
import {
  TestElementRepository,
  TestElementSchema,
} from 'src/infra/mongo/test-element'

async function main() {
  const srcClientService = new AwsS3ClientService({
    endpoint: `http://localhost:9000`,
    credentials: {
      accessKeyId: process.env.SRC_MINIO_ACCESS_KEY!,
      secretAccessKey: process.env.SRC_MINIO_SECRET_KEY!,
    },
    region: process.env.MINIO_REGION,
    forcePathStyle: true,
  })
  const destClientService = new AwsS3ClientService({
    endpoint: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`,
    region: process.env.MINIO_REGION,
    credentials: {
      accessKeyId: process.env.MINIO_ACCESS_KEY!,
      secretAccessKey: process.env.MINIO_SECRET_KEY!,
    },
    forcePathStyle: true,
  })
  const connection = await mongoose
    .createConnection(process.env.DEST_MONGO_URI!)
    .asPromise()
  await srcClientService.onModuleInit()
  await destClientService.onModuleInit()
  const schema = SchemaFactory.createForClass(TestElementSchema)
  const model = connection.model(COLLECTION.TEST_ELEMENT, schema)
  const repository = new TestElementRepository(model)

  let counter = 0
  for await (const object of srcClientService.listKeysIterator({
    bucket: 'bathanghai-result-image',
  })) {
    if (++counter % 100 === 0) {
      console.log(counter)
    }

    const srcKey = object.Key
    if (srcKey) {
      const [sampleId, testId, location] = srcKey.split('.')[0].split('_')
      const testElement = await repository.findOne({
        filter: { testId, displayIndex: location === 'left' ? 33 : 34 },
      })
      if (testElement) {
        const newKey = StorageKeyFactory[
          StorageBucket.SAMPLE_IMAGES
        ].resultImage({
          sampleId,
          elementId: testElement._id,
        })
        const { buffer, mimeType } = await srcClientService.readToBuffer({
          bucket: 'bathanghai-result-image',
          key: srcKey,
        })

        await destClientService.upload({
          bucket: process.env.MINIO_SAMPLE_IMAGES_BUCKET!,
          buffer,
          key: newKey,
          mimeType,
        })
        // console.log(newKey)
      } else {
        console.log('not found', srcKey)
      }
    }
  }

  srcClientService.close()
  destClientService.close()
  process.exit(0)
}

main()
