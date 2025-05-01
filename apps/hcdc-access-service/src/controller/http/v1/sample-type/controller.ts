import { ObjectIdPipe } from '@diut/nestjs-infra'
import { Body, Param } from '@nestjs/common'
import { SampleTypeCreateUseCase } from 'src/app/sample-type/use-case/create'
import { SampleTypeDeleteUseCase } from 'src/app/sample-type/use-case/delete'
import { SampleTypeFindOneUseCase } from 'src/app/sample-type/use-case/find-one'
import { SampleTypeSearchUseCase } from 'src/app/sample-type/use-case/search'
import { SampleTypeUpdateUseCase } from 'src/app/sample-type/use-case/update'
import { EEntityNotFound } from 'src/domain'
import { HttpController, HttpRoute } from '../../shared'
import { SampleTypeCreateRequestDto } from './dto/create.request-dto'
import { SampleTypeSearchRequestDto } from './dto/search'
import { SampleTypeUpdateRequestDto } from './dto/update'
import { sampleTypeRoutes } from './routes'

@HttpController({
  basePath: 'sample-types',
})
export class SampleTypeController {
  constructor(
    private readonly sampleTypeCreateUseCase: SampleTypeCreateUseCase,
    private readonly sampleTypeUpdateUseCase: SampleTypeUpdateUseCase,
    private readonly sampleTypeDeleteUseCase: SampleTypeDeleteUseCase,
    private readonly sampleTypeSearchUseCase: SampleTypeSearchUseCase,
    private readonly sampleTypeFindOneUseCase: SampleTypeFindOneUseCase,
  ) {}

  @HttpRoute(sampleTypeRoutes.search)
  search(@Body() body: SampleTypeSearchRequestDto) {
    return this.sampleTypeSearchUseCase.execute(body)
  }

  @HttpRoute(sampleTypeRoutes.create)
  create(@Body() body: SampleTypeCreateRequestDto) {
    return this.sampleTypeCreateUseCase.execute(body)
  }

  @HttpRoute(sampleTypeRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.sampleTypeFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'branch' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`SampleType id=${id}`)
    }

    return rv
  }

  @HttpRoute(sampleTypeRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: SampleTypeUpdateRequestDto,
  ) {
    return this.sampleTypeUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(sampleTypeRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleTypeDeleteUseCase.execute({ _id: id })
  }
}
