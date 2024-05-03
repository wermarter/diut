import type { ConfigFile } from '@rtk-query/codegen-openapi'
import { camelCase, kebabCase, upperFirst } from 'lodash'

const ENDPOINTS = [
  // 'bio product',
  // 'patient type',
  // 'diagnosis',
  // 'doctor',
  // 'instrument',
  // 'sample type',
  // 'auth',
  // 'role',
  // 'branch',
  // 'user',
  // 'test category',
  // 'print form',
  // 'test',
  // 'test element',
  // 'patient',
  // 'test combo',
  // 'sample',
  // 'report',
]
const outputFiles = {}

ENDPOINTS.map((name) => {
  const kebabName = kebabCase(name)
  const camelName = camelCase(name)
  const pascalName = upperFirst(camelName)

  outputFiles[`../src/infra/api/access-service/${kebabName}.ts`] = {
    filterEndpoints: (_, operationDefinition) => {
      const operationId: string =
        operationDefinition?.operation?.operationId ?? ''

      return operationId.startsWith(`${pascalName}_`)
    },
    exportName: `${camelName}Api`,
  }
})

const config: ConfigFile = {
  schemaFile: 'http://localhost:5000/api/docs-json',
  apiFile: '../src/infra/api/access-service/slice.ts',
  apiImport: 'accessServiceApiSlice',
  endpointOverrides: [
    { pattern: new RegExp('.+Search$'), type: 'query' },
    { pattern: 'reportQuerySoNhanMau', type: 'query' },
  ],
  hooks: { lazyQueries: true, mutations: true, queries: true },
  tag: true,
  flattenArg: true,
  outputFiles,
}

export default config
