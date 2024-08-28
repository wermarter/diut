import { ObjectIdPipe } from '@diut/nestjs-infra'
import { Body, Param } from '@nestjs/common'

import { RoleCreateUseCase } from 'src/app/role/use-case/create'
import { RoleDeleteUseCase } from 'src/app/role/use-case/delete'
import { RoleFindOneUseCase } from 'src/app/role/use-case/find-one'
import { RoleSearchUseCase } from 'src/app/role/use-case/search'
import { RoleUpdateUseCase } from 'src/app/role/use-case/update'
import { EEntityNotFound } from 'src/domain'
import { HttpController, HttpRoute } from '../../shared'
import { RoleCreateRequestDto } from './dto/create'
import { RoleSearchRequestDto } from './dto/search'
import { RoleUpdateRequestDto } from './dto/update'
import { roleRoutes } from './routes'

@HttpController({ basePath: 'roles' })
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
