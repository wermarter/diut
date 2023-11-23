import { Body, Logger, Param } from '@nestjs/common'
import { AppController, ObjectIdPipe } from '@diut/server-core'

import { AppRoute } from 'src/common/route.decorator'
import { CreateSampleOriginRequestDto } from './dtos/create-sample-origin.request-dto'
import { SearchSampleOriginRequestDto } from './dtos/search-sample-origin.request-dto'
import { UpdateSampleOriginRequestDto } from './dtos/update-sample-origin.request-dto'
import { SampleOriginRoutes } from './sample-origin.routes'
import { SampleOriginService } from './sample-origin.service'

@AppController(SampleOriginRoutes.controller)
export class SampleOriginController {
  private logger: Logger

  constructor(private SampleOriginService: SampleOriginService) {
    this.logger = new Logger(SampleOriginController.name)
  }

  @AppRoute(SampleOriginRoutes.search)
  search(@Body() body: SearchSampleOriginRequestDto) {
    return this.SampleOriginService.search(body)
  }

  @AppRoute(SampleOriginRoutes.create)
  create(@Body() body: CreateSampleOriginRequestDto) {
    return this.SampleOriginService.create(body)
  }

  @AppRoute(SampleOriginRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateSampleOriginRequestDto,
  ) {
    return this.SampleOriginService.updateById(id, body)
  }

  @AppRoute(SampleOriginRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.SampleOriginService.findById(id)
  }

  @AppRoute(SampleOriginRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.SampleOriginService.deleteById(id)
  }
}
