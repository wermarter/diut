import { ObjectIdPipe } from '@diut/nestjs-infra'
import { Body, Param } from '@nestjs/common'
import { TestComboCreateUseCase } from 'src/app/test-combo/use-case/create'
import { TestComboDeleteUseCase } from 'src/app/test-combo/use-case/delete'
import { TestComboFindOneUseCase } from 'src/app/test-combo/use-case/find-one'
import { TestComboSearchUseCase } from 'src/app/test-combo/use-case/search'
import { TestComboUpdateUseCase } from 'src/app/test-combo/use-case/update'
import { EEntityNotFound } from 'src/domain'
import { HttpController, HttpRoute } from '../../shared'
import { TestComboCreateRequestDto } from './dto/create'
import { TestComboSearchRequestDto } from './dto/search'
import { TestComboUpdateRequestDto } from './dto/update'
import { testComboRoutes } from './routes'

@HttpController({
  basePath: 'test-combos',
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
