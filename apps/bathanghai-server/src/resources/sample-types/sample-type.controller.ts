import { Body, Logger, Param } from '@nestjs/common'

import { AppController } from '@diut/server-core'
import { AppRoute } from 'src/common/route.decorator'
import { ObjectIdPipe } from '@diut/server-core'
import { CreateSampleTypeRequestDto } from './dtos/create-sample-type.request-dto'
import { SearchSampleTypeRequestDto } from './dtos/search-sample-type.request-dto'
import { UpdateSampleTypeRequestDto } from './dtos/update-sample-type.request-dto'
import { sampleTypeRoutes } from './sample-type.routes'
import { SampleTypeService } from './sample-type.service'

@AppController(sampleTypeRoutes.controller)
export class SampleTypeController {
  private logger: Logger

  constructor(private sampleTypeService: SampleTypeService) {
    this.logger = new Logger(SampleTypeController.name)
  }

  @AppRoute(sampleTypeRoutes.search)
  search(@Body() body: SearchSampleTypeRequestDto) {
    return this.sampleTypeService.search(body)
  }

  @AppRoute(sampleTypeRoutes.create)
  create(@Body() body: CreateSampleTypeRequestDto) {
    return this.sampleTypeService.create(body)
  }

  @AppRoute(sampleTypeRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateSampleTypeRequestDto,
  ) {
    return this.sampleTypeService.updateById(id, body)
  }

  @AppRoute(sampleTypeRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleTypeService.findById(id)
  }

  @AppRoute(sampleTypeRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleTypeService.deleteById(id)
  }
}
