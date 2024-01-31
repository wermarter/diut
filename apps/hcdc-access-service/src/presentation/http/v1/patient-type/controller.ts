import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-infra'

import { patientTypeRoutes } from './routes'
import { EEntityNotFound } from 'src/domain'
import {
  PatientTypeCreateUseCase,
  PatientTypeDeleteUseCase,
  PatientTypeSearchUseCase,
  PatientTypeUpdateUseCase,
  PatientTypeFindOneUseCase,
} from 'src/app'
import { PatientTypeCreateRequestDto } from './dto/create.request-dto'
import { PatientTypeUpdateRequestDto } from './dto/update.request-dto'
import { PatientTypeSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({
  basePath: 'v1/patient-types',
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
    return this.patientTypeDeleteUseCase.execute({ id })
  }
}
