import { ModuleRef } from '@nestjs/core'
import { Inject, Injectable, Logger } from '@nestjs/common'
import {
  AuthSubject,
  PrintFormAction,
  PrintTemplate,
  SampleAction,
  TestAction,
  SampleTypeAction,
  PrintForm,
} from '@diut/hcdc'
import { BrowserServiceClient } from '@diut/services'
import { Observable, firstValueFrom } from 'rxjs'
import { render, renderFile } from 'ejs'
import { NodeEnv } from '@diut/common'
import { join } from 'path'

import {
  AuthContextToken,
  BrowserServiceToken,
  StorageKeyFactory,
  EEntityNotFound,
  IAuthContext,
  IStorageBucket,
  IStorageService,
  StorageBucket,
  StorageBucketToken,
  StorageServiceToken,
  assertPermission,
  printTemplateConfigs,
} from 'src/domain'
import {
  SamplePrintContext,
  SamplePrintOptions,
} from '../print-strategy/context'
import { SamplePrintFormChungStrategy } from '../print-strategy/form-chung'
import { ISamplePrintStrategy } from '../print-strategy/common'
import { SampleAssertExistsUseCase } from './assert-exists'
import { PrintFormAssertExistsUseCase } from 'src/app/print-form/use-case/assert-exists'
import { TestAssertExistsUseCase } from 'src/app/test'
import { SampleTypeAssertExistsUseCase } from 'src/app/sample-type'
import { AppConfig, loadAppConfig } from 'src/config'
import { SamplePrintFormPapStrategy } from '../print-strategy/form-pap'
import { SamplePrintFormTDStrategy } from '../print-strategy/form-td'

@Injectable()
export class SamplePrintUseCase {
  private logger = new Logger(SamplePrintUseCase.name)

  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(BrowserServiceToken)
    private readonly browserService: BrowserServiceClient,
    @Inject(StorageServiceToken)
    private readonly storageService: IStorageService,
    @Inject(StorageBucketToken)
    private readonly storageBucket: IStorageBucket,
    @Inject(loadAppConfig.KEY)
    private readonly appConfig: AppConfig,
    private readonly moduleRef: ModuleRef,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly sampleTypeAssertExistsUseCase: SampleTypeAssertExistsUseCase,
    private readonly testAssertExistsUseCase: TestAssertExistsUseCase,
    private readonly printFormAssertExistsUseCase: PrintFormAssertExistsUseCase,
  ) {}

  async execute(input: SamplePrintOptions[]) {
    const { ability } = this.authContext.getData()
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
                  `print-template/${printConfig.templatePath}`,
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
            this.logger.warn(`Error when preparing print data: ${e}`)
            subscriber.error(e)
          })
      }),
    )

    const { mergedPdf } = await firstValueFrom(response$)
    return mergedPdf
  }
}
