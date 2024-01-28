import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nest-core'

import { sampleRoutes } from './routes'
import {
  SampleCreateUseCase,
  SampleDeleteUseCase,
  SampleSearchUseCase,
  SampleUpdateUseCase,
  SampleFindOneUseCase,
  EEntityNotFound,
} from 'src/domain'
import { SampleCreateRequestDto } from './dto/create.request-dto'
import { SampleUpdateRequestDto } from './dto/update.request-dto'
import { SampleSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({
  basePath: 'v1/samples',
})
export class SampleController {
  constructor(
    private readonly sampleCreateUseCase: SampleCreateUseCase,
    private readonly sampleUpdateUseCase: SampleUpdateUseCase,
    private readonly sampleDeleteUseCase: SampleDeleteUseCase,
    private readonly sampleSearchUseCase: SampleSearchUseCase,
    private readonly sampleFindOneUseCase: SampleFindOneUseCase,
  ) {}

  @HttpRoute(sampleRoutes.search)
  search(@Body() body: SampleSearchRequestDto) {
    return this.sampleSearchUseCase.execute(body)
  }

  @HttpRoute(sampleRoutes.create)
  create(@Body() body: SampleCreateRequestDto) {
    return this.sampleCreateUseCase.execute(body)
  }

  @HttpRoute(sampleRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.sampleFindOneUseCase.execute({
      filter: { _id: id },
      populates: [
        { path: 'results.test' },
        { path: 'results.resultBy' },
        { path: 'results.elements.testElement' },
        { path: 'infoBy' },
        { path: 'printedBy' },
        { path: 'patient' },
        { path: 'doctor' },
        { path: 'patientType' },
        { path: 'diagnosis' },
        { path: 'origin' },
        { path: 'sampleTypes' },
        { path: 'branch' },
      ],
    })

    if (rv === null) {
      throw new EEntityNotFound(`Sample id=${id}`)
    }

    return rv
  }

  @HttpRoute(sampleRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: SampleUpdateRequestDto,
  ) {
    return this.sampleUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(sampleRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleDeleteUseCase.execute({ id })
  }
}
