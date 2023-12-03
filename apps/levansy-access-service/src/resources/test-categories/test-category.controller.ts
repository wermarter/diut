import { Body, Param } from '@nestjs/common'
import { AppController, ObjectIdPipe } from '@diut/nest-core'

import { AppRoute } from 'src/common/route.decorator'
import { CreateTestCategoryRequestDto } from './dtos/create-test-category.request-dto'
import { SearchTestCategoryRequestDto } from './dtos/search-test-category.request-dto'
import { UpdateTestCategoryRequestDto } from './dtos/update-test-category.request-dto'
import { testCategoryRoutes } from './test-category.routes'
import { TestCategoryService } from './test-category.service'

@AppController(testCategoryRoutes.controller)
export class TestCategoryController {
  constructor(private testCategoryService: TestCategoryService) {}

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
