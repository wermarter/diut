interface IAppException {
  message: string
  actionLabel?: string
  action?: Function
}

export class AppException extends Error {
  public actionLabel?: string
  public action?: Function

  constructor({ message, actionLabel, action }: IAppException) {
    super(message)

    this.actionLabel = actionLabel
    this.action = action
  }
}
