import { ObjectIdPipe } from '@diut/nestjs-infra'
import { Body, Param } from '@nestjs/common'
import { DiagnosisCreateUseCase } from 'src/app/diagnosis/use-case/create'
import { DiagnosisDeleteUseCase } from 'src/app/diagnosis/use-case/delete'
import { DiagnosisFindOneUseCase } from 'src/app/diagnosis/use-case/find-one'
import { DiagnosisSearchUseCase } from 'src/app/diagnosis/use-case/search'
import { DiagnosisUpdateUseCase } from 'src/app/diagnosis/use-case/update'
import { EEntityNotFound } from 'src/domain'
import { HttpController, HttpRoute } from '../../shared'
import { DiagnosisCreateRequestDto } from './dto/create'
import { DiagnosisSearchRequestDto } from './dto/search'
import { DiagnosisUpdateRequestDto } from './dto/update'
import { diagnosisRoutes } from './routes'

@HttpController({
  basePath: 'diagnoses',
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
