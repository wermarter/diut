import { NodeEnv } from '@diut/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { LoggerService, ValidationPipe } from '@nestjs/common'
import { Logger } from 'nestjs-pino'
// import helmet from 'helmet'

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

  app.enableShutdownHooks()
  app.setGlobalPrefix(API_PREFIX)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // convert to DTO to class instance for applying default value
    })
  )

  const logger: LoggerService = app.get(Logger)
  app.useLogger(logger)
  app.flushLogs()

  const config = app.get(ConfigService)
  const isDevelopment = config.get('NODE_ENV') === NodeEnv.Development

  // app.use(helmet())
  app.enableCors({ exposedHeaders: 'Content-Disposition' })

  const httpServerConfig = validateConfig(HttpServerConfig)(
    config.get(HTTP_SERVER_CONFIG_NAME)
  )

  const packageConfig = config.get('package') || {}

  // Bootstrap HTTP server
  const swaggerConfig = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .addBearerAuth()
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey.slice(0, -10)}_${methodKey}`, // Remove "Controller" suffix
  })
  SwaggerModule.setup(SWAGGER_ENDPOINT, app, swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
    },
    customCss: `
      #swagger-ui {
        max-width: 800px;
        margin: auto;
        background-color: red;
      }
      .topbar {
        display: none;
      }
      .swagger-ui .info {
        margin: 30px 0;
      }
      .swagger-ui .opblock .opblock-summary .view-line-link {
        display: none;
      }
      #swagger-ui > section > div.swagger-ui > div:nth-child(2) > div:last-child {
        display: none
      }
    `,
  })

  const PORT = httpServerConfig.port
  const BOOTSTRAP_CONTEXT = 'Bootstrap'
  await app.listen(PORT)
  logger.log(
    `Documentation on http://localhost:${PORT}/${SWAGGER_ENDPOINT}`,
    BOOTSTRAP_CONTEXT
  )

  if (isDevelopment) {
    logger.warn('Running in Development mode!', BOOTSTRAP_CONTEXT)
  }

  return app
}
