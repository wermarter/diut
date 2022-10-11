import { Body, Logger, Param, UseGuards } from '@nestjs/common'

import { AppController, AppRoute } from 'src/core'
import { ObjectIdPipe } from 'src/clients/mongo'
import { CreatePatientTypeRequestDto } from './dtos/create-patient-type.request-dto'
import { SearchPatientTypeRequestDto } from './dtos/search-patient-type.request-dto'
import { UpdatePatientTypeRequestDto } from './dtos/update-patient-type.request-dto'
import { patientTypeRoutes } from './patient-type.routes'
import { PatientTypeService } from './patient-type.service'
import { JwtAuthGuard } from 'src/auth'

@UseGuards(JwtAuthGuard)
@AppController(patientTypeRoutes.controller)
export class PatientTypeController {
  private logger: Logger

  constructor(private patientTypeService: PatientTypeService) {
    this.logger = new Logger(PatientTypeController.name)
  }

  @AppRoute(patientTypeRoutes.search)
  search(@Body() body: SearchPatientTypeRequestDto) {
    return this.patientTypeService.search(body)
  }

  @AppRoute(patientTypeRoutes.create)
  create(@Body() body: CreatePatientTypeRequestDto) {
    return this.patientTypeService.create(body)
  }

  @AppRoute(patientTypeRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdatePatientTypeRequestDto
  ) {
    return this.patientTypeService.updateById(id, body)
  }

  @AppRoute(patientTypeRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.patientTypeService.findById(id)
  }

  @AppRoute(patientTypeRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.patientTypeService.deleteById(id)
  }
}
