import { Body, Logger, Param, Res } from '@nestjs/common'
import { Response } from 'express'

import { AppController, AppRoute } from 'src/core'
import { ObjectIdPipe } from 'src/clients/mongo'
import { CreateSampleRequestDto } from './dtos/create-sample.request-dto'
import { SearchSampleRequestDto } from './dtos/search-sample.request-dto'
import { UpdateSampleRequestDto } from './dtos/update-sample.request-dto'
import { sampleRoutes } from './sample.routes'
import { SampleService } from './sample.service'
import { AuthTokenPayload, ReqUser } from 'src/auth'

@AppController(sampleRoutes.controller)
export class SampleController {
  private logger: Logger

  constructor(private sampleService: SampleService) {
    this.logger = new Logger(SampleController.name)
  }

  @AppRoute(sampleRoutes.search)
  search(@Body() body: SearchSampleRequestDto) {
    return this.sampleService.search(body)
  }

  @AppRoute(sampleRoutes.create)
  create(
    @Body() body: CreateSampleRequestDto,
    @ReqUser() user: AuthTokenPayload
  ) {
    return this.sampleService.create({
      ...body,
      infoBy: user.sub,
      results: body.tests.map((test) => ({
        testId: test.id,
        testCompleted: false,
        bioProductName: test.bioProductName,
        elements: [],
      })),
      resultBy: [],
      sampleCompleted: false,
      infoCompleted: false,
    })
  }

  @AppRoute(sampleRoutes.updateById)
  async updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateSampleRequestDto,
    @ReqUser() user: AuthTokenPayload
  ) {
    return this.sampleService.customUpdateById(id, body, user.sub)
  }

  @AppRoute(sampleRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleService.findById(id)
  }

  @AppRoute(sampleRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleService.deleteById(id)
  }

  @AppRoute(sampleRoutes.printById)
  async printById(@Param('id', ObjectIdPipe) id: string, @Res() res: Response) {
    const buffer = await this.sampleService.printById(id)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,

      // prevent cache
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    })

    res.end(buffer)
  }

  @AppRoute({ path: 'preview/:id', isPublic: true })
  preview(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleService.previewById(id)
  }
}
