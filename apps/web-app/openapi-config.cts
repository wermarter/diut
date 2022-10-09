import type {
  ConfigFile,
  OperationDefinition,
} from '@rtk-query/codegen-openapi/lib/types'

const config: ConfigFile = {
  schemaFile: 'http://localhost:9050/api/docs-json',
  apiFile: './src/store/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/store/superApi.ts',
  exportName: 'superApi',
  filterEndpoints: ((
    operationName: string,
    operationDefinition: OperationDefinition
  ) => {
    const controllerName =
      operationDefinition?.operation?.operationId?.split('_')[0] ?? 'Default'
    console.dir(controllerName)
    return controllerName !== 'Prometheus'
  }) as any,
  hooks: true,
  tag: true,
}

export default config
