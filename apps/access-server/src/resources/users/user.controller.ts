import { Body, Logger, Param } from '@nestjs/common'

import { AppController, AppRoute } from 'src/core'
import { ObjectIdPipe } from 'src/clients/mongo'
import { CreateUserRequestDto } from './dtos/create-user.request-dto'
import { SearchUserRequestDto } from './dtos/search-user.request-dto'
import { UpdateUserRequestDto } from './dtos/update-user.request-dto'
import { userRoutes } from './user.routes'
import { UserService } from './user.service'

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
  updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateUserRequestDto
  ) {
    return this.userService.updateById(id, body)
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
