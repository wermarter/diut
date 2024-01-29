import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-core'

import { instrumentRoutes } from './routes'
import {
  InstrumentCreateUseCase,
  InstrumentDeleteUseCase,
  InstrumentSearchUseCase,
  InstrumentUpdateUseCase,
  InstrumentFindOneUseCase,
  EEntityNotFound,
} from 'src/domain'
import { InstrumentCreateRequestDto } from './dto/create.request-dto'
import { InstrumentUpdateRequestDto } from './dto/update.request-dto'
import { InstrumentSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({
  basePath: 'v1/instruments',
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
