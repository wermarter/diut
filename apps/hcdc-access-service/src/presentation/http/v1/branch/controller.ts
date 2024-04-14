import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-infra'

import { branchRoutes } from './routes'
import { EEntityNotFound } from 'src/domain'
import {
  BranchCreateUseCase,
  BranchDeleteUseCase,
  BranchSearchUseCase,
  BranchUpdateUseCase,
  BranchFindOneUseCase,
} from 'src/app'
import { BranchCreateRequestDto } from './dto/create.request-dto'
import { BranchUpdateRequestDto } from './dto/update.request-dto'
import { BranchSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({
  basePath: 'v1/branches',
})
export class BranchController {
  constructor(
    private readonly branchCreateUseCase: BranchCreateUseCase,
    private readonly branchUpdateUseCase: BranchUpdateUseCase,
    private readonly branchDeleteUseCase: BranchDeleteUseCase,
    private readonly branchSearchUseCase: BranchSearchUseCase,
    private readonly branchFindOneUseCase: BranchFindOneUseCase,
  ) {}

  @HttpRoute(branchRoutes.search)
  search(@Body() body: BranchSearchRequestDto) {
    return this.branchSearchUseCase.execute(body)
  }

  @HttpRoute(branchRoutes.create)
  create(@Body() body: BranchCreateRequestDto) {
    return this.branchCreateUseCase.execute(body)
  }

  @HttpRoute(branchRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.branchFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'sampleOrigins' }],
    })

    if (rv == null) {
      throw new EEntityNotFound(`Branch id=${id}`)
    }

    return rv
  }

  @HttpRoute(branchRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: BranchUpdateRequestDto,
  ) {
    return this.branchUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(branchRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.branchDeleteUseCase.execute({ id })
  }
}
