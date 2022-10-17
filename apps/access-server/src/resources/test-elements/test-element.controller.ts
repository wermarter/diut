import { Body, Logger, Param } from '@nestjs/common'

import { AppController, AppRoute } from 'src/core'
import { ObjectIdPipe } from 'src/clients/mongo'
import { CreateTestElementRequestDto } from './dtos/create-test-element.request-dto'
import { SearchTestElementRequestDto } from './dtos/search-test-element.request-dto'
import { UpdateTestElementRequestDto } from './dtos/update-test-element.request-dto'
import { testElementRoutes } from './test-element.routes'
import { TestElementService } from './test-element.service'

@AppController(testElementRoutes.controller)
export class TestElementController {
  private logger: Logger

  constructor(private testElementService: TestElementService) {
    this.logger = new Logger(TestElementController.name)
  }

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
    @Body() body: UpdateTestElementRequestDto
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
