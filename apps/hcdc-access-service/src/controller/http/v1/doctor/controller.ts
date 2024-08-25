import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-infra'

import { doctorRoutes } from './routes'
import { EEntityNotFound } from 'src/domain'
import { DoctorCreateRequestDto } from './dto/create.request-dto'
import { DoctorUpdateRequestDto } from './dto/update.request-dto'
import { DoctorSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../shared'
import { DoctorCreateUseCase } from 'src/app/doctor/use-case/create'
import { DoctorUpdateUseCase } from 'src/app/doctor/use-case/update'
import { DoctorDeleteUseCase } from 'src/app/doctor/use-case/delete'
import { DoctorSearchUseCase } from 'src/app/doctor/use-case/search'
import { DoctorFindOneUseCase } from 'src/app/doctor/use-case/find-one'

@HttpController({
  basePath: 'doctors',
})
export class DoctorController {
  constructor(
    private readonly doctorCreateUseCase: DoctorCreateUseCase,
    private readonly doctorUpdateUseCase: DoctorUpdateUseCase,
    private readonly doctorDeleteUseCase: DoctorDeleteUseCase,
    private readonly doctorSearchUseCase: DoctorSearchUseCase,
    private readonly doctorFindOneUseCase: DoctorFindOneUseCase,
  ) {}

  @HttpRoute(doctorRoutes.search)
  search(@Body() body: DoctorSearchRequestDto) {
    return this.doctorSearchUseCase.execute(body)
  }

  @HttpRoute(doctorRoutes.create)
  create(@Body() body: DoctorCreateRequestDto) {
    return this.doctorCreateUseCase.execute(body)
  }

  @HttpRoute(doctorRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.doctorFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'branch' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`Doctor id=${id}`)
    }

    return rv
  }

  @HttpRoute(doctorRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: DoctorUpdateRequestDto,
  ) {
    return this.doctorUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(doctorRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.doctorDeleteUseCase.execute({ id })
  }
}
