export class AppException<ContextType = never> extends Error {
  public actionLabel?: string
  public action?: Function
  public context?: ContextType

  constructor({
    message,
    actionLabel,
    action,
    context,
  }: {
    message: string
    actionLabel?: string
    action?: Function
    context?: ContextType
  }) {
    super(message)

    this.actionLabel = actionLabel
    this.action = action
    this.context = context
  }
}
