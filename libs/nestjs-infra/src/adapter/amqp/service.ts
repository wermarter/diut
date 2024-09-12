import { Inject, Injectable } from '@nestjs/common'
import { Connection, Options, connect } from 'amqplib'
import { inspect } from 'util'

import { AbstractService } from '../abstract.service'
import {
  DEFAULT_INSTANCE_ID,
  INSTANCE_ID_TOKEN,
  MODULE_OPTIONS_TOKEN,
} from './module-builder'

export type AmqpClientOptions = {
  connect: string | Options.Connect
}

@Injectable()
export class AmqpService extends AbstractService {
  public client: Connection
  private error: string | null = null

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly clientOptions: AmqpClientOptions,
    @Inject(INSTANCE_ID_TOKEN)
    instanceId: string,
  ) {
    instanceId = instanceId ?? DEFAULT_INSTANCE_ID

    super({ instanceId })
  }

  async connect() {
    this.client = await connect(this.clientOptions.connect)
    this.error = null

    this.client.on('error', (err) => {
      this.error = inspect(err)
      this.logger.error(err)
    })
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
