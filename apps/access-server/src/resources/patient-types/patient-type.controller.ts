import { Body, Param } from '@nestjs/common'

import { AppController, AppRoute } from 'src/core'
import { CreatePatientTypeRequestDto } from './dtos/create-patient-type.request.dto'
import { UpdatePatientTypeRequestDto } from './dtos/update-patient-type.request.dto'
import { patientTypeRoutes } from './patient-type.routes'
import { PatientTypeService } from './patient-type.service'

@AppController(patientTypeRoutes.controller)
export class PatientTypeController {
  constructor(private patientTypeService: PatientTypeService) {}

  @AppRoute(patientTypeRoutes.search)
  search() {
    return this.patientTypeService.search()
  }

  @AppRoute(patientTypeRoutes.create)
  create(@Body() body: CreatePatientTypeRequestDto) {
    return this.patientTypeService.create(body)
  }

  @AppRoute(patientTypeRoutes.updateById)
  updateById(
    @Param('id') id: string,
    @Body() body: UpdatePatientTypeRequestDto
  ) {
    return this.patientTypeService.updateById(id, body)
  }

  @AppRoute(patientTypeRoutes.findById)
  findById(@Param('id') id: string) {
    return this.patientTypeService.findById(id)
  }

  @AppRoute(patientTypeRoutes.deleteById)
  deleteById(@Param('id') id: string) {
    return this.patientTypeService.deleteById(id)
  }
}
