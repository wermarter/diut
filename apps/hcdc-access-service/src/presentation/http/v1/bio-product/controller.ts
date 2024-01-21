import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nest-core'

import { bioProductRoutes } from './routes'
import {
  BioProductCreateUseCase,
  BioProductDeleteUseCase,
  BioProductSearchUseCase,
  BioProductUpdateUseCase,
  BioProductAssertExistsUseCase,
} from 'src/domain'
import { BioProductCreateRequestDto } from './dto/create.request-dto'
import { BioProductUpdateRequestDto } from './dto/update.request-dto'
import { BioProductSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({
  basePath: 'v1/bio-products',
})
export class BioProductController {
  constructor(
    private readonly bioProductCreateUseCase: BioProductCreateUseCase,
    private readonly bioProductUpdateUseCase: BioProductUpdateUseCase,
    private readonly bioProductDeleteUseCase: BioProductDeleteUseCase,
    private readonly bioProductSearchUseCase: BioProductSearchUseCase,
    private readonly bioProductAssertExistsUseCase: BioProductAssertExistsUseCase,
  ) {}

  @HttpRoute(bioProductRoutes.search)
  search(@Body() body: BioProductSearchRequestDto) {
    return this.bioProductSearchUseCase.execute(body)
  }

  @HttpRoute(bioProductRoutes.create)
  create(@Body() body: BioProductCreateRequestDto) {
    return this.bioProductCreateUseCase.execute(body)
  }

  @HttpRoute(bioProductRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.bioProductAssertExistsUseCase.execute({ _id: id })
  }

  @HttpRoute(bioProductRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: BioProductUpdateRequestDto,
  ) {
    return this.bioProductUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(bioProductRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.bioProductDeleteUseCase.execute({ id })
  }
}
