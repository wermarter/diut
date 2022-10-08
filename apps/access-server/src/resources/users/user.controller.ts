import { AppController, AppRoute } from 'src/core'
import { userRoutes } from './user.routes'
import { UserService } from './user.service'

@AppController(userRoutes.controller)
export class UserController {
  constructor(private userService: UserService) {}

  @AppRoute(userRoutes.searchUsers)
  searchUsers() {
    return this.userService.search()
  }
}
