import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-core'

import { testComboRoutes } from './routes'
import {
  TestComboCreateUseCase,
  TestComboDeleteUseCase,
  TestComboSearchUseCase,
  TestComboUpdateUseCase,
  TestComboFindOneUseCase,
  EEntityNotFound,
} from 'src/domain'
import { TestComboCreateRequestDto } from './dto/create.request-dto'
import { TestComboUpdateRequestDto } from './dto/update.request-dto'
import { TestComboSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({
  basePath: 'v1/test-combos',
})
export class TestComboController {
  constructor(
    private readonly testComboCreateUseCase: TestComboCreateUseCase,
    private readonly testComboUpdateUseCase: TestComboUpdateUseCase,
    private readonly testComboDeleteUseCase: TestComboDeleteUseCase,
    private readonly testComboSearchUseCase: TestComboSearchUseCase,
    private readonly testComboFindOneUseCase: TestComboFindOneUseCase,
  ) {}

  @HttpRoute(testComboRoutes.search)
  search(@Body() body: TestComboSearchRequestDto) {
    return this.testComboSearchUseCase.execute(body)
  }

  @HttpRoute(testComboRoutes.create)
  create(@Body() body: TestComboCreateRequestDto) {
    return this.testComboCreateUseCase.execute(body)
  }

  @HttpRoute(testComboRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.testComboFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'branch' }, { path: 'tests' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`TestCombo id=${id}`)
    }

    return rv
  }

  @HttpRoute(testComboRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: TestComboUpdateRequestDto,
  ) {
    return this.testComboUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(testComboRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.testComboDeleteUseCase.execute({ id })
  }
}
