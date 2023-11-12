import { Module } from '@nestjs/common'

import { MongoModule } from '@diut/server-core'
import { UserController } from './user.controller'
import { User } from './user.schema'
import { UserService } from './user.service'

@Module({
  imports: [MongoModule.forFeature(User)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
