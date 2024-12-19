import { NodeEnv } from '@diut/common'
import {
  AuthSubject,
  PrintForm,
  PrintFormAction,
  PrintTemplate,
  SampleAction,
  SampleTypeAction,
  TestAction,
} from '@diut/hcdc'
import { BrowserServiceClient } from '@diut/services'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { render, renderFile } from 'ejs'
import { join } from 'path'
import { Observable, firstValueFrom } from 'rxjs'
import { assertPermission } from 'src/app/auth/common'
import { printTemplateConfigs } from 'src/app/print-form/print-template'
import { PrintFormAssertExistsUseCase } from 'src/app/print-form/use-case/assert-exists'
import { SampleTypeAssertExistsUseCase } from 'src/app/sample-type/use-case/assert-exists'
import { TestAssertExistsUseCase } from 'src/app/test/use-case/assert-exists'
import { AppConfig, loadAppConfig } from 'src/config'
import {
  AUTH_CONTEXT_TOKEN,
  AuthType,
  BROWSER_SERVICE_TOKEN,
  EEntityNotFound,
  IAuthContext,
  ISampleRepository,
  IStorageBucket,
  IStorageService,
  SAMPLE_REPO_TOKEN,
  STORAGE_BUCKET_TOKEN,
  STORAGE_SERVICE_TOKEN,
  StorageBucket,
  StorageKeyFactory,
} from 'src/domain'
import { ISamplePrintStrategy } from '../../print-form/print-strategy/common'
import {
  SamplePrintContext,
  SamplePrintOptions,
} from '../../print-form/print-strategy/context'
import { SamplePrintFormChungStrategy } from '../../print-form/print-strategy/form-chung'
import { SamplePrintFormHIVStrategy } from '../../print-form/print-strategy/form-hiv'
import { SamplePrintFormPapStrategy } from '../../print-form/print-strategy/form-pap'
import { SamplePrintFormSoiNhuomStrategy } from '../../print-form/print-strategy/form-soi-nhuom'
import { SamplePrintFormTDStrategy } from '../../print-form/print-strategy/form-td'
import { SampleAssertExistsUseCase } from './assert-exists'
import { SampleGeneratePrintUrlUseCase } from './generate-print-url'

