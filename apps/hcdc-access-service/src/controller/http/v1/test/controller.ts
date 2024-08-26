import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-infra'

import { testRoutes } from './routes'
import { EEntityNotFound } from 'src/domain'
import { TestCreateRequestDto } from './dto/create'
import { TestUpdateRequestDto } from './dto/update'
import { TestSearchRequestDto } from './dto/search'
import { HttpController, HttpRoute } from '../../shared'
import { TestCreateUseCase } from 'src/app/test/use-case/create'
import { TestUpdateUseCase } from 'src/app/test/use-case/update'
import { TestDeleteUseCase } from 'src/app/test/use-case/delete'
import { TestSearchUseCase } from 'src/app/test/use-case/search'
import { TestFindOneUseCase } from 'src/app/test/use-case/find-one'

@HttpController({
  basePath: 'tests',
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
        { path: 'printForms' },
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
