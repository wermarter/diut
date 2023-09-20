import { ValidationPipe } from '@nestjs/common'

import { BootstrapConfig } from '../../bootstrap'

export const PipeBootstrap: BootstrapConfig = {
  afterInit(ctx) {
    ctx.app.useGlobalPipes(
      new ValidationPipe({
        // convert to DTO to class instance for applying default value
        transform: true,
      }),
    )
  },
}
