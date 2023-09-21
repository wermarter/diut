import { Body, Logger, Param } from '@nestjs/common'

import { AppController } from '@diut/server-core'
import { AppRoute } from 'src/common/route.decorator'
import { ObjectIdPipe } from '@diut/server-core'
import { CreateTestCategoryRequestDto } from './dtos/create-test-category.request-dto'
import { SearchTestCategoryRequestDto } from './dtos/search-test-category.request-dto'
import { UpdateTestCategoryRequestDto } from './dtos/update-test-category.request-dto'
import { testCategoryRoutes } from './test-category.routes'
import { TestCategoryService } from './test-category.service'

@AppController(testCategoryRoutes.controller)
export class TestCategoryController {
  private logger: Logger

  constructor(private testCategoryService: TestCategoryService) {
    this.logger = new Logger(TestCategoryController.name)
  }

  @AppRoute(testCategoryRoutes.search)
  search(@Body() body: SearchTestCategoryRequestDto) {
    return this.testCategoryService.search(body)
  }

  @AppRoute(testCategoryRoutes.create)
  create(@Body() body: CreateTestCategoryRequestDto) {
    return this.testCategoryService.create(body)
  }

  @AppRoute(testCategoryRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateTestCategoryRequestDto,
  ) {
    return this.testCategoryService.updateById(id, body)
  }

  @AppRoute(testCategoryRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.testCategoryService.findById(id)
  }

  @AppRoute(testCategoryRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.testCategoryService.deleteById(id)
  }
}
