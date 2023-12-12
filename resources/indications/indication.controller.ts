import { Body, Logger, Param } from '@nestjs/common'
import { AppController, ObjectIdPipe } from '@diut/nest-core'

import { AppRoute } from 'src/common/route.decorator'
import { CreateIndicationRequestDto } from './dtos/create-indication.request-dto'
import { SearchIndicationRequestDto } from './dtos/search-indication.request-dto'
import { UpdateIndicationRequestDto } from './dtos/update-indication.request-dto'
import { indicationRoutes } from './indication.routes'
import { IndicationService } from './indication.service'

@AppController(indicationRoutes.controller)
export class IndicationController {
  private logger: Logger

  constructor(private indicationService: IndicationService) {
    this.logger = new Logger(IndicationController.name)
  }

  @AppRoute(indicationRoutes.search)
  search(@Body() body: SearchIndicationRequestDto) {
    return this.indicationService.search(body)
  }

  @AppRoute(indicationRoutes.create)
  create(@Body() body: CreateIndicationRequestDto) {
    return this.indicationService.create(body)
  }

  @AppRoute(indicationRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateIndicationRequestDto,
  ) {
    return this.indicationService.updateById(id, body)
  }

  @AppRoute(indicationRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.indicationService.findById(id)
  }

  @AppRoute(indicationRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.indicationService.deleteById(id)
  }
}
