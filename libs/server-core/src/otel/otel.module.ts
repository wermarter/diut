import { Module } from '@nestjs/common'
import { OpenTelemetryModule } from 'nestjs-otel'

@Module({
  imports: [
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: true,
        apiMetrics: {
          enable: true,
          ignoreRoutes: ['/api/health'],
        },
      },
    }),
  ],
})
export class OtelModule {}
