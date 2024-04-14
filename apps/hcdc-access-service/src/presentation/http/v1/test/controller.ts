import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-infra'

import { testRoutes } from './routes'
import { EEntityNotFound } from 'src/domain'
import {
  TestCreateUseCase,
  TestDeleteUseCase,
  TestSearchUseCase,
  TestUpdateUseCase,
  TestFindOneUseCase,
} from 'src/app'
import { TestCreateRequestDto } from './dto/create.request-dto'
import { TestUpdateRequestDto } from './dto/update.request-dto'
import { TestSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({
  basePath: 'v1/tests',
})
export class TestController {
  constructor(
    private readonly testCreateUseCase: TestCreateUseCase,
    private readonly testUpdateUseCase: TestUpdateUseCase,
    private readonly testDeleteUseCase: TestDeleteUseCase,
    private readonly testSearchUseCase: TestSearchUseCase,
    private readonly testFindOneUseCase: TestFindOneUseCase,
  ) {}

  @HttpRoute(testRoutes.search)
  search(@Body() body: TestSearchRequestDto) {
    return this.testSearchUseCase.execute(body)
  }

  @HttpRoute(testRoutes.create)
  create(@Body() body: TestCreateRequestDto) {
    return this.testCreateUseCase.execute(body)
  }

  @HttpRoute(testRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.testFindOneUseCase.execute({
      filter: { _id: id },
      populates: [
        { path: 'bioProduct' },
        { path: 'instrument' },
        { path: 'sampleType' },
        { path: 'testCategory' },
        { path: 'printForm' },
        { path: 'branch' },
      ],
    })

    if (rv === null) {
      throw new EEntityNotFound(`Test id=${id}`)
    }

    return rv
  }

  @HttpRoute(testRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: TestUpdateRequestDto,
  ) {
    return this.testUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(testRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.testDeleteUseCase.execute({ id })
  }
}
