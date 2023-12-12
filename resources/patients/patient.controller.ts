import { Body, Logger, Param } from '@nestjs/common'
import { AppController, ObjectIdPipe } from '@diut/nest-core'

import { AppRoute } from 'src/common/route.decorator'
import { CreatePatientRequestDto } from './dtos/create-patient.request-dto'
import { SearchPatientRequestDto } from './dtos/search-patient.request-dto'
import { UpdatePatientRequestDto } from './dtos/update-patient.request-dto'
import { patientRoutes } from './patient.routes'
import { PatientService } from './patient.service'

@AppController(patientRoutes.controller)
export class PatientController {
  private logger: Logger

  constructor(private patientService: PatientService) {
    this.logger = new Logger(PatientController.name)
  }

  @AppRoute(patientRoutes.search)
  search(@Body() body: SearchPatientRequestDto) {
    return this.patientService.search(body)
  }

  @AppRoute(patientRoutes.create)
  create(@Body() body: CreatePatientRequestDto) {
    return this.patientService.create(body)
  }

  @AppRoute(patientRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdatePatientRequestDto,
  ) {
    return this.patientService.updateById(id, body)
  }

  @AppRoute(patientRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.patientService.findById(id)
  }

  @AppRoute(patientRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.patientService.deleteById(id)
  }
}
