import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-core'

import { roleRoutes } from './routes'
import {
  RoleCreateUseCase,
  RoleDeleteUseCase,
  RoleSearchUseCase,
  RoleUpdateUseCase,
  RoleFindOneUseCase,
  EEntityNotFound,
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
    private readonly roleFindOneUseCase: RoleFindOneUseCase,
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
      populates: [{ path: 'branch' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`Role id=${id}`)
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
