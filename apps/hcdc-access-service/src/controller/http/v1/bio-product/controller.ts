import { ObjectIdPipe } from '@diut/nestjs-infra'
import { Body, Param } from '@nestjs/common'
import { BioProductCreateUseCase } from 'src/app/bio-product/use-case/create'
import { BioProductDeleteUseCase } from 'src/app/bio-product/use-case/delete'
import { BioProductFindOneUseCase } from 'src/app/bio-product/use-case/find-one'
import { BioProductSearchUseCase } from 'src/app/bio-product/use-case/search'
import { BioProductUpdateUseCase } from 'src/app/bio-product/use-case/update'
import { EEntityNotFound } from 'src/domain'
import { HttpController, HttpRoute } from '../../shared'
import { BioProductCreateRequestDto } from './dto/create'
import { BioProductSearchRequestDto } from './dto/search'
import { BioProductUpdateRequestDto } from './dto/update'
import { bioProductRoutes } from './routes'

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
    return this.bioProductDeleteUseCase.execute({ _id: id })
  }
}
