import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-infra'

import { printFormRoutes } from './routes'
import { EEntityNotFound } from 'src/domain'
import { PrintFormCreateRequestDto } from './dto/create'
import { PrintFormUpdateRequestDto } from './dto/update'
import { PrintFormSearchRequestDto } from './dto/search'
import { HttpController, HttpRoute } from '../../shared'
import { PrintFormCreateUseCase } from 'src/app/print-form/use-case/create'
import { PrintFormUpdateUseCase } from 'src/app/print-form/use-case/update'
import { PrintFormDeleteUseCase } from 'src/app/print-form/use-case/delete'
import { PrintFormSearchUseCase } from 'src/app/print-form/use-case/search'
import { PrintFormFindOneUseCase } from 'src/app/print-form/use-case/find-one'

@HttpController({
  basePath: 'print-forms',
})
export class PrintFormController {
  constructor(
    private readonly printFormCreateUseCase: PrintFormCreateUseCase,
    private readonly printFormUpdateUseCase: PrintFormUpdateUseCase,
    private readonly printFormDeleteUseCase: PrintFormDeleteUseCase,
    private readonly printFormSearchUseCase: PrintFormSearchUseCase,
    private readonly printFormFindOneUseCase: PrintFormFindOneUseCase,
  ) {}

  @HttpRoute(printFormRoutes.search)
  search(@Body() body: PrintFormSearchRequestDto) {
    return this.printFormSearchUseCase.execute(body)
  }

  @HttpRoute(printFormRoutes.create)
  create(@Body() body: PrintFormCreateRequestDto) {
    return this.printFormCreateUseCase.execute(body)
  }

  @HttpRoute(printFormRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.printFormFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'branch' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`PrintForm id=${id}`)
    }

    return rv
  }

  @HttpRoute(printFormRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: PrintFormUpdateRequestDto,
  ) {
    return this.printFormUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(printFormRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.printFormDeleteUseCase.execute({ id })
  }
}
