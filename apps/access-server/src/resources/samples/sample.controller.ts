import { Body, Logger, Param } from '@nestjs/common'

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
      createdBy: user.sub,
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
    const { resultBy } = body
    const userId = user.sub
    if (resultBy?.length > 0) {
      if (!resultBy.includes(userId)) {
        resultBy.push(userId)
      }
    } else {
      return this.sampleService.updateById(id, { ...body, resultBy: [userId] })
    }
  }

  @AppRoute(sampleRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleService.findById(id)
  }

  @AppRoute(sampleRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleService.deleteById(id)
  }
}
