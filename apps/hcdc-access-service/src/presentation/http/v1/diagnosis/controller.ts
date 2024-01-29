import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-core'

import { diagnosisRoutes } from './routes'
import {
  DiagnosisCreateUseCase,
  DiagnosisDeleteUseCase,
  DiagnosisSearchUseCase,
  DiagnosisUpdateUseCase,
  DiagnosisFindOneUseCase,
  EEntityNotFound,
} from 'src/domain'
import { DiagnosisCreateRequestDto } from './dto/create.request-dto'
import { DiagnosisUpdateRequestDto } from './dto/update.request-dto'
import { DiagnosisSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({
  basePath: 'v1/diagnoses',
})
export class DiagnosisController {
  constructor(
    private readonly diagnosisCreateUseCase: DiagnosisCreateUseCase,
    private readonly diagnosisUpdateUseCase: DiagnosisUpdateUseCase,
    private readonly diagnosisDeleteUseCase: DiagnosisDeleteUseCase,
    private readonly diagnosisSearchUseCase: DiagnosisSearchUseCase,
    private readonly diagnosisFindOneUseCase: DiagnosisFindOneUseCase,
  ) {}

  @HttpRoute(diagnosisRoutes.search)
  search(@Body() body: DiagnosisSearchRequestDto) {
    return this.diagnosisSearchUseCase.execute(body)
  }

  @HttpRoute(diagnosisRoutes.create)
  create(@Body() body: DiagnosisCreateRequestDto) {
    return this.diagnosisCreateUseCase.execute(body)
  }

  @HttpRoute(diagnosisRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.diagnosisFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'branch' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`Diagnosis id=${id}`)
    }

    return rv
  }

  @HttpRoute(diagnosisRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: DiagnosisUpdateRequestDto,
  ) {
    return this.diagnosisUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(diagnosisRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.diagnosisDeleteUseCase.execute({ id })
  }
}
