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
import { SamplePrintOptions } from 'src/app/sample/common'
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

  @Get('print-sample-result')
  async printSampleResult(@Res({ passthrough: true }) res: Response) {
    const { routeOptions } = this.authContext.getDataExternal()

    const buffer = await this.samplePrintUseCase.execute(
      routeOptions as SamplePrintOptions[],
    )

    res.set({
      'Content-Type': 'application/pdf',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    })

    return new StreamableFile(buffer)
  }
}
