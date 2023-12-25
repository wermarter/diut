import { User } from './entity'

export const unauthenticatedUser: User = {
  _id: 'unauthenticated',
  name: 'Unauthenticated',
  username: 'unauthenticated',
  password: 'XXXXXXXXXXXXXXX',

  createdAt: new Date(),
  updatedAt: new Date(),
}

export function isUnauthenticatedUser(user: User) {
  return user._id === unauthenticatedUser._id
}
