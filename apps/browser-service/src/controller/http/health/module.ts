import { ModuleMetadata } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './controller'

export const healthModuleMetadata: ModuleMetadata = {
  imports: [TerminusModule],
  controllers: [HealthController],
}
