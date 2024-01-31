import * as ModuleResolve from 'resolve'
import { resolve } from 'path'

export * as ExampleServiceConfig from './example-service'
export * as BrowserServiceConfig from './browser-service'
export * as ExcelServiceConfig from './excel-service'
export * as PDFServiceConfig from './pdf-service'

export enum DiutGrpcService {
  Example = 'example-service',
  Browser = 'browser-service',
  PDF = 'pdf-service',
  Excel = 'excel-service',
}

export function resolveProtoPath(service: DiutGrpcService, basedir: string) {
  const PACKAGE_PATH_INDEX_JS = ModuleResolve.sync('@diut/services', {
    basedir,
  })
  const PROTOPATH = resolve(PACKAGE_PATH_INDEX_JS, '..', 'grpc', 'proto')

  return `${PROTOPATH}/${service}.proto`
}
