import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { SearchUserResponseDto } from './dtos/search-user.response.dto'

export const userRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'users',
  },

  searchUsers: <AppRouteOptions>{
    openApi: {
      responses: [
        {
          type: SearchUserResponseDto,
        },
      ],
    },
    serialize: SearchUserResponseDto,
  },
}
