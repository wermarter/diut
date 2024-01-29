import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-core'

import { bioProductRoutes } from './routes'
import {
  BioProductCreateUseCase,
  BioProductDeleteUseCase,
  BioProductSearchUseCase,
  BioProductUpdateUseCase,
  BioProductFindOneUseCase,
  EEntityNotFound,
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
    private readonly bioProductFindOneUseCase: BioProductFindOneUseCase,
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
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.bioProductFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'branch' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`BioProduct id=${id}`)
    }

    return rv
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
