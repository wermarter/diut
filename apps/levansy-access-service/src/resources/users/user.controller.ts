import { isAdmin as checkAdmin } from '@diut/levansy-common'
import { Body, Logger, Param, UnauthorizedException } from '@nestjs/common'

import { AppController, ObjectIdPipe } from '@diut/server-core'
import { AppRoute } from 'src/common/route.decorator'
import { CreateUserRequestDto } from './dtos/create-user.request-dto'
import { SearchUserRequestDto } from './dtos/search-user.request-dto'
import { UpdateUserRequestDto } from './dtos/update-user.request-dto'
import { userRoutes } from './user.routes'
import { UserService } from './user.service'
import { AuthTokenPayload, ReqUser } from 'src/auth/auth.common'

@AppController(userRoutes.controller)
export class UserController {
  private logger: Logger

  constructor(private userService: UserService) {
    this.logger = new Logger(UserController.name)
  }

  @AppRoute(userRoutes.search)
  search(@Body() body: SearchUserRequestDto) {
    return this.userService.search(body)
  }

  @AppRoute(userRoutes.create)
  create(@Body() body: CreateUserRequestDto) {
    return this.userService.create(body)
  }

  @AppRoute(userRoutes.updateById)
  async updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateUserRequestDto,
    @ReqUser() user: AuthTokenPayload,
  ) {
    const isAdmin = checkAdmin(user.permissions)

    const targetUser = await this.userService.findById(id)
    const isOwnUser = targetUser?._id?.toString() === user.sub

    if (isOwnUser || isAdmin) {
      return this.userService.updateById(id, body)
    } else {
      throw new UnauthorizedException(
        'You can only modify your own information',
      )
    }
  }

  @AppRoute(userRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.userService.findById(id)
  }

  @AppRoute(userRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.userService.deleteById(id)
  }
}
