import { MongoAbility } from '@casl/ability'
import { NodeEnv } from '@diut/common'
import {
  AuthSubject,
  PrintForm,
  PrintFormAction,
  SampleAction,
  SampleTypeAction,
  TestAction,
  User,
} from '@diut/hcdc'
import { BrowserServiceClient } from '@diut/services'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { render } from 'ejs'
import { join } from 'path'
import { Observable, firstValueFrom } from 'rxjs'
import { assertPermission } from 'src/app/auth/common'
import { BranchAssertExistsUseCase } from 'src/app/branch/use-case/assert-exists'
import { ISamplePrintStrategy } from 'src/app/print-form/print-strategy/common'
import { printTemplateConfigs } from 'src/app/print-form/print-template'
import { PrintFormAssertExistsUseCase } from 'src/app/print-form/use-case/assert-exists'
import { SampleTypeAssertExistsUseCase } from 'src/app/sample-type/use-case/assert-exists'
import { TestAssertExistsUseCase } from 'src/app/test/use-case/assert-exists'
import { UserAssertExistsUseCase } from 'src/app/user/use-case/assert-exists'
import { AppConfig, loadAppConfig } from 'src/config'
import {
  AUTH_CONTEXT_TOKEN,
  AuthContextData,
  AuthType,
  BROWSER_SERVICE_TOKEN,
  IAuthContext,
  ISampleRepository,
  ISampleTypeRepository,
  IStorageBucket,
  IStorageService,
  SAMPLETYPE_REPO_TOKEN,
  SAMPLE_REPO_TOKEN,
  STORAGE_BUCKET_TOKEN,
  STORAGE_SERVICE_TOKEN,
  StorageBucket,
  StorageKeyFactory,
} from 'src/domain'
import { SamplePrintOptions } from '../common'
import { SampleAssertExistsUseCase } from './assert-exists'
import { SampleGeneratePrintUrlUseCase } from './generate-print-url'

@Injectable()
export class SamplePrintUseCase {
  private logger = new Logger(this.constructor.name)

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
    @Inject(SAMPLETYPE_REPO_TOKEN)
    private readonly sampleTypeRepository: ISampleTypeRepository,
    private readonly moduleRef: ModuleRef,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    private readonly sampleTypeAssertExistsUseCase: SampleTypeAssertExistsUseCase,
    private readonly testAssertExistsUseCase: TestAssertExistsUseCase,
    private readonly printFormAssertExistsUseCase: PrintFormAssertExistsUseCase,
    private readonly sampleGeneratePrintUrlUseCase: SampleGeneratePrintUrlUseCase,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: SamplePrintOptions[]) {
    const authContextData = this.authContext.getData()
    const ability = authContextData.ability
    const printFormMap = await this.assertPermissions(ability, input)

    const response$ = this.browserService.printMultiplePage(
      new Observable((subscriber) => {
        ;(async () => {
          for (const printOptions of input) {
            const printForm = printFormMap.get(printOptions.printFormId)!
            const printConfig = printTemplateConfigs[printForm.template]
            const htmlContent = await this.getHtml(
              authContextData,
              printForm,
              printOptions,
            )

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
        printOptions: input,
      })
      this.logger.log(url)
    }

    return mergedPdf
  }

  private async assertPermissions(
    ability: MongoAbility,
    input: SamplePrintOptions[],
  ) {
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
    }

    for (const printForm of printFormMap.values()) {
      const branch = await this.branchAssertExistsUseCase.execute({
        _id: printForm.branchId,
      })

      printFormMap.set(printForm._id.toString(), {
        ...printForm,
        branch,
      })
    }

    return printFormMap
  }

  private async getHtml(
    authContext: AuthContextData,
    printForm: PrintForm,
    options: SamplePrintOptions,
  ) {
    const printTemplate = await this.getPrintTemplate(printForm)
    const printData = await this.getPrintData(authContext, printForm, options)

    const htmlString = await render(printTemplate, printData, {
      async: true,
    })

    return htmlString
  }

  private async getPrintTemplate(printForm: PrintForm) {
    const isDevelopment = this.appConfig.NODE_ENV === NodeEnv.Development
    if (isDevelopment) {
      return join(
        __dirname,
        '..',
        '..',
        `print-form/print-template/${printForm.template}`,
      )
    }

    const { buffer } = await this.storageService.readToBuffer({
      key: StorageKeyFactory[StorageBucket.APP].printFormTemplate({
        templatePath: printForm.template,
      }),
      bucket: this.storageBucket.get(StorageBucket.APP),
    })
    return buffer.toString()
  }

  private async getPrintData(
    authContext: AuthContextData,
    printForm: PrintForm,
    options: SamplePrintOptions,
  ) {
    const meta = await this.getPrintMetadata(options, printForm, authContext)

    const printStrategy = this.moduleRef.get<ISamplePrintStrategy>(
      printForm.template,
    )
    const data = await printStrategy.preparePrintData(
      options.sampleId,
      options.testIds,
    )

    return { data, meta }
  }

  private async getPrintMetadata(
    options: SamplePrintOptions,
    printForm: PrintForm,
    authContext: AuthContextData,
  ) {
    const sampleTypeNames: string[] = []
    for (const sampleTypeId of options.sampleTypeIds) {
      const sampleType = await this.sampleTypeRepository.findById(sampleTypeId)
      sampleTypeNames.push(sampleType?.name!)
    }

    const meta = {
      branch: printForm.branch!,
      sampleTypeNames,
      authorName: options.overrideAuthor?.authorName ?? printForm.authorName,
      authorTitle: options.overrideAuthor?.authorTitle ?? printForm.authorTitle,
      titleMargin: options.overrideTitleMargin ?? printForm.titleMargin,
    }

    let user: User
    if (authContext.type === AuthType.Internal) {
      user = authContext.user
    } else {
      user = await this.userAssertExistsUseCase.execute({
        _id: authContext.authorizedByUserId,
      })
    }
    meta.authorName = await render(meta.authorName, { user }, { async: true })

    return meta
  }
}
