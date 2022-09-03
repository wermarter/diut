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

const SWAGGER_ENDPOINT = 'docs'

export async function bootstrap(rootModule: any) {
  const app = await NestFactory.create(rootModule, {
    bufferLogs: true,
  })

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
  SwaggerModule.setup(SWAGGER_ENDPOINT, app, swaggerDocument)

  const PORT = httpServerConfig.port
  await app.listen(PORT)
  logger.log(
    `Documentation on http://localhost:${PORT}/${SWAGGER_ENDPOINT}`,
    'Bootstrap'
  )
}
