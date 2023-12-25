import { INestApplication, ValidationPipe } from '@nestjs/common'

import { BootstrapConfig } from '../../../bootstrap'

export const PipeBootstrap: BootstrapConfig<INestApplication> = {
  afterInit(ctx) {
    ctx.app.useGlobalPipes(
      new ValidationPipe({
        // convert to DTO to class instance for applying default value
        transform: true,
      }),
    )
  },
}
