import { FactoryProvider, Logger, ModuleMetadata } from '@nestjs/common'
import {
  MongooseModuleOptions,
  MongooseModule,
  SchemaFactory,
} from '@nestjs/mongoose'
import { ClassConstructor } from 'class-transformer'
import mongoose from 'mongoose'
import { merge } from 'lodash'

const defaultOptions: MongooseModuleOptions = {
  retryAttempts: 1,
  directConnection: true,
}

export type MongoModuleExtraOptions = {}

type MongoModuleOptions = Omit<
  MongooseModuleOptions,
  keyof MongoModuleExtraOptions
> &
  MongoModuleExtraOptions

type MongoModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'> & {
    useFactory: (
      ...args: any[]
    ) => MongoModuleOptions | Promise<MongoModuleOptions>
  }

export class MongoModule {
  static forRootAsync({
    imports,
    inject,
    useFactory,
  }: MongoModuleAsyncOptions) {
    return MongooseModule.forRootAsync({
      imports,
      inject,
      useFactory: async (...args) => {
        const userOptions = await useFactory(...args)
        const options = merge(defaultOptions, userOptions)

        const logger = new Logger(MongoModule.name)
        mongoose.set('autoIndex', false)

        return {
          ...options,
          connectionFactory: (connection, name) => {
            if (options.connectionFactory !== undefined) {
              connection = options.connectionFactory(connection, name)
            }

            const client = connection.client

            client.on('serverHeartbeatFailed', ({ connectionId }) => {
              logger.warn(
                `MongoDB heartbeat failed: ${connectionId}. Reconnecting...`,
              )
            })

            return connection
          },
        }
      },
    })
  }

  static forFeature(
    SchemaClass: ClassConstructor<unknown>,
    useAutopopulate = false,
  ) {
    return MongooseModule.forFeatureAsync([
      {
        name: SchemaClass.name,
        useFactory: () => {
          const schema = SchemaFactory.createForClass(SchemaClass)

          if (useAutopopulate === true) {
            schema.plugin(require('mongoose-autopopulate'))
          }

          return schema
        },
      },
    ])
  }
}
