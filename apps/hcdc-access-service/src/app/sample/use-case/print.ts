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
import { PrintPageRequest } from '@diut/services'
import { Inject, Injectable } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { render } from 'ejs'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { from } from 'rxjs'
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
  AuthType,
  BROWSER_SERVICE_TOKEN,
  EAuthzPermissionDenied,
  IAuthContext,
  IBrowserService,
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

@Injectable()
export class SamplePrintUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(BROWSER_SERVICE_TOKEN)
    private readonly browserService: IBrowserService,
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
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: SamplePrintOptions[]) {
    const printFormMap = await this.assertPermissions(input)

    const pageRequest$ = from(this.getPrintPageRequests(printFormMap, input))
    const { mergedPdf } =
      await this.browserService.printMultiplePage(pageRequest$)

    await this.updatePrintedProperties(input)

    return mergedPdf
  }

  private async updatePrintedProperties(input: SamplePrintOptions[]) {
    const authContextData = this.authContext.getData()
    const printedById =
      authContextData.type === AuthType.Internal
        ? authContextData.user._id
        : authContextData.authorizedByUserId

    for (const { sampleId } of input) {
      await this.sampleRepository.updateByIdIgnoreSoftDelete(sampleId, {
        $set: {
          printedById,
          printedAt: new Date(),
        },
      })
    }
  }

  private async *getPrintPageRequests(
    printFormMap: Map<string, PrintForm>,
    input: SamplePrintOptions[],
  ): AsyncGenerator<PrintPageRequest> {
    for (const printOptions of input) {
      const printForm = printFormMap.get(printOptions.printFormId)!
      const printConfig = printTemplateConfigs[printForm.template]
      const htmlContent = await this.getHtml(printForm, printOptions)

      yield {
        htmlContent,
        pageFormat: printConfig.pageFormat,
        pageOrientation: printConfig.pageOrientation,
      }
    }
  }

  private async assertPermissions(input: SamplePrintOptions[]) {
    const { ability } = this.authContext.getData()
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

      if (sample.isLocked === true) {
        throw new EAuthzPermissionDenied('Sample is locked')
      }

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

  private async getHtml(printForm: PrintForm, options: SamplePrintOptions) {
    const printTemplate = await this.getPrintTemplate(printForm)
    const printData = await this.getPrintData(printForm, options)

    const htmlString = await render(printTemplate, printData, {
      async: true,
    })

    return htmlString
  }

  private async getPrintTemplate(printForm: PrintForm) {
    const printConfig = printTemplateConfigs[printForm.template]

    const isDevelopment = this.appConfig.NODE_ENV === NodeEnv.Development
    if (isDevelopment) {
      const buffer = await readFile(
        join(
          __dirname,
          '..',
          '..',
          `print-form/print-template/${printConfig.templatePath}`,
        ),
      )

      return buffer.toString()
    }

    const { buffer } = await this.storageService.readToBuffer({
      key: StorageKeyFactory[StorageBucket.APP].printFormTemplate({
        templatePath: printConfig.templatePath,
      }),
      bucket: this.storageBucket.get(StorageBucket.APP),
    })
    return buffer.toString()
  }

  private async getPrintData(
    printForm: PrintForm,
    options: SamplePrintOptions,
  ) {
    const meta = await this.getPrintMetadata(options, printForm)

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
    const authContext = this.authContext.getData()
    if (authContext.type === AuthType.Internal) {
      user = authContext.user
    } else {
      user = await this.userAssertExistsUseCase.execute({
        _id: authContext.authorizedByUserId,
      })
    }
    meta.authorName = await render(meta.authorName, { user }, { async: true })

    if (authContext.type === AuthType.External) {
      meta.authorTitle = ''
      meta.authorName = ''
    }

    return meta
  }
}
