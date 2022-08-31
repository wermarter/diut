import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { LoggerService } from '@nestjs/common'

import { HttpServerConfig } from './http-server/http-server.config'
import { validateConfig } from './config/validate-config'

const SWAGGER_ENDPOINT = 'docs'

export async function bootstrap(rootModule: any) {
  const app = await NestFactory.create(rootModule, { bufferLogs: true })

  const logger: LoggerService = app.get(WINSTON_MODULE_NEST_PROVIDER)
  const config = app.get(ConfigService)

  app.useLogger(logger)

  const httpServerConfig = validateConfig(HttpServerConfig)(
    config.get('http-server')
  )

  const packageConfig = config.get('package') || {}

  // Bootstrap HTTP server
  const swaggerConfig = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(SWAGGER_ENDPOINT, app, swaggerDocument)

  const PORT = httpServerConfig.port || 3000
  await app.listen(PORT)
  logger.log(`HTTP server listenning on port ${PORT}`)
}
