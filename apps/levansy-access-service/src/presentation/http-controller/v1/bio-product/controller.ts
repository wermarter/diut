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
  BioProductFindByIdUseCase,
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
    private readonly bioProductFindByIdUseCase: BioProductFindByIdUseCase,
    private readonly bioProductUpdateUseCase: BioProductUpdateUseCase,
    private readonly bioProductDeleteUseCase: BioProductDeleteUseCase,
    private readonly bioProductSearchUseCase: BioProductSearchUseCase,
  ) {}

  @CustomHttpRoute(bioProductRoutes.search)
  search(@Body() body: BioProductSearchRequestDto) {
    return this.bioProductSearchUseCase.handle(body)
  }

  @CustomHttpRoute(bioProductRoutes.create)
  create(@Body() body: BioProductCreateRequestDto) {
    return this.bioProductCreateUseCase.handle(body)
  }

  @CustomHttpRoute(bioProductRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.bioProductFindByIdUseCase.handle({ id })
  }

  @CustomHttpRoute(bioProductRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: BioProductUpdateRequestDto,
  ) {
    return this.bioProductUpdateUseCase.handle({ id, ...body })
  }

  @CustomHttpRoute(bioProductRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.bioProductDeleteUseCase.handle({ id })
  }
}
