import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nest-core'

import { testCategoryRoutes } from './routes'
import {
  TestCategoryCreateUseCase,
  TestCategoryDeleteUseCase,
  TestCategorySearchUseCase,
  TestCategoryUpdateUseCase,
  TestCategoryFindOneUseCase,
  EEntityNotFound,
} from 'src/domain'
import { TestCategoryCreateRequestDto } from './dto/create.request-dto'
import { TestCategoryUpdateRequestDto } from './dto/update.request-dto'
import { TestCategorySearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({
  basePath: 'v1/test-categories',
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
