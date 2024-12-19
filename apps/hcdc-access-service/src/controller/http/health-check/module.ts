import { Module } from '@nestjs/common'
import { HealthCheckController } from './controller'

@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
