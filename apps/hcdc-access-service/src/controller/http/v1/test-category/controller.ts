import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-infra'

import { testCategoryRoutes } from './routes'
import { EEntityNotFound } from 'src/domain'
import { TestCategoryCreateRequestDto } from './dto/create'
import { TestCategoryUpdateRequestDto } from './dto/update'
import { TestCategorySearchRequestDto } from './dto/search'
import { HttpController, HttpRoute } from '../../shared'
import { TestCategoryCreateUseCase } from 'src/app/test-category/use-case/create'
import { TestCategoryUpdateUseCase } from 'src/app/test-category/use-case/update'
import { TestCategoryDeleteUseCase } from 'src/app/test-category/use-case/delete'
import { TestCategorySearchUseCase } from 'src/app/test-category/use-case/search'
import { TestCategoryFindOneUseCase } from 'src/app/test-category/use-case/find-one'

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
    return this.testCategoryDeleteUseCase.execute({ id })
  }
}