import { Inject, Injectable } from '@nestjs/common'
import { Connection, Options, connect } from 'amqplib'
import { inspect } from 'util'

import { AbstractClientService } from '../abstract-service'
import {
  CONNECTION_ID_TOKEN,
  DEFAULT_CONNECTION_ID,
  MODULE_OPTIONS_TOKEN,
} from './module-builder'

export type AmqpClientOptions = {
  connect: string | Options.Connect
}

@Injectable()
export class AmqpClientService extends AbstractClientService {
  public client: Connection
  private error: string | null = null

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly clientOptions: AmqpClientOptions,
    @Inject(CONNECTION_ID_TOKEN)
    connectionId: string,
  ) {
    connectionId = connectionId ?? DEFAULT_CONNECTION_ID

    super({ connectionId })
  }

  async connect() {
    this.client = await connect(this.clientOptions.connect)
    this.error = null

    this.client.on('error', (err) => {
      this.error = inspect(err)
      this.logger.error(err)
    })
    this.readyCheck()
  }

  readyCheck() {
    const isConnected =
      this.error === null && this.client.connection !== undefined
    if (!isConnected) {
      throw new Error(this.error ?? 'client not connected')
    }
  }

  close() {
    return this.client.close()
  }
}
