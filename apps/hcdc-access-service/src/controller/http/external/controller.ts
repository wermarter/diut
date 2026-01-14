import { AuthSubject, ExternalRoutePath, SampleAction } from '@diut/hcdc'
import { Serialize } from '@diut/nestjs-infra'
import {
  Controller,
  Get,
  Inject,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import type { Response } from 'express'
import { assertPermission } from 'src/app/auth/common'
import { PrintFormSearchUseCase } from 'src/app/print-form/use-case/search'
import { SampleFindOneUseCase } from 'src/app/sample/use-case/find-one'
import { SamplePrintUseCase } from 'src/app/sample/use-case/print'
import {
  AUTH_CONTEXT_TOKEN,
  EAuthzPermissionDenied,
  EEntityNotFound,
  IAuthContext,
} from 'src/domain'
import { AuthQuery, HttpExternalAuthGuard } from './auth'
import { ExternalGetSampleResultResponseDto } from './dto/get-sample-result'

@Controller()
@ApiTags('external')
@UseGuards(HttpExternalAuthGuard)
export class ExternalController {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly samplePrintUseCase: SamplePrintUseCase,
    private readonly sampleFindOneUseCase: SampleFindOneUseCase,
    private readonly printFormSearchUseCase: PrintFormSearchUseCase,
  ) {}

  @Get(ExternalRoutePath.PrintSampleResult)
  @AuthQuery()
  async printSampleResult(@Res({ passthrough: true }) res: Response) {
    const {
      routeOptions: { printOptions },
    } = this.authContext.getDataExternal<ExternalRoutePath.PrintSampleResult>()

    const buffer = await this.samplePrintUseCase.execute(printOptions)

    res.set({
      'Content-Type': 'application/pdf',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    })

    return new StreamableFile(buffer)
  }

  @Get(ExternalRoutePath.GetSampleResult)
  @ApiResponse({
    status: 200,
    description: 'Get sample result',
    type: ExternalGetSampleResultResponseDto,
  })
  @Serialize(ExternalGetSampleResultResponseDto)
  @AuthQuery()
  async getSampleResult(@Res({ passthrough: true }) res: Response) {
    const {
      routeOptions: { sampleId },
    } = this.authContext.getDataExternal<ExternalRoutePath.GetSampleResult>()

    const sample = await this.sampleFindOneUseCase.execute({
      filter: { _id: sampleId },
      populates: [
        { path: 'results.test' },
        { path: 'results.elements.testElement' },
        { path: 'patient' },
      ],
    })

    if (sample === null) {
      throw new EEntityNotFound(`Sample id=${sampleId}`)
    }

    if (sample.isLocked === true) {
      throw new EAuthzPermissionDenied('Sample is locked')
    }

    const { ability } = this.authContext.getDataExternal()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Read, sample)

    const { items: printForms } = await this.printFormSearchUseCase.execute({
      sort: { displayIndex: 1 },
      filter: { branchId: sample.branchId },
    })

    return { sample, printForms }
  }
}
