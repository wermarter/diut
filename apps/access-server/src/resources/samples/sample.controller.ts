import { Body, Logger, Param } from '@nestjs/common'

import { AppController, AppRoute } from 'src/core'
import { ObjectIdPipe } from 'src/clients/mongo'
import { CreateSampleRequestDto } from './dtos/create-sample.request-dto'
import { SearchSampleRequestDto } from './dtos/search-sample.request-dto'
import { UpdateSampleRequestDto } from './dtos/update-sample.request-dto'
import { sampleRoutes } from './sample.routes'
import { SampleService } from './sample.service'
import { ReqUser } from 'src/auth'
import { User } from '../users'

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
  create(@Body() body: CreateSampleRequestDto, @ReqUser() user: User) {
    return this.sampleService.create({
      ...body,
      createdBy: user._id,
      results: [],
      resultBy: [],
      isCompleted: false,
    })
  }

  @AppRoute(sampleRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateSampleRequestDto
  ) {
    return this.sampleService.updateById(id, body)
  }

  // update result

  // synchronize info

  @AppRoute(sampleRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleService.findById(id)
  }

  @AppRoute(sampleRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleService.deleteById(id)
  }
}
