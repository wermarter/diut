import { Module } from '@nestjs/common'
import { GrpcModule, HttpModule } from './controller'

@Module({
  imports: [GrpcModule, HttpModule],
})
export class AppModule {}
