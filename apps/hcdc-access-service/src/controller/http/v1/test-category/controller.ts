import { ObjectIdPipe } from '@diut/nestjs-infra'
import { Body, Param } from '@nestjs/common'
import { TestCategoryCreateUseCase } from 'src/app/test-category/use-case/create'
import { TestCategoryDeleteUseCase } from 'src/app/test-category/use-case/delete'
import { TestCategoryFindOneUseCase } from 'src/app/test-category/use-case/find-one'
import { TestCategorySearchUseCase } from 'src/app/test-category/use-case/search'
import { TestCategoryUpdateUseCase } from 'src/app/test-category/use-case/update'
import { EEntityNotFound } from 'src/domain'
import { HttpController, HttpRoute } from '../../shared'
import { TestCategoryCreateRequestDto } from './dto/create'
import { TestCategorySearchRequestDto } from './dto/search'
import { TestCategoryUpdateRequestDto } from './dto/update'
import { testCategoryRoutes } from './routes'

@HttpController({
  basePath: 'test-categories',
})
export class TestCategoryController {
  constructor(
    private readonly testCategoryCreateUseCase: TestCategoryCreateUseCase,
    private readonly testCategoryUpdateUseCase: TestCategoryUpdateUseCase,
    private readonly testCategoryDeleteUseCase: TestCategoryDeleteUseCase,
    private readonly testCategorySearchUseCase: TestCategorySearchUseCase,
    private readonly testCategoryFindOneUseCase: TestCategoryFindOneUseCase,
  ) {}

  @HttpRoute(testCategoryRoutes.search)
  search(@Body() body: TestCategorySearchRequestDto) {
    return this.testCategorySearchUseCase.execute(body)
  }

  @HttpRoute(testCategoryRoutes.create)
  create(@Body() body: TestCategoryCreateRequestDto) {
    return this.testCategoryCreateUseCase.execute(body)
  }

  @HttpRoute(testCategoryRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.testCategoryFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'branch' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`TestCategory id=${id}`)
    }

    return rv
  }

  @HttpRoute(testCategoryRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: TestCategoryUpdateRequestDto,
  ) {
    return this.testCategoryUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(testCategoryRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.testCategoryDeleteUseCase.execute({ _id: id })
  }
}
