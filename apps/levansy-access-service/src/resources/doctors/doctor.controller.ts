import { Body, Logger, Param } from '@nestjs/common'
import { AppController, ObjectIdPipe } from '@diut/server-core'

import { AppRoute } from 'src/common/route.decorator'
import { CreateDoctorRequestDto } from './dtos/create-doctor.request-dto'
import { SearchDoctorRequestDto } from './dtos/search-doctor.request-dto'
import { UpdateDoctorRequestDto } from './dtos/update-doctor.request-dto'
import { doctorRoutes } from './doctor.routes'
import { DoctorService } from './doctor.service'

@AppController(doctorRoutes.controller)
export class DoctorController {
  private logger: Logger

  constructor(private doctorService: DoctorService) {
    this.logger = new Logger(DoctorController.name)
  }

  @AppRoute(doctorRoutes.search)
  search(@Body() body: SearchDoctorRequestDto) {
    return this.doctorService.search(body)
  }

  @AppRoute(doctorRoutes.create)
  create(@Body() body: CreateDoctorRequestDto) {
    return this.doctorService.create(body)
  }

  @AppRoute(doctorRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateDoctorRequestDto,
  ) {
    return this.doctorService.updateById(id, body)
  }

  @AppRoute(doctorRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.doctorService.findById(id)
  }

  @AppRoute(doctorRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.doctorService.deleteById(id)
  }
}
