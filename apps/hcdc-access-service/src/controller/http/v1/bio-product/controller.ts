import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-infra'

import { bioProductRoutes } from './routes'
import { EEntityNotFound } from 'src/domain'
import { BioProductCreateRequestDto } from './dto/create'
import { BioProductUpdateRequestDto } from './dto/update'
import { BioProductSearchRequestDto } from './dto/search'
import { HttpController, HttpRoute } from '../../shared'
import { BioProductCreateUseCase } from 'src/app/bio-product/use-case/create'
import { BioProductUpdateUseCase } from 'src/app/bio-product/use-case/update'
import { BioProductDeleteUseCase } from 'src/app/bio-product/use-case/delete'
import { BioProductSearchUseCase } from 'src/app/bio-product/use-case/search'
import { BioProductFindOneUseCase } from 'src/app/bio-product/use-case/find-one'

@HttpController({
  basePath: 'bio-products',
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
