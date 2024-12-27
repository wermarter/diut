import { NodeEnv } from '@diut/common'
import { AuthSubject, ExternalRoutePath, SampleAction } from '@diut/hcdc'
import { PageFormat, PageOrientation } from '@diut/services'
import { Inject, Injectable } from '@nestjs/common'
import { render } from 'ejs'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { of } from 'rxjs'
import { assertPermission } from 'src/app/auth/common'
import { AuthAuthorizeExternalRouteUseCase } from 'src/app/auth/use-case/authorize-external-route'
import { AppConfig, loadAppConfig } from 'src/config'
import {
  AUTH_CONTEXT_TOKEN,
  BROWSER_SERVICE_TOKEN,
  EEntityNotFound,
  IAuthContext,
  IBrowserService,
  IStorageBucket,
  IStorageService,
  STORAGE_BUCKET_TOKEN,
  STORAGE_SERVICE_TOKEN,
  StorageBucket,
  StorageKeyFactory,
} from 'src/domain'
import { SampleFindOneUseCase } from './find-one'

const TEMPLATE_PATH = 'reminder.ejs'

@Injectable()
export class SamplePrintReminderUseCase {
  constructor(
    private readonly sampleFindOneUseCase: SampleFindOneUseCase,
    private readonly authorizeExternalRouteUseCase: AuthAuthorizeExternalRouteUseCase,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(BROWSER_SERVICE_TOKEN)
    private readonly browserService: IBrowserService,
    @Inject(loadAppConfig.KEY)
    private readonly appConfig: AppConfig,
    @Inject(STORAGE_SERVICE_TOKEN)
    private readonly storageService: IStorageService,
    @Inject(STORAGE_BUCKET_TOKEN)
    private readonly storageBucket: IStorageBucket,
  ) {}

  async execute(sampleId: string, date: Date) {
    const htmlContent = await this.getHtmlContent(sampleId, date)

    const { mergedPdf } = await this.browserService.printMultiplePage(
      of({
        htmlContent,
        pageFormat: PageFormat.A5,
        pageOrientation: PageOrientation.Landscape,
      }),
    )

    return mergedPdf
  }

  private async getHtmlContent(sampleId: string, date: Date) {
    const { jwt, sample, meta } = await this.getPrintData(sampleId)
    const printTemplate = await this.getPrintTemplate()
    const url = this.appConfig.REMINDER_URL_PREFIX + jwt

    return render(
      printTemplate,
      { data: { url, sample, date }, meta },
      { async: true },
    )
  }

  private async getPrintTemplate() {
    const isDevelopment = this.appConfig.NODE_ENV === NodeEnv.Development
    if (isDevelopment) {
      const buffer = await readFile(
        join(
          __dirname,
          '..',
          '..',
          `print-form/print-template/${TEMPLATE_PATH}`,
        ),
      )

      return buffer.toString()
    }

    const { buffer } = await this.storageService.readToBuffer({
      key: StorageKeyFactory[StorageBucket.APP].printFormTemplate({
        templatePath: TEMPLATE_PATH,
      }),
      bucket: this.storageBucket.get(StorageBucket.APP),
    })
    return buffer.toString()
  }

  private async getPrintData(sampleId: string) {
    const { ability, user } = this.authContext.getDataInternal()

    const sample = await this.sampleFindOneUseCase.execute({
      filter: { sampleId },
      populates: [
        {
          path: 'patient',
        },
        {
          path: 'branch',
        },
      ],
    })
    if (!sample) {
      throw new EEntityNotFound(`Sample id=${sampleId}`)
    }

    assertPermission(ability, AuthSubject.Sample, SampleAction.Read, sample)

    const { jwt } = await this.authorizeExternalRouteUseCase.execute(
      this.constructor.name,
      ExternalRoutePath.GetSampleResult,
      { sampleId: sample._id },
      [sample.branchId],
    )

    return {
      jwt,
      sample,
      meta: { branch: sample.branch, authorName: user.name },
    }
  }
}
