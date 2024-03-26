import * as ModuleResolve from 'resolve'
import { resolve } from 'path'

export * from './browser-service'

export const DIUT_PACKAGE_NAME = 'diut'

export enum DiutGrpcService {
  Browser = 'browser-service',
}

export function resolveProtoPath(service: DiutGrpcService, basedir: string) {
  const PACKAGE_PATH_INDEX_JS = ModuleResolve.sync('@diut/services', {
    basedir,
  })
  const PROTOPATH = resolve(PACKAGE_PATH_INDEX_JS, '..', 'grpc', 'proto')

  return `${PROTOPATH}/${service}.proto`
}
