import { Body, Logger, Param } from '@nestjs/common'
import { AppController, ObjectIdPipe } from '@diut/server-core'

import { AppRoute } from 'src/common/route.decorator'
import { CreateBioProductRequestDto } from './dtos/create-bio-product.request-dto'
import { SearchBioProductRequestDto } from './dtos/search-bio-product.request-dto'
import { UpdateBioProductRequestDto } from './dtos/update-bio-product.request-dto'
import { bioProductRoutes } from './bio-product.routes'
import { BioProductService } from './bio-product.service'

@AppController(bioProductRoutes.controller)
export class BioProductController {
  private logger: Logger

  constructor(private bioProductService: BioProductService) {
    this.logger = new Logger(BioProductController.name)
  }

  @AppRoute(bioProductRoutes.search)
  search(@Body() body: SearchBioProductRequestDto) {
    return this.bioProductService.search(body)
  }

  @AppRoute(bioProductRoutes.create)
  create(@Body() body: CreateBioProductRequestDto) {
    return this.bioProductService.create(body)
  }

  @AppRoute(bioProductRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateBioProductRequestDto,
  ) {
    return this.bioProductService.updateById(id, body)
  }

  @AppRoute(bioProductRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.bioProductService.findById(id)
  }

  @AppRoute(bioProductRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.bioProductService.deleteById(id)
  }
}
