import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MongoRepository } from '@diut/nest-core'
import { DISABLED_REPORT_ORDER } from './test-element.common'
import { TestElement } from './test-element.schema'

@Injectable()
export class TestElementService extends MongoRepository<TestElement> {
  constructor(@InjectModel(TestElement.name) model: Model<TestElement>) {
    super(model)
  }

  async getElementsForTestReport(testIds: string[]) {
    const res = await this.search({
      filter: {
        test: {
          $in: testIds,
        },
        reportOrder: {
          $ne: DISABLED_REPORT_ORDER,
        },
      },
      sort: {
        reportOrder: 1,
      },
    })

    return res.items
  }
}
