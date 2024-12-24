import { InjectPuppeteerService, PuppeteerService } from '@diut/nestjs-infra'
import { Controller, Get, UseFilters } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus'
import { setTimeout } from 'timers/promises'
import { AllExceptionsFilter } from '../shared/exception-filter'

@Controller('health')
@UseFilters(AllExceptionsFilter)
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    @InjectPuppeteerService()
    private readonly puppeteerClient: PuppeteerService,
  ) {}

  @Get('liveness')
  @HealthCheck()
  async liveness() {
    const result: HealthCheckResult = await this.health.check([
      () => this.puppeteerClient.healthcheck(),
    ])

    return result
  }

  @Get('error')
  async error() {
    throw new Error('Error')
  }

  @Get('timeout')
  async timeout() {
    return setTimeout(120_000)
  }
}
