import { Body, Param } from '@nestjs/common'
import { AppController, ObjectIdPipe } from '@diut/nestjs-core'

import { AppRoute } from 'src/common/route.decorator'
import { CreateTestElementRequestDto } from './dtos/create-test-element.request-dto'
import { SearchTestElementRequestDto } from './dtos/search-test-element.request-dto'
import { UpdateTestElementRequestDto } from './dtos/update-test-element.request-dto'
import { testElementRoutes } from './test-element.routes'
import { TestElementService } from './test-element.service'

@AppController(testElementRoutes.controller)
export class TestElementController {
  constructor(private testElementService: TestElementService) {}

  @AppRoute(testElementRoutes.search)
  search(@Body() body: SearchTestElementRequestDto) {
    return this.testElementService.search(body)
  }

  @AppRoute(testElementRoutes.create)
  create(@Body() body: CreateTestElementRequestDto) {
    return this.testElementService.create(body)
  }

  @AppRoute(testElementRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateTestElementRequestDto,
  ) {
    return this.testElementService.updateById(id, body)
  }

  @AppRoute(testElementRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.testElementService.findById(id)
  }

  @AppRoute(testElementRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.testElementService.deleteById(id)
  }
}
