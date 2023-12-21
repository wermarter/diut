import { Body, Param } from '@nestjs/common'
import {
  CustomHttpController,
  CustomHttpRoute,
  ObjectIdPipe,
} from '@diut/nest-core'

import { bioProductRoutes } from './routes'
import {
  BioProductCreateUseCase,
  BioProductDeleteUseCase,
  BioProductFindOneUseCase,
  BioProductSearchUseCase,
  BioProductUpdateUseCase,
} from 'src/domain'
import { BioProductCreateRequestDto } from './dto/create.request-dto'
import { BioProductUpdateRequestDto } from './dto/update.request-dto'
import { BioProductSearchRequestDto } from './dto/search.request-dto'

@CustomHttpController(bioProductRoutes.controller)
export class BioProductController {
  constructor(
    private readonly bioProductCreateUseCase: BioProductCreateUseCase,
    private readonly bioProductFindOneUseCase: BioProductFindOneUseCase,
    private readonly bioProductUpdateUseCase: BioProductUpdateUseCase,
    private readonly bioProductDeleteUseCase: BioProductDeleteUseCase,
    private readonly bioProductSearchUseCase: BioProductSearchUseCase,
  ) {}

  @CustomHttpRoute(bioProductRoutes.search)
  search(@Body() body: BioProductSearchRequestDto) {
    return this.bioProductSearchUseCase.execute(body)
  }

  @CustomHttpRoute(bioProductRoutes.create)
  create(@Body() body: BioProductCreateRequestDto) {
    return this.bioProductCreateUseCase.execute(body)
  }

  @CustomHttpRoute(bioProductRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.bioProductFindOneUseCase.execute({ filter: { _id: id } })
  }

  @CustomHttpRoute(bioProductRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: BioProductUpdateRequestDto,
  ) {
    return this.bioProductUpdateUseCase.execute({ _id: id }, body)
  }

  @CustomHttpRoute(bioProductRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.bioProductDeleteUseCase.execute({ id })
  }
}
