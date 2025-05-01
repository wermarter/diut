import { ObjectIdPipe } from '@diut/nestjs-infra'
import { Body, Param } from '@nestjs/common'
import { PatientCreateUseCase } from 'src/app/patient/use-case/create'
import { PatientDeleteUseCase } from 'src/app/patient/use-case/delete'
import { PatientFindOneUseCase } from 'src/app/patient/use-case/find-one'
import { PatientSearchUseCase } from 'src/app/patient/use-case/search'
import { PatientUpdateUseCase } from 'src/app/patient/use-case/update'
import { EEntityNotFound } from 'src/domain'
import { HttpController, HttpRoute } from '../../shared'
import { PatientCreateRequestDto } from './dto/create'
import { PatientSearchRequestDto } from './dto/search'
import { PatientUpdateRequestDto } from './dto/update'
import { patientRoutes } from './routes'

@HttpController({
  basePath: 'patients',
})
export class PatientController {
  constructor(
    private readonly patientCreateUseCase: PatientCreateUseCase,
    private readonly patientUpdateUseCase: PatientUpdateUseCase,
    private readonly patientDeleteUseCase: PatientDeleteUseCase,
    private readonly patientSearchUseCase: PatientSearchUseCase,
    private readonly patientFindOneUseCase: PatientFindOneUseCase,
  ) {}

  @HttpRoute(patientRoutes.search)
  search(@Body() body: PatientSearchRequestDto) {
    return this.patientSearchUseCase.execute(body)
  }

  @HttpRoute(patientRoutes.create)
  create(@Body() body: PatientCreateRequestDto) {
    return this.patientCreateUseCase.execute(body)
  }

  @HttpRoute(patientRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.patientFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'branch' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`Patient id=${id}`)
    }

    return rv
  }

  @HttpRoute(patientRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: PatientUpdateRequestDto,
  ) {
    return this.patientUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(patientRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.patientDeleteUseCase.execute({ _id: id })
  }
}
