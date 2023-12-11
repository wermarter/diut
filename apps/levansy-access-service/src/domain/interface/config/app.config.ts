import { NodeEnv } from '@diut/common'

export const AppConfigToken = Symbol('AppConfig')

export interface IAppConfig {
  HTTP_PORT: number

  SERVICE_NAME: string

  NODE_ENV: NodeEnv
}
