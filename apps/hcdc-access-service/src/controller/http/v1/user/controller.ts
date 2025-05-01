import { ObjectIdPipe } from '@diut/nestjs-infra'
import { Body, Param } from '@nestjs/common'
import { UserBranchAuthorizeUseCase } from 'src/app/user/use-case/branch-authorize'
import { UserBranchDeauthorizeUseCase } from 'src/app/user/use-case/branch-deauthorize'
import { UserChangePasswordUseCase } from 'src/app/user/use-case/change-password'
import { UserCreateUseCase } from 'src/app/user/use-case/create'
import { UserDeleteUseCase } from 'src/app/user/use-case/delete'
import { UserFindOneUseCase } from 'src/app/user/use-case/find-one'
import { UserSearchUseCase } from 'src/app/user/use-case/search'
import { UserUpdateUseCase } from 'src/app/user/use-case/update'
import { EEntityNotFound } from 'src/domain'
import { HttpController, HttpRoute } from '../../shared'
import { UserChangePasswordRequestDto } from './dto/change-password'
import { UserCreateRequestDto } from './dto/create'
import { UserSearchRequestDto } from './dto/search'
import { UserUpdateRequestDto } from './dto/update'
import { userRoutes } from './routes'

@HttpController({ basePath: 'users' })
export class UserController {
  constructor(
    private readonly userCreateUseCase: UserCreateUseCase,
    private readonly userUpdateUseCase: UserUpdateUseCase,
    private readonly userDeleteUseCase: UserDeleteUseCase,
    private readonly userSearchUseCase: UserSearchUseCase,
    private readonly userFindOneUseCase: UserFindOneUseCase,
    private readonly userChangePasswordUseCase: UserChangePasswordUseCase,
    private readonly userBranchAuthorizeUseCase: UserBranchAuthorizeUseCase,
    private readonly userBranchDeauthorizeUseCase: UserBranchDeauthorizeUseCase,
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
    return this.userChangePasswordUseCase.execute({
      id,
      newPassword: body.password,
    })
  }

  @HttpRoute(userRoutes.branchAuthorize)
  branchAuthorize(
    @Param('userId', ObjectIdPipe) userId: string,
    @Param('branchId', ObjectIdPipe) branchId: string,
  ) {
    return this.userBranchAuthorizeUseCase.execute({ userId, branchId })
  }

  @HttpRoute(userRoutes.branchDeauthorize)
  branchDeauthorize(
    @Param('userId', ObjectIdPipe) userId: string,
    @Param('branchId', ObjectIdPipe) branchId: string,
  ) {
    return this.userBranchDeauthorizeUseCase.execute({ userId, branchId })
  }

  @HttpRoute(userRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.userDeleteUseCase.execute({ _id: id })
  }
}
