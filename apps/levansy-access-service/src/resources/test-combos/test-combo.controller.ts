import { Body, Param } from '@nestjs/common'
import { AppController, ObjectIdPipe } from '@diut/nest-core'

import { AppRoute } from 'src/common/route.decorator'
import { CreateTestComboRequestDto } from './dtos/create-test-combo.request-dto'
import { SearchTestComboRequestDto } from './dtos/search-test-combo.request-dto'
import { UpdateTestComboRequestDto } from './dtos/update-test-combo.request-dto'
import { testComboRoutes } from './test-combo.routes'
import { TestComboService } from './test-combo.service'

@AppController(testComboRoutes.controller)
export class TestComboController {
  constructor(private testComboService: TestComboService) {}

  @AppRoute(testComboRoutes.search)
  search(@Body() body: SearchTestComboRequestDto) {
    return this.testComboService.search(body)
  }

  @AppRoute(testComboRoutes.create)
  create(@Body() body: CreateTestComboRequestDto) {
    return this.testComboService.create(body)
  }

  @AppRoute(testComboRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateTestComboRequestDto,
  ) {
    return this.testComboService.updateById(id, body)
  }

  @AppRoute(testComboRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.testComboService.findById(id)
  }

  @AppRoute(testComboRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.testComboService.deleteById(id)
  }
}
