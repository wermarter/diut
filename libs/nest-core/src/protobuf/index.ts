import * as ModuleResolve from 'resolve'
import { resolve } from 'path'

export const DIUT_PACKAGE_NAME = 'diut'
export enum ProtobufService {
  Puppeteer = 'puppeteer',
}
export * from './generated/puppeteer.pb'

export function resolveProtoPath(service: ProtobufService, basedir: string) {
  const PACKAGE_PATH_INDEX_JS = ModuleResolve.sync('@diut/nest-core', {
    basedir,
  })
  const PROTOPATH = resolve(PACKAGE_PATH_INDEX_JS, '..', 'protobuf')

  return `${PROTOPATH}/${service}.proto`
}
