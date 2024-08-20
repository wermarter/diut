import {
  Controller,
  Get,
  Inject,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'

import { SamplePrintUseCase } from 'src/app'
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { HttpExternalAuthGuard } from './auth'
import { SamplePrintOptions } from 'src/app/sample/print-strategy/context'

@Controller('external')
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