@Injectable()
export class SamplePrintUseCase {
  private logger = new Logger(SamplePrintUseCase.name)

  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(BROWSER_SERVICE_TOKEN)
    private readonly browserService: BrowserServiceClient,
    @Inject(STORAGE_SERVICE_TOKEN)
    private readonly storageService: IStorageService,
    @Inject(STORAGE_BUCKET_TOKEN)
    private readonly storageBucket: IStorageBucket,
    @Inject(loadAppConfig.KEY)
    private readonly appConfig: AppConfig,
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    private readonly moduleRef: ModuleRef,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly sampleTypeAssertExistsUseCase: SampleTypeAssertExistsUseCase,
    private readonly testAssertExistsUseCase: TestAssertExistsUseCase,
    private readonly printFormAssertExistsUseCase: PrintFormAssertExistsUseCase,
    private readonly sampleGeneratePrintUrlUseCase: SampleGeneratePrintUrlUseCase,
  ) {}

  async execute(input: SamplePrintOptions[]) {
    const authContextData = this.authContext.getData()
    const ability = authContextData.ability
    const printContexts: SamplePrintContext[] = []
    const printFormMap = new Map<string, PrintForm>()

    for (const printOptions of input) {
      const sample = await this.sampleAssertExistsUseCase.execute({
        _id: printOptions.sampleId,
      })
      assertPermission(ability, AuthSubject.Sample, SampleAction.Read, sample)
      assertPermission(
        ability,
        AuthSubject.Sample,
        SampleAction.PrintResult,
        sample,
      )

      const printForm = await this.printFormAssertExistsUseCase.execute({
        _id: printOptions.printFormId,
      })
      assertPermission(
        ability,
        AuthSubject.PrintForm,
        PrintFormAction.Read,
        printForm,
      )
      if (printOptions.overrideAuthor) {
        assertPermission(
          ability,
          AuthSubject.PrintForm,
          PrintFormAction.OverrideAuthor,
          printForm,
        )
      }
      printFormMap.set(printForm._id.toString(), printForm)

      for (const testId of printOptions.testIds) {
        const test = await this.testAssertExistsUseCase.execute({
          _id: testId,
        })
        assertPermission(ability, AuthSubject.Test, TestAction.Read, test)
      }

      for (const sampleTypeId of printOptions.sampleTypeIds) {
        const sampleType = await this.sampleTypeAssertExistsUseCase.execute({
          _id: sampleTypeId,
        })
        assertPermission(
          ability,
          AuthSubject.SampleType,
          SampleTypeAction.Read,
          sampleType,
        )
      }

      const samplePrintContext =
        await this.moduleRef.resolve(SamplePrintContext)
      let strategy: ISamplePrintStrategy

      switch (printForm.template) {
        case PrintTemplate.FormChung:
          strategy = await this.moduleRef.resolve(SamplePrintFormChungStrategy)
          break
        case PrintTemplate.FormPap:
          strategy = await this.moduleRef.resolve(SamplePrintFormPapStrategy)
          break
        case PrintTemplate.FormTD:
          strategy = await this.moduleRef.resolve(SamplePrintFormTDStrategy)
          break
        case PrintTemplate.FormHIV:
          strategy = await this.moduleRef.resolve(SamplePrintFormHIVStrategy)
          break
        case PrintTemplate.FormSoiNhuom:
          strategy = await this.moduleRef.resolve(
            SamplePrintFormSoiNhuomStrategy,
          )
          break
        default:
          throw new EEntityNotFound(
            `PrintTemplate=${printForm.template} id=${printOptions.printFormId}`,
          )
      }

      samplePrintContext.setStrategy(strategy)
      printContexts.push(samplePrintContext)
    }

    const response$ = this.browserService.printMultiplePage(
      new Observable((subscriber) => {
        ;(async () => {
          for (let i = 0; i < input.length; i++) {
            const printRequest = await printContexts[i].execute(input[i])
            const printForm = printFormMap.get(input[i].printFormId)!
            const printConfig = printTemplateConfigs[printForm.template]

            let htmlContent: string

            const isDevelopment =
              this.appConfig.NODE_ENV === NodeEnv.Development
            if (isDevelopment) {
              htmlContent = await renderFile(
                join(
                  __dirname,
                  '..',
                  '..',
                  `print-form/print-template/${printConfig.templatePath}`,
                ),
                printRequest,
              )
            } else {
              const { buffer } = await this.storageService.readToBuffer({
                key: StorageKeyFactory[StorageBucket.APP].printFormTemplate({
                  templatePath: printConfig.templatePath,
                }),
                bucket: this.storageBucket.get(StorageBucket.APP),
              })
              const template = buffer.toString()
              htmlContent = await render(template, printRequest, {
                async: true,
              })
            }

            subscriber.next({
              htmlContent,
              pageFormat: printConfig.pageFormat,
              pageOrientation: printConfig.pageOrientation,
            })
          }
        })()
          .then(() => subscriber.complete())
          .catch((e) => {
            this.logger.warn(
              `Error when preparing print data: ${e?.stack ?? e}`,
            )
            subscriber.error(e)
          })
      }),
    )

    const { mergedPdf } = await firstValueFrom(response$)
    const printedAt = new Date()
    const printedById =
      authContextData.type === AuthType.Internal
        ? authContextData.user._id
        : authContextData.authorizedByUserId

    for (const { sampleId } of input) {
      await this.sampleRepository.updateByIdIgnoreSoftDelete(sampleId, {
        $set: {
          printedById,
          printedAt,
        },
      })
    }

    if (authContextData.type === AuthType.Internal) {
      const url = await this.sampleGeneratePrintUrlUseCase.execute({
        ability,
        printOptions: input,
      })
      this.logger.log(url)
    }

    return mergedPdf
  }
}
