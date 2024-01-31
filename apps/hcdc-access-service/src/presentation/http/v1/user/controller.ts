import { Body, Param } from '@nestjs/common'
import { ObjectIdPipe } from '@diut/nestjs-infra'

import { userRoutes } from './routes'
import { EEntityNotFound } from 'src/domain'
import {
  UserCreateUseCase,
  UserDeleteUseCase,
  UserSearchUseCase,
  UserUpdateUseCase,
  UserFindOneUseCase,
  UserChangePasswordUseCase,
} from 'src/app'
import { UserCreateRequestDto } from './dto/create.request-dto'
import { UserUpdateRequestDto } from './dto/update.request-dto'
import { UserSearchRequestDto } from './dto/search.request-dto'
import { UserChangePasswordRequestDto } from './dto/change-password.request-dto'
import { HttpController, HttpRoute } from '../../common'

@HttpController({ basePath: 'v1/users' })
export class UserController {
  constructor(
    private readonly userCreateUseCase: UserCreateUseCase,
    private readonly userUpdateUseCase: UserUpdateUseCase,
    private readonly userDeleteUseCase: UserDeleteUseCase,
    private readonly userSearchUseCase: UserSearchUseCase,
    private readonly userFindOneUseCase: UserFindOneUseCase,
    private readonly userChangePasswordUseCase: UserChangePasswordUseCase,
  ) {}

  @HttpRoute(userRoutes.search)
  search(@Body() body: UserSearchRequestDto) {
    return this.userSearchUseCase.execute(body)
  }

  @HttpRoute(userRoutes.create)
  create(@Body() body: UserCreateRequestDto) {
    return this.userCreateUseCase.execute(body)
  }

  @HttpRoute(userRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.userFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'roles' }, { path: 'branches' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`User id=${id}`)
    }

    return rv
  }

  @HttpRoute(userRoutes.updateById)
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UserUpdateRequestDto,
  ) {
    return this.userUpdateUseCase.execute({ _id: id }, body)
  }

  @HttpRoute(userRoutes.changePassword)
  changePassword(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UserChangePasswordRequestDto,
  ) {
    return this.userChangePasswordUseCase.execute(id, body.password)
  }

  @HttpRoute(userRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.userDeleteUseCase.execute({ id })
  }
}
