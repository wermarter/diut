import type { ConfigFile } from '@rtk-query/codegen-openapi'
import { camelCase, kebabCase, upperFirst } from 'lodash'

const ENDPOINTS = [
  // 'auth',
  // 'user',
  'patient',
  // 'patient type',
  // 'doctor',
  // 'test category',
  // 'test',
  'test element',
  'sample',
  'test result',
  'test element result',
]
const outputFiles = {}

ENDPOINTS.map((name) => {
  const kebabName = kebabCase(name)
  const pascalName = upperFirst(camelCase(name))

  outputFiles[`./src/api/${kebabName}.ts`] = {
    filterEndpoints: (_, operationDefinition) => {
      const operationId: string =
        operationDefinition?.operation?.operationId ?? ''

      return operationId.startsWith(`${pascalName}_`)
    },
  }
})

const config: ConfigFile = {
  schemaFile: 'http://localhost:9050/api/docs-json',
  apiFile: './src/api/slice.ts',
  apiImport: 'apiSlice',
  hooks: { lazyQueries: true, mutations: true, queries: true },
  tag: true,
  outputFiles,
}

export default config
