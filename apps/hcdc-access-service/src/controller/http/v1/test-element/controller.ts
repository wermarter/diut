import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-infra'

import { testElementRoutes } from './routes'
import { EEntityNotFound } from 'src/domain'
import { TestElementCreateRequestDto } from './dto/create'
import { TestElementUpdateRequestDto } from './dto/update'
import { TestElementSearchRequestDto } from './dto/search'
import { HttpController, HttpRoute } from '../../shared'
import { TestElementCreateUseCase } from 'src/app/test-element/use-case/create'
import { TestElementUpdateUseCase } from 'src/app/test-element/use-case/update'
import { TestElementDeleteUseCase } from 'src/app/test-element/use-case/delete'
import { TestElementSearchUseCase } from 'src/app/test-element/use-case/search'
import { TestElementFindOneUseCase } from 'src/app/test-element/use-case/find-one'

@HttpController({
  basePath: 'test-elements',
})
export class TestElementController {
  constructor(
    private readonly testElementCreateUseCase: TestElementCreateUseCase,
    private readonly testElementUpdateUseCase: TestElementUpdateUseCase,
    private readonly testElementDeleteUseCase: TestElementDeleteUseCase,
    private readonly testElementSearchUseCase: TestElementSearchUseCase,
    private readonly testElementFindOneUseCase: TestElementFindOneUseCase,
  ) {}

  @HttpRoute(testElementRoutes.search)
  search(@Body() body: TestElementSearchRequestDto) {
    return this.testElementSearchUseCase.execute(body)
  }

  @HttpRoute(testElementRoutes.create)
  create(@Body() body: TestElementCreateRequestDto) {
    return this.testElementCreateUseCase.execute(body)
  }

  @HttpRoute(testElementRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.testElementFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'branch' }, { path: 'test' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`TestElement id=${id}`)
    }

    return rv
  }

  @HttpRoute(testElementRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: TestElementUpdateRequestDto,
  ) {
    return this.testElementUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(testElementRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.testElementDeleteUseCase.execute({ id })
  }
}
