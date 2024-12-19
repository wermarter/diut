import { Module } from '@nestjs/common'
import { GrpcModule } from './controller'

@Module({
  imports: [GrpcModule],
})
export class AppModule {}
