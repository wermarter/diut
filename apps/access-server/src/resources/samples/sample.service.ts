import {
  forwardRef,
  Inject,
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
import { isAdmin, NodeEnv, PatientCategory, PrintForm } from '@diut/common'
import { PDFDocument } from 'pdf-lib'
import { omit, uniq } from 'lodash'

import { BaseMongoService } from 'src/clients/mongo'
import { UpdateSampleRequestDto } from './dtos/update-sample.request-dto'
import { Sample } from './sample.schema'
import { PatientService } from '../patients/patient.service'
import { TestService } from '../tests/test.service'
import { TestElementService } from '../test-elements/test-element.service'
import { IndicationService } from '../indications/indication.service'
import { DoctorService } from '../doctors/doctor.service'
import { PatientTypeService } from '../patient-types/patient-type.service'
import { SampleTypeService } from '../sample-types/sample-type.service'
import { TestCategory } from '../test-categories/test-category.schema'
import { PrintFormService } from '../print-forms/print-form.service'
import { SinglePrintRequestDto } from './dtos/print-sample.request-dto'
import { StorageService } from 'src/clients/storage'
import { getPatientCategory, UPLOAD_CONFIG } from './sample.common'
import { SampleDownloadRequestDto } from './dtos/sample-download.request-dto'
import { AuthTokenPayload } from 'src/auth'

@Injectable()
export class SampleService
  extends BaseMongoService<Sample>
  implements OnModuleInit, OnModuleDestroy
{
  private browser: puppeteer.Browser
  constructor(
    @InjectModel(Sample.name) model: Model<Sample>,
    @Inject(forwardRef(() => PatientService))
    private readonly patientService: PatientService,
    private readonly testService: TestService,
    private readonly testElementService: TestElementService,
    private readonly indicationService: IndicationService,
    private readonly doctorService: DoctorService,
    private readonly patientTypeService: PatientTypeService,
    private readonly sampleTypeService: SampleTypeService,
    private readonly printFormService: PrintFormService,
    private readonly configService: ConfigService,
    private readonly storageService: StorageService
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

  async uploadFile(file: Express.Multer.File) {
    // const timestamp = Date.now().toString()
    // const hashedFileName = crypto
    //   .createHash('md5')
    //   .update(timestamp)
    //   .digest('hex')
    // const extension = file.originalname.substring(
    //   file.originalname.lastIndexOf('.'),
    //   file.originalname.length
    // )
    // const filename = hashedFileName + extension

    const filename = file.filename ?? file.originalname
    const metaData = {
      'Content-Type': file.mimetype,
    }

    await this.storageService.client.putObject(
      UPLOAD_CONFIG.BUCKET,
      filename,
      file.buffer,
      metaData
    )

    return {
      bucket: UPLOAD_CONFIG.BUCKET,
      path: filename,
    }
  }

  async downloadFile({ path }: SampleDownloadRequestDto) {
    return await this.storageService.client.getObject(
      UPLOAD_CONFIG.BUCKET,
      path
    )
  }

  updateSampleInfo(
    id: string,
    body: UpdateSampleRequestDto,
    user: AuthTokenPayload
  ) {
    let { results, sampleCompleted, resultBy, infoCompleted, tests } = body

    if (tests !== undefined) {
      const keptResults = (results ?? []).filter(({ testId }) =>
        body.tests.some(({ id }) => id === testId)
      )

      const newTests = body.tests.filter(
        ({ id }) => !keptResults.some(({ testId }) => testId === id)
      )
      if (newTests.length > 0) {
        sampleCompleted = false
      }

      const newResults = newTests.map(({ id, bioProductName }) => ({
        testId: id,
        testCompleted: false,
        bioProductName,
        elements: [],
      }))

      results = [...keptResults, ...newResults]
      resultBy = uniq(results.map(({ resultBy }) => resultBy)).filter(
        (x) => x !== undefined
      )
      return this.updateById(id, {
        ...body,
        sampleCompleted,
        results,
        resultBy,
        infoBy: user.sub,
      })
    } else {
      // Confirming info completed

      return this.updateById(id, {
        infoCompleted,
      })
    }
  }

  async updateSampleResults(
    id: string,
    body: UpdateSampleRequestDto,
    user: AuthTokenPayload
  ) {
    const userId = user.sub
    const userIsAdmin = isAdmin(user.permissions)
    const sample = await this.findById(id)

    let { resultBy } = body
    if (resultBy?.length > 0) {
      if (!resultBy.includes(userId)) {
        resultBy.push(userId)
      }
    } else {
      resultBy = [userId]
    }

    const results = body.results.map((newResult) => {
      const existingResult = sample.results.find(
        ({ testId }) => testId === newResult.testId
      )

      if (userIsAdmin || userId === existingResult.resultBy) {
        return newResult
      }

      if (existingResult.testCompleted !== true) {
        return newResult
      }

      return existingResult
    })

    const sampleCompleted = !results.some(
      ({ testCompleted }) => testCompleted === false
    )

    return this.updateById(id, {
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

        if (test.shouldNotPrint === true) {
          return
        }

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
    const printForm = await this.printFormService.findById(
      sample.printForm ?? PrintForm.Basic
    )
    const { titleMargin } = await this.printFormService.findById(
      printForm._id.toString()
    )
    const sampleData = await this.fetchSampleData(
      sample.sampleId,
      printForm._id.toString() as PrintForm
    )

    const authorPosition = sample.authorPosition ?? ''
    const authorName = sample.authorName ?? ''

    const printData = Object.assign({}, sampleData, {
      sampleTypes: sample.sampleTypes ?? sampleData.sampleTypes,
      authorPosition,
      authorName,
      titleMargin,
    })

    try {
      const string = await ejs.renderFile(
        join(
          __dirname,
          '..',
          '..',
          `views/print-form/${printForm.filename}.ejs`
        ),
        printData
      )
      return string
    } catch (e) {
      this.logger.error(e)
      return JSON.stringify(printData.results)
    }
  }

  async print(samples: SinglePrintRequestDto[], user?: AuthTokenPayload) {
    const pageContents = await Promise.all(
      samples.map((sample) => this.prepareSampleContent(sample))
    )

    // Update print status
    await Promise.all(
      samples.map((sample) =>
        this.updateById(sample.sampleId, {
          printedAt: new Date(),
          printedBy: user?.sub,
        })
      )
    )

    const mergedPdf = await PDFDocument.create()
    let sampleCounter = 0

    // Take it slow to save CPU and preserve print order
    for (let pageContent of pageContents) {
      const { isA4 } = await this.printFormService.findById(
        samples[sampleCounter++].printForm ?? PrintForm.Basic
      )

      const page = await this.browser.newPage()
      page.setCacheEnabled(false) // prevent old image cache

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
        <div style="width: 100vw; font-size: 8px; display: flex; justify-content: flex-end; padding: 0 10mm;">
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
