import { PinoModule } from '@diut/nestjs-infra'
import { ModuleMetadata } from '@nestjs/common'

export const pinoMetadata: ModuleMetadata = {
  imports: [
    PinoModule.registerAsync({
      useFactory() {
        return {
          options: {},
        }
      },
    }),
  ],
}
