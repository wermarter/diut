import { INestApplicationContext, ShutdownSignal } from '@nestjs/common'
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface'
import { clone, merge } from 'lodash'

export type BootstrapContext = {
  serviceName?: string
  nodeEnv?: string
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

export async function bootstrapApp<T extends INestApplicationContext>(
  NestApplicationFactory: (
    AppModule: unknown,
    options: NestApplicationContextOptions,
  ) => Promise<T>,
  AppModule: unknown,
  context: BootstrapContext,
  bootstrapConfigs: BootstrapConfig<T>[],
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
    await beforeInitHook?.(bootstrapContext)
  }

  const app = await NestApplicationFactory(AppModule, initOptions)
  const bootstrapContextWithApp = merge(bootstrapContext, { app })

  for (const afterInitHook of afterInitHooks) {
    await afterInitHook?.(bootstrapContextWithApp)
  }

  process.on(ShutdownSignal.SIGTERM, () => {
    Promise.all(onExitHooks)
  })
  process.on(ShutdownSignal.SIGINT, () => {
    Promise.all(onExitHooks)
  })
}
