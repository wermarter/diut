import { INestApplication, ValidationPipe } from '@nestjs/common'
import { BootstrapConfig } from '../../../core/bootstrap'

export const PipeBootstrap: BootstrapConfig<INestApplication> = {
  afterInit(ctx) {
    ctx.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        // transform: true,
      }),
    )
  },
}
