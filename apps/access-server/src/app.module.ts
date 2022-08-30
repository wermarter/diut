import { Module } from '@nestjs/common'
import { CoreModule } from './core'
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'

@Module({
  imports: [
    CoreModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): MongooseModuleFactoryOptions => {
        const uri = config.get('mongo.uri')
        return {
          uri,
        }
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
