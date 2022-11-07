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
import { Gender, ID_INDICATION_PREGNANT, PatientCategory } from '@diut/common'

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
    private readonly sampleTypeService: SampleTypeService
  ) {
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

  async fetchSampleData(id: string) {
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

    const tests: {
      name: string
      bioProductName: string
      index: number
      categoryName: string
      categoryIndex: number
      elements: {
        name: string
        value: string
        isHighlighted: boolean
        description: string
        unit: string
      }[]
    }[] = []
    await Promise.all(
      sample.results.map(async (result) => {
        const test = await this.testService.findById(result.testId)
        const elements = await Promise.all(
          result.elements.map(({ id }) => this.testElementService.findById(id))
        )

        tests.push({
          name: test.name,
          index: test.index,
          categoryName: (test.category as TestCategory).name,
          categoryIndex: (test.category as TestCategory).index,
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
          })),
        })
      })
    )

    return {
      sample,
      patient,
      tests: tests.sort((a, b) => {
        const categoryDelta = a.categoryIndex - b.categoryIndex
        if (categoryDelta !== 0) {
          return categoryDelta
        }
        return a.index - b.index
      }),
      doctor: doctor.name,
      patientType: patientType.name,
      indication: indication.name,
      sampleTypes: sampleTypes.map(({ name }) => name),
    }
  }

  async previewById(id: string) {
    const sampleData = await this.fetchSampleData(id)

    const string = await ejs.renderFile(
      join(__dirname, '..', '..', 'views', 'print-form-1.ejs'),
      sampleData
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
