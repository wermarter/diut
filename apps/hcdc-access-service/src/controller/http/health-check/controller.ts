import { Controller, Get } from '@nestjs/common'

@Controller()
export class HealthCheckController {
  @Get('liveness')
  livenessCheck() {}
}
