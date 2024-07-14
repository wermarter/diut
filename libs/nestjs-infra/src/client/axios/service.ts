import { Inject, Injectable } from '@nestjs/common'
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry'

import { AbstractClientService } from '../service'
import {
  CONNECTION_ID_TOKEN,
  DEFAULT_CONNECTION_ID,
  MODULE_OPTIONS_TOKEN,
} from './module-builder'

export type AxiosClientOptions = {
  axiosConfig?: CreateAxiosDefaults
  retryConfig?: IAxiosRetryConfig
}

@Injectable()
export class AxiosClientService extends AbstractClientService {
  public instance: AxiosInstance

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly clientOptions: AxiosClientOptions,
    @Inject(CONNECTION_ID_TOKEN)
    connectionId: string,
  ) {
    connectionId = connectionId ?? DEFAULT_CONNECTION_ID

    super({
      name: AxiosClientService.name,
      connectionId,
    })
  }

  readyCheck() {
    if (!this.instance) {
      throw new Error('axios instance not created')
    }
  }

  async connect() {
    this.instance = axios.create({ ...this.clientOptions.axiosConfig })
    axiosRetry(this.instance, { ...this.clientOptions.retryConfig })

    this.readyCheck()
  }

  async close() {}
}
