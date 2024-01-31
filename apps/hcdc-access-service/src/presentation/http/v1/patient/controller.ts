import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-infra'

import { patientRoutes } from './routes'
import {
  PatientCreateUseCase,
  PatientDeleteUseCase,
  PatientSearchUseCase,
  PatientUpdateUseCase,
  PatientFindOneUseCase,
  EEntityNotFound,
} from 'src/domain'
import { PatientCreateRequestDto } from './dto/create.request-dto'
import { PatientUpdateRequestDto } from './dto/update.request-dto'
import { PatientSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({
  basePath: 'v1/patients',
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
    return this.patientDeleteUseCase.execute({ id })
  }
}
