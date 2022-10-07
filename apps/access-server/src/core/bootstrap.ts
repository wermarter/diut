import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { LoggerService, ValidationPipe } from '@nestjs/common'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'

import {
  HttpServerConfig,
  HTTP_SERVER_CONFIG_NAME,
} from './http-server/http-server.config'
import { validateConfig } from './config/validate-config'

const API_PREFIX = 'api'
const SWAGGER_ENDPOINT = API_PREFIX + '/docs'

export async function bootstrap(rootModule: unknown) {
  const app = await NestFactory.create(rootModule, {
    bufferLogs: true,
  })

  app.setGlobalPrefix(API_PREFIX) // use nginx to direct /api/* to this server instead of static serving html

  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // convert to DTO to class instance for applying default value
    })
  )

  const logger: LoggerService = app.get(Logger)
  const config = app.get(ConfigService)

  app.useLogger(logger)
  app.flushLogs()

  const httpServerConfig = validateConfig(HttpServerConfig)(
    config.get(HTTP_SERVER_CONFIG_NAME)
  )

  const packageConfig = config.get('package') || {}

  // Bootstrap HTTP server
  const swaggerConfig = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(SWAGGER_ENDPOINT, app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
    },
  })

  const PORT = httpServerConfig.port
  await app.listen(PORT)
  logger.log(
    `Documentation on http://localhost:${PORT}/${SWAGGER_ENDPOINT}`,
    'Bootstrap'
  )

  return app
}
