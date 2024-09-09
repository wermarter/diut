import { ConfirmChannel, ConsumeMessage, Options } from 'amqplib'

export interface IConsumable<TPayload = unknown> {
  cancel(): Promise<void>

  consume(
    callback: (
      payload: TPayload,
      channel: ConfirmChannel,
      message: ConsumeMessage,
    ) => void | Promise<void>,
    options?: Options.Consume,
    finallyHook?: () => void | Promise<void>,
    onChannelClose?: Function,
    routingKeys?: string[],
  ): Promise<void>
}

export class NackMessage {}
