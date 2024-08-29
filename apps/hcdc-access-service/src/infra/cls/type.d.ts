import { AuthContextData } from 'src/domain'

declare module 'nestjs-cls' {
  interface ClsStore {
    authContextData: AuthContextData
  }
}
