import { ApiQuery } from '@nestjs/swagger'

export type ExternalAuthQuery = {
  jwt: string
}

export const AuthQuery = () =>
  ApiQuery({
    name: 'jwt',
    required: true,
    type: 'string',
  })
