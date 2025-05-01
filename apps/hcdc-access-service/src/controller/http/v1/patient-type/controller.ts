import { ObjectIdPipe } from '@diut/nestjs-infra'
import { Body, Param } from '@nestjs/common'
import { PatientTypeCreateUseCase } from 'src/app/patient-type/use-case/create'
import { PatientTypeDeleteUseCase } from 'src/app/patient-type/use-case/delete'
import { PatientTypeFindOneUseCase } from 'src/app/patient-type/use-case/find-one'
import { PatientTypeSearchUseCase } from 'src/app/patient-type/use-case/search'
import { PatientTypeUpdateUseCase } from 'src/app/patient-type/use-case/update'
import { EEntityNotFound } from 'src/domain'
import { HttpController, HttpRoute } from '../../shared'
import { PatientTypeCreateRequestDto } from './dto/create'
import { PatientTypeSearchRequestDto } from './dto/search'
import { PatientTypeUpdateRequestDto } from './dto/update'
import { patientTypeRoutes } from './routes'

@HttpController({
  basePath: 'patient-types',
})
export class PatientTypeController {
  constructor(
    private readonly patientTypeCreateUseCase: PatientTypeCreateUseCase,
    private readonly patientTypeUpdateUseCase: PatientTypeUpdateUseCase,
    private readonly patientTypeDeleteUseCase: PatientTypeDeleteUseCase,
    private readonly patientTypeSearchUseCase: PatientTypeSearchUseCase,
    private readonly patientTypeFindOneUseCase: PatientTypeFindOneUseCase,
  ) {}

  @HttpRoute(patientTypeRoutes.search)
  search(@Body() body: PatientTypeSearchRequestDto) {
    return this.patientTypeSearchUseCase.execute(body)
  }

  @HttpRoute(patientTypeRoutes.create)
  create(@Body() body: PatientTypeCreateRequestDto) {
    return this.patientTypeCreateUseCase.execute(body)
  }

  @HttpRoute(patientTypeRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.patientTypeFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'branch' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`PatientType id=${id}`)
    }

    return rv
  }

  @HttpRoute(patientTypeRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: PatientTypeUpdateRequestDto,
  ) {
    return this.patientTypeUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(patientTypeRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.patientTypeDeleteUseCase.execute({ _id: id })
  }
}
