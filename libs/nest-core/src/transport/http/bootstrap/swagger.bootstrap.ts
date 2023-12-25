import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { BootstrapConfig } from '../../../bootstrap'
import { SWAGGER_ENDPOINT } from '../constants'

export const SwaggerBootstrap: BootstrapConfig<INestApplication> = {
  afterInit(ctx) {
    const builder = new DocumentBuilder().setTitle(
      ctx.serviceName ?? 'NestJS API',
    )
    const swaggerConfig = builder.build()

    const swaggerDocument = SwaggerModule.createDocument(
      ctx.app,
      swaggerConfig,
      {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
          `${controllerKey.slice(0, -10)}_${methodKey}`, // Remove "Controller" suffix
      },
    )

    SwaggerModule.setup(SWAGGER_ENDPOINT, ctx.app, swaggerDocument, {
      swaggerOptions: {
        docExpansion: 'none',
        filter: true,
        persistAuthorization: true,
      },
      customCss: swaggerCustomCss,
    })
  },
}

const swaggerCustomCss = `
  #swagger-ui {
    max-width: 800px;
    margin: auto;
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
`
