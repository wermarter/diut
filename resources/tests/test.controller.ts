import { Body, Param } from '@nestjs/common'
import { AppController, ObjectIdPipe } from '@diut/nest-core'

import { AppRoute } from 'src/common/route.decorator'
import { CreateTestRequestDto } from './dtos/create-test.request-dto'
import { SearchTestRequestDto } from './dtos/search-test.request-dto'
import { UpdateTestRequestDto } from './dtos/update-test.request-dto'
import { testRoutes } from './test.routes'
import { TestService } from './test.service'

@AppController(testRoutes.controller)
export class TestController {
  constructor(private testService: TestService) {}

  @AppRoute(testRoutes.search)
  search(@Body() body: SearchTestRequestDto) {
    return this.testService.search(body)
  }

  @AppRoute(testRoutes.create)
  create(@Body() body: CreateTestRequestDto) {
    return this.testService.create(body)
  }

  @AppRoute(testRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateTestRequestDto,
  ) {
    return this.testService.updateById(id, body)
  }

  @AppRoute(testRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.testService.findById(id)
  }

  @AppRoute(testRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.testService.deleteById(id)
  }
}
