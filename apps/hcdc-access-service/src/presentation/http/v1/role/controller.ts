import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nest-core'

import { roleRoutes } from './routes'
import {
  RoleCreateUseCase,
  RoleDeleteUseCase,
  RoleFindOneUseCase,
  RoleSearchUseCase,
  RoleUpdateUseCase,
  EEntityNotFound,
} from 'src/domain'
import { RoleCreateRequestDto } from './dto/create.request-dto'
import { RoleUpdateRequestDto } from './dto/update.request-dto'
import { RoleSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController(roleRoutes.controller)
export class RoleController {
  constructor(
    private readonly roleCreateUseCase: RoleCreateUseCase,
    private readonly roleFindOneUseCase: RoleFindOneUseCase,
    private readonly roleUpdateUseCase: RoleUpdateUseCase,
    private readonly roleDeleteUseCase: RoleDeleteUseCase,
    private readonly roleSearchUseCase: RoleSearchUseCase,
  ) {}

  @HttpRoute(roleRoutes.search)
  search(@Body() body: RoleSearchRequestDto) {
    return this.roleSearchUseCase.execute(body)
  }

  @HttpRoute(roleRoutes.create)
  create(@Body() body: RoleCreateRequestDto) {
    return this.roleCreateUseCase.execute(body)
  }

  @HttpRoute(roleRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.roleFindOneUseCase.execute({
      filter: { _id: id },
    })

    if (rv == null) {
      throw new EEntityNotFound({ id })
    }

    return rv
  }

  @HttpRoute(roleRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: RoleUpdateRequestDto,
  ) {
    return this.roleUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(roleRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.roleDeleteUseCase.execute({ id })
  }
}
