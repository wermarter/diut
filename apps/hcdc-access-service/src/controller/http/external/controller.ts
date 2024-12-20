import { ExternalRoutePath } from '@diut/hcdc'
import {
  Controller,
  Get,
  Inject,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { SamplePrintUseCase } from 'src/app/sample/use-case/print'
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { HttpExternalAuthGuard } from './auth'

@Controller()
@ApiTags('external')
@UseGuards(HttpExternalAuthGuard)
export class ExternalController {
  constructor(
    private readonly samplePrintUseCase: SamplePrintUseCase,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
  ) {}

  @Get(ExternalRoutePath.PrintSampleResult)
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
}
