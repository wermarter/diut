interface IAppException {
  message: string
  redirectTo?: string
  redirectLabel?: string
}

export class AppException extends Error {
  public redirectTo?: string
  public redirectLabel?: string

  constructor({ message, redirectTo, redirectLabel }: IAppException) {
    super(message)

    this.redirectTo = redirectTo
    this.redirectLabel = redirectLabel
  }
}
