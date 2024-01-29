import {
  LifecycleBootstrap,
  LogBootstrap,
  bootstrapApp,
  HttpAppFactory,
  HttpListenBootstrap,
} from '@diut/nestjs-core'
import * as dotenv from 'dotenv'
import { INestApplication } from '@nestjs/common'

import { AppModule } from './app.module'

dotenv.config()

bootstrapApp<INestApplication>(
  HttpAppFactory,
  AppModule,
  { serviceName: process.env.SERVICE_NAME, nodeEnv: process.env.NODE_ENV },
  [
    LogBootstrap,
    LifecycleBootstrap,
    HttpListenBootstrap(process.env.HTTP_PORT),
  ],
)
