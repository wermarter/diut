import { NodeEnv } from '@diut/common'
import { Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose'
import mongoose from 'mongoose'

import { validateConfig } from 'src/core/config/validate-config'
import { MongoConfig, MONGO_CONFIG_NAME } from './mongo.config'

function patchEmitter(emitter: any) {
  var oldEmit = emitter.emit
  emitter.emit = function () {
    var emitArgs = arguments
    console.log({ emitArgs })
    oldEmit.apply(emitter, arguments)
  }
}

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService
      ): MongooseModuleFactoryOptions => {
        const config = validateConfig(MongoConfig)(
          configService.get(MONGO_CONFIG_NAME)
        )
        const isProduction = configService.get('env') === NodeEnv.Production

        const logger = new Logger(MongoModule.name)
        mongoose.set('debug', (coll, method, query, doc, options) => {
          if (!isProduction && method === 'createIndex') {
            return
          }
          logger.debug({ coll, method, query, doc, options })
        })

        mongoose.set('autoIndex', false)

        return {
          uri: config.uri,
          retryAttempts: config.retryAttempts,
          connectionFactory: (connection, name) => {
            const client = connection.client
            // patchEmitter(connection.client)

            client.on('serverHeartbeatFailed', ({ connectionId }) => {
              logger.warn(
                `MongoDB heartbeat failed: ${connectionId}. Reconnecting...`
              )
            })

            return connection
          },
        }
      },
    }),
  ],
})
export class MongoModule {}
