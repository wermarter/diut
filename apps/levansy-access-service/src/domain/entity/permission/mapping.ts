import { AuthSubject } from '../auth-subject'

export type EntityPermission<
  TSubject extends AuthSubject = AuthSubject,
  TAction extends string = string,
> = {
  subject: TSubject
  actions: TAction[]
}
