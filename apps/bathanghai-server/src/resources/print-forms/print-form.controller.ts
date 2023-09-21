import { Body, Logger, Param } from '@nestjs/common'

import { AppController } from '@diut/server-core'
import { AppRoute } from 'src/common/route.decorator'
import { ObjectIdPipe } from '@diut/server-core'
import { CreatePrintFormRequestDto } from './dtos/create-print-form.request-dto'
import { SearchPrintFormRequestDto } from './dtos/search-print-form.request-dto'
import { UpdatePrintFormRequestDto } from './dtos/update-print-form.request-dto'
import { printFormRoutes } from './print-form.routes'
import { PrintFormService } from './print-form.service'

@AppController(printFormRoutes.controller)
export class PrintFormController {
  private logger: Logger

  constructor(private printFormService: PrintFormService) {
    this.logger = new Logger(PrintFormController.name)
  }

  @AppRoute(printFormRoutes.search)
  search(@Body() body: SearchPrintFormRequestDto) {
    return this.printFormService.search(body)
  }

  @AppRoute(printFormRoutes.create)
  create(@Body() body: CreatePrintFormRequestDto) {
    return this.printFormService.create(body)
  }

  @AppRoute(printFormRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdatePrintFormRequestDto,
  ) {
    return this.printFormService.updateById(id, body)
  }

  @AppRoute(printFormRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.printFormService.findById(id)
  }

  @AppRoute(printFormRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.printFormService.deleteById(id)
  }
}
