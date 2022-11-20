import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { join } from 'path'
import * as ejs from 'ejs'
import * as puppeteer from 'puppeteer'
import {
  Gender,
  ID_INDICATION_PREGNANT,
  NodeEnv,
  PatientCategory,
  PrintForm,
  printForms,
} from '@diut/common'
import { PDFDocument } from 'pdf-lib'
import { omit } from 'lodash'

import { BaseMongoService } from 'src/clients/mongo'
import { UpdateSampleRequestDto } from './dtos/update-sample.request-dto'
import { Sample } from './sample.schema'
import { PatientService } from '../patients'
import { TestService } from '../tests'
import { TestElementService } from '../test-elements'
import { IndicationService } from '../indications'
import { DoctorService } from '../doctors'
import { PatientTypeService } from '../patient-types'
import { SampleTypeService } from '../sample-types'
import { PatientResponseDto } from '../patients/dtos/patient.response-dto'
import { SampleResponseDto } from './dtos/sample.response-dto'
import { TestCategory } from '../test-categories'
import { SinglePrintRequestDto } from './dtos/print-sample.request-dto'

@Injectable()
export class SampleService
  extends BaseMongoService<Sample>
  implements OnModuleInit, OnModuleDestroy
{
  private browser: puppeteer.Browser
  constructor(
    @InjectModel(Sample.name) model: Model<Sample>,
    private readonly patientService: PatientService,
    private readonly testService: TestService,
    private readonly testElementService: TestElementService,
    private readonly indicationService: IndicationService,
    private readonly doctorService: DoctorService,
    private readonly patientTypeService: PatientTypeService,
    private readonly sampleTypeService: SampleTypeService,
    private readonly configService: ConfigService
  ) {
    super(model, new Logger(SampleService.name))
  }

  async onModuleInit() {
    if (this.configService.get('env') === NodeEnv.Development) {
      // https://github.com/puppeteer/puppeteer/issues/4039
      this.browser = await puppeteer.launch({
        headless: true,
        pipe: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
      })
    } else {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
        ],
      })
    }
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

    let { results, sampleCompleted } = body
    if (body.tests?.length > 0) {
      if (body.results?.length > 0) {
        const keptResults = body.results.filter(({ testId }) =>
          body.tests.some(({ id }) => id === testId)
        )
        const newTests = body.tests
          .filter(({ id }) => !keptResults.some(({ testId }) => testId === id))
          .map(({ id, bioProductName }) => ({
            testId: id,
            testCompleted: false,
            bioProductName,
            elements: [],
          }))

        if (newTests.length > 0) {
          sampleCompleted = false
        }
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
      sampleCompleted,
      results,
      resultBy,
    })
  }

  // Later used for embed data
  async fetchSampleData(id: string, printForm?: PrintForm) {
    const sample = await this.findById(id)

    const [patient, doctor, patientType, indication] = await Promise.all([
      this.patientService.findById(sample.patientId as string),
      this.doctorService.findById(sample.doctorId as string),
      this.patientTypeService.findById(sample.patientTypeId as string),
      this.indicationService.findById(sample.indicationId as string),
    ])

    const patientCategory = getPatientCategory(patient, sample as any)

    const sampleTypes = await Promise.all(
      (sample.sampleTypeIds as string[]).map((id) =>
        this.sampleTypeService.findById(id)
      )
    )

    const categoryMap: Record<number, string> = {}
    const testMap: Record<
      number,
      Array<{
        index: number
        name: string
        bioProductName: string
        elements: {
          name: string
          value: string
          isHighlighted: boolean
          description: string
          unit: string
          isParent: boolean
          printIndex: number
        }[]
      }>
    > = {}

    await Promise.all(
      sample.results.map(async (result) => {
        if (result.testCompleted !== true) {
          return
        }

        const test = await this.testService.findById(result.testId)
        if (printForm !== undefined && test.printForm !== printForm) {
          return
        }

        const elements = await Promise.all(
          result.elements.map(({ id }) => this.testElementService.findById(id))
        )

        const { name: categoryName, index: categoryIndex } =
          test.category as TestCategory

        categoryMap[categoryIndex] = categoryName
        if (testMap[categoryIndex] === undefined) {
          testMap[categoryIndex] = []
        }

        testMap[categoryIndex].push({
          index: test.index,
          name: test.name,
          bioProductName: result.bioProductName,
          elements: elements.map((element, index) => ({
            name: element.name,
            value: result.elements[index].value,
            isHighlighted: result.elements[index].isHighlighted,
            description: (
              element.highlightRules.find(
                ({ category }) => category === patientCategory
              ) ??
              element.highlightRules.find(
                ({ category }) => category === PatientCategory.Any
              )
            )?.description,
            unit: element.unit,
            isParent: element.isParent,
            printIndex: element.printIndex,
          })),
        })
      })
    )

    return {
      sample: omit(sample, [
        'patientId',
        'doctorId',
        'patientTypeId',
        'indicationId',
        'sampleTypeIds',
        'results',
      ]),
      patient,
      doctor: doctor.name,
      patientType: patientType.name,
      indication: indication.name,
      sampleTypes: sampleTypes.map((sampleType) => sampleType?.name),
      results: Object.keys(testMap)
        .sort()
        .map((categoryIndexString) => {
          const categoryIndex = parseInt(categoryIndexString)
          return {
            categoryIndex,
            categoryName: categoryMap[categoryIndex],
            tests: testMap[categoryIndex]
              .sort((a, b) => a.index - b.index)
              .map(({ elements, ...rest }) => ({
                ...rest,
                elements: elements.sort((a, b) => a.printIndex - b.printIndex),
              })),
          }
        }),
    }
  }

  async prepareSampleContent(sample: SinglePrintRequestDto) {
    const printForm = sample.printForm ?? PrintForm.Basic
    const sampleData = await this.fetchSampleData(sample.sampleId, printForm)

    const authorPosition = sample.authorPosition ?? ''
    const authorName = sample.authorName ?? ''

    const printData = Object.assign({}, sampleData, {
      sampleTypes: sample.sampleTypes ?? sampleData.sampleTypes,
      authorPosition,
      authorName,
    })

    try {
      const string = await ejs.renderFile(
        join(
          __dirname,
          '..',
          '..',
          `views/print-form/${
            printForms.find(({ value }) => value === printForm).filename
          }.ejs`
        ),
        printData
      )
      return string
    } catch {
      return JSON.stringify(printData.results)
    }
  }

  async print(samples: SinglePrintRequestDto[]) {
    const pageContents = await Promise.all(
      samples.map((sample) => this.prepareSampleContent(sample))
    )
    const mergedPdf = await PDFDocument.create()
    let sampleCounter = 0

    // Take it slow to save CPU and preserve print order
    for (let pageContent of pageContents) {
      const printForm = samples[sampleCounter++].printForm ?? PrintForm.Basic
      const { isA4 } = printForms.find(({ value }) => value === printForm)

      const page = await this.browser.newPage()
      await page.setContent(pageContent, { waitUntil: 'networkidle0' })
      const buffer = await page.pdf({
        format: isA4 ? 'A4' : 'A5',
        landscape: !isA4,
        printBackground: true,
        // pageRanges: isA4 ? undefined : '1',
        margin: {
          left: '0px',
          top: '0px',
          right: '0px',
          bottom: '0px',
        },
        displayHeaderFooter: true,
        footerTemplate: `
        <div style="width: 100vw; font-size: 10px; display: flex; justify-content: flex-end; padding: 0 10mm;">
          <div><span class="pageNumber"></span>/<span class="totalPages"></span></div>
        <div>`,
      })
      const document = await PDFDocument.load(buffer)
      const copiedPages = await mergedPdf.copyPages(
        document,
        document.getPageIndices()
      )
      copiedPages.forEach((page) => mergedPdf.addPage(page))
      await page.close()
    }

    return mergedPdf.save()
  }
}

export function getPatientCategory(
  patient: PatientResponseDto,
  sample: SampleResponseDto
) {
  const { gender, birthYear } = patient
  const age = new Date().getFullYear() - birthYear

  if (gender === Gender.Female && isPregnant(sample)) {
    return PatientCategory.Pregnant
  }

  if (gender === Gender.Male && age >= 18) {
    return PatientCategory.Man
  }

  if (gender === Gender.Female && age >= 18) {
    return PatientCategory.Woman
  }

  if (gender === Gender.Male && age < 18) {
    return PatientCategory.Boy
  }

  if (gender === Gender.Female && age < 18) {
    return PatientCategory.Girl
  }

  return PatientCategory.Any
}

function isPregnant(sample: SampleResponseDto) {
  return sample.indicationId === ID_INDICATION_PREGNANT
}
