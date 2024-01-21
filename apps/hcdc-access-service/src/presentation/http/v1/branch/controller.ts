import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nest-core'

import { branchRoutes } from './routes'
import {
  BranchCreateUseCase,
  BranchDeleteUseCase,
  BranchSearchUseCase,
  BranchUpdateUseCase,
  BranchAssertExistsUseCase,
} from 'src/domain'
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
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
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
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.branchAssertExistsUseCase.execute({ _id: id })
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
