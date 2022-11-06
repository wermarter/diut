import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { join } from 'path'
import * as ejs from 'ejs'
import * as puppeteer from 'puppeteer'

import { BaseMongoService } from 'src/clients/mongo'
import { UpdateSampleRequestDto } from './dtos/update-sample.request-dto'
import { Sample } from './sample.schema'

@Injectable()
export class SampleService
  extends BaseMongoService<Sample>
  implements OnModuleInit, OnModuleDestroy
{
  private browser: puppeteer.Browser
  constructor(@InjectModel(Sample.name) model: Model<Sample>) {
    super(model, new Logger(SampleService.name))
  }

  async onModuleInit() {
    this.browser = await puppeteer.launch({ headless: true })
  }

  async onModuleDestroy() {
    await this.browser.close()
  }

  customUpdateById(id: string, body: UpdateSampleRequestDto, userId: string) {
    let { resultBy } = body
    if (resultBy?.length > 0) {
      if (!resultBy.includes(userId)) {
        resultBy.push(userId)
      }
    } else {
      resultBy = [userId]
    }

    let { results } = body
    if (body.tests?.length > 0) {
      if (body.results?.length > 0) {
        const keptResults = body.results.filter(({ testId }) =>
          body.tests.some(({ id }) => id === testId)
        )
        const newTests = body.tests
          .filter(({ id }) => keptResults.some(({ testId }) => testId !== id))
          .map(({ id, bioProductName }) => ({
            testId: id,
            testCompleted: false,
            bioProductName: bioProductName,
            elements: [],
          }))

        results = [...keptResults, ...newTests]
      } else {
        results = body.tests.map((test) => ({
          testId: test.id,
          testCompleted: false,
          bioProductName: test.bioProductName,
          elements: [],
        }))
      }
    }

    return this.updateById(id, {
      ...body,
      results,
      resultBy,
    })
  }

  async previewById(id: string) {
    const string = await ejs.renderFile(
      join(__dirname, '..', '..', 'views', 'hello.ejs'),
      {
        id,
        passengers: [
          {
            name: 'Joyce',
            flightNumber: 7859,
            time: '18h00',
          },
          {
            name: 'Brock',
            flightNumber: 7859,
            time: '18h00',
          },
          {
            name: 'Eve',
            flightNumber: 7859,
            time: '18h00',
          },
        ],
      }
    )
    return string
  }

  async printById(id: string) {
    const pageContent = await this.previewById(id)
    const page = await this.browser.newPage()

    await page.setContent(pageContent)

    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
      },
    })

    await page.close()
    return buffer
  }
}
