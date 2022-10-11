import { Controller, Get, Module } from '@nestjs/common'

@Controller('health')
class HealthController {
  @Get()
  index() {
    return 'còn sống tốt nhé!'
  }
}

@Module({
  controllers: [HealthController],
  providers: [],
})
export class HttpServerModule {}
