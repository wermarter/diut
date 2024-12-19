import { ObjectIdPipe } from '@diut/nestjs-infra'
import { Body, Param } from '@nestjs/common'
import { InstrumentCreateUseCase } from 'src/app/instrument/use-case/create'
import { InstrumentDeleteUseCase } from 'src/app/instrument/use-case/delete'
import { InstrumentFindOneUseCase } from 'src/app/instrument/use-case/find-one'
import { InstrumentSearchUseCase } from 'src/app/instrument/use-case/search'
import { InstrumentUpdateUseCase } from 'src/app/instrument/use-case/update'
import { EEntityNotFound } from 'src/domain'
import { HttpController, HttpRoute } from '../../shared'
import { InstrumentCreateRequestDto } from './dto/create'
import { InstrumentSearchRequestDto } from './dto/search'
import { InstrumentUpdateRequestDto } from './dto/update'
import { instrumentRoutes } from './routes'

@HttpController({
  basePath: 'instruments',
})
export class InstrumentController {
  constructor(
    private readonly instrumentCreateUseCase: InstrumentCreateUseCase,
    private readonly instrumentUpdateUseCase: InstrumentUpdateUseCase,
    private readonly instrumentDeleteUseCase: InstrumentDeleteUseCase,
    private readonly instrumentSearchUseCase: InstrumentSearchUseCase,
    private readonly instrumentFindOneUseCase: InstrumentFindOneUseCase,
  ) {}

  @HttpRoute(instrumentRoutes.search)
  search(@Body() body: InstrumentSearchRequestDto) {
    return this.instrumentSearchUseCase.execute(body)
  }

  @HttpRoute(instrumentRoutes.create)
  create(@Body() body: InstrumentCreateRequestDto) {
    return this.instrumentCreateUseCase.execute(body)
  }

  @HttpRoute(instrumentRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.instrumentFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'branch' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`Instrument id=${id}`)
    }

    return rv
  }

  @HttpRoute(instrumentRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: InstrumentUpdateRequestDto,
  ) {
    return this.instrumentUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(instrumentRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.instrumentDeleteUseCase.execute({ id })
  }
}
