import { INestApplication, ShutdownSignal } from '@nestjs/common'
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface'
import { NestFactory } from '@nestjs/core'
import { clone, merge } from 'lodash'

export type BootstrapContext = {
  serviceName: string
}

export type BootstrapContextWithApp = BootstrapContext & {
  app: INestApplication
}

export type BootstrapConfig = {
  initOptions?: NestApplicationContextOptions
  beforeInit?: (ctx: BootstrapContext) => void | Promise<void>
  afterInit?: (ctx: BootstrapContextWithApp) => void | Promise<void>
  onExit?: (ctx: BootstrapContextWithApp) => void | Promise<void>
}

export async function bootstrapApp(
  context: BootstrapContext,
  AppModule: unknown,
  bootstrapConfigs: BootstrapConfig[],
) {
  const bootstrapContext = clone(context)
  let initOptions: NestApplicationContextOptions = {}
  const afterInitHooks: BootstrapConfig['afterInit'][] = []
  const onExitHooks: BootstrapConfig['onExit'][] = []

  for (const bootstrapConfig of bootstrapConfigs) {
    if (bootstrapConfig.beforeInit !== undefined) {
      await bootstrapConfig.beforeInit(bootstrapContext)
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

  const app = await NestFactory.create(AppModule, initOptions)
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
