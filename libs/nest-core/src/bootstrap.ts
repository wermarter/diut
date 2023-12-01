import { INestApplicationContext, ShutdownSignal } from '@nestjs/common'
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface'
import { NestFactory } from '@nestjs/core'
import { clone, merge } from 'lodash'

export type BootstrapContext = {
  serviceName: string
  NODE_ENV: string
  HTTP_PORT?: string
}

export type BootstrapContextWithApp<T extends INestApplicationContext> =
  BootstrapContext & {
    app: T
  }

export type BootstrapConfig<
  T extends INestApplicationContext = INestApplicationContext,
> = {
  initOptions?: NestApplicationContextOptions
  beforeInit?: (ctx: BootstrapContext) => void | Promise<void>
  afterInit?: (ctx: BootstrapContextWithApp<T>) => void | Promise<void>
  onExit?: (ctx: BootstrapContextWithApp<T>) => void | Promise<void>
}

export async function bootstrapApp<
  T extends INestApplicationContext = INestApplicationContext,
>(
  context: BootstrapContext,
  AppModule: unknown,
  bootstrapConfigs: BootstrapConfig<T>[],
  NestApplicationFactory?: (
    AppModule: unknown,
    additionalOptions: NestApplicationContextOptions,
  ) => Promise<T>,
) {
  const bootstrapContext = clone(context)
  let initOptions: NestApplicationContextOptions = {}
  const beforeInitHooks: BootstrapConfig<T>['beforeInit'][] = []
  const afterInitHooks: BootstrapConfig<T>['afterInit'][] = []
  const onExitHooks: BootstrapConfig<T>['onExit'][] = []

  for (const bootstrapConfig of bootstrapConfigs) {
    if (bootstrapConfig.beforeInit !== undefined) {
      beforeInitHooks.push(bootstrapConfig.beforeInit)
    }
    if (bootstrapConfig.initOptions !== undefined) {
      initOptions = merge(initOptions, bootstrapConfig.initOptions)
    }
    if (bootstrapConfig.afterInit !== undefined) {
      afterInitHooks.push(bootstrapConfig.afterInit)
    }
    if (bootstrapConfig.onExit !== undefined) {
      onExitHooks.push(bootstrapConfig.onExit)
    }
  }

  // START

  for (const beforeInitHook of beforeInitHooks) {
    await beforeInitHook(bootstrapContext)
  }

  if (NestApplicationFactory === undefined) {
    NestApplicationFactory = (AppModule, additionalOptions) =>
      NestFactory.create(AppModule, additionalOptions) as any
  }

  const app = await NestApplicationFactory(AppModule, initOptions)
  const bootstrapContextWithApp = merge(bootstrapContext, { app })

  for (const afterInitHook of afterInitHooks) {
    await afterInitHook(bootstrapContextWithApp)
  }

  process.on(ShutdownSignal.SIGTERM, () => {
    Promise.all(onExitHooks)
  })
  process.on(ShutdownSignal.SIGINT, () => {
    Promise.all(onExitHooks)
  })
}
