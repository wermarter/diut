import { Body, Param } from '@nestjs/common'
import {
  CustomHttpController,
  CustomHttpRoute,
  ObjectIdPipe,
} from '@diut/nest-core'

import { testCategoryRoutes } from './routes'
import {
  TestCategoryCreateUseCase,
  TestCategoryDeleteUseCase,
  TestCategoryFindByIdUseCase,
  TestCategorySearchUseCase,
  TestCategoryUpdateUseCase,
} from 'src/domain'
import { TestCategoryCreateRequestDto } from './dto/create.request-dto'
import { TestCategoryUpdateRequestDto } from './dto/update.request-dto'
import { TestCategorySearchRequestDto } from './dto/search.request-dto'

@CustomHttpController(testCategoryRoutes.controller)
export class TestCategoryController {
  constructor(
    private readonly testCategoryCreateUseCase: TestCategoryCreateUseCase,
    private readonly testCategoryFindByIdUseCase: TestCategoryFindByIdUseCase,
    private readonly testCategoryUpdateUseCase: TestCategoryUpdateUseCase,
    private readonly testCategoryDeleteUseCase: TestCategoryDeleteUseCase,
    private readonly testCategorySearchUseCase: TestCategorySearchUseCase,
  ) {}

  @CustomHttpRoute(testCategoryRoutes.search)
  search(@Body() body: TestCategorySearchRequestDto) {
    return this.testCategorySearchUseCase.handle(body)
  }

  @CustomHttpRoute(testCategoryRoutes.create)
  create(@Body() body: TestCategoryCreateRequestDto) {
    return this.testCategoryCreateUseCase.handle(body)
  }

  @CustomHttpRoute(testCategoryRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.testCategoryFindByIdUseCase.handle({ id })
  }

  @CustomHttpRoute(testCategoryRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: TestCategoryUpdateRequestDto,
  ) {
    return this.testCategoryUpdateUseCase.handle({ id, ...body })
  }

  @CustomHttpRoute(testCategoryRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.testCategoryDeleteUseCase.handle({ id })
  }
}
