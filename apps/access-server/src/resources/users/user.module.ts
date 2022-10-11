import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { UserController } from './user.controller'
import { User } from './user.schema'
import { UserService } from './user.service'

@Module({
  imports: [importCollection(User)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
