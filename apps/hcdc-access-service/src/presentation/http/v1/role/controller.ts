import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nest-core'

import { roleRoutes } from './routes'
import {
  RoleCreateUseCase,
  RoleDeleteUseCase,
  RoleSearchUseCase,
  RoleUpdateUseCase,
  RoleAssertExistsUseCase,
} from 'src/domain'
import { RoleCreateRequestDto } from './dto/create.request-dto'
import { RoleUpdateRequestDto } from './dto/update.request-dto'
import { RoleSearchRequestDto } from './dto/search.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({ basePath: 'v1/roles' })
export class RoleController {
  constructor(
    private readonly roleCreateUseCase: RoleCreateUseCase,
    private readonly roleUpdateUseCase: RoleUpdateUseCase,
    private readonly roleDeleteUseCase: RoleDeleteUseCase,
    private readonly roleSearchUseCase: RoleSearchUseCase,
    private readonly roleAssertExistsUseCase: RoleAssertExistsUseCase,
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
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.roleAssertExistsUseCase.execute({ _id: id })
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
