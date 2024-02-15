import type { ConfigFile } from '@rtk-query/codegen-openapi'
import { camelCase, kebabCase, upperFirst } from 'lodash'
import * as dotenv from 'dotenv'
dotenv.config()

const ENDPOINTS = [
  // 'auth',
  // 'user',
  // 'patient',
  // 'patient type',
  // 'indication',
  // 'doctor',
  // 'test category',
  // 'test',
  // 'test element',
  // 'sample',
  // 'bio product',
  // 'sample type',
  // 'test combo',
  // 'app setting',
  // 'print form',
  // 'report',
]
const outputFiles = {}

ENDPOINTS.map((name) => {
  const kebabName = kebabCase(name)
  const pascalName = upperFirst(camelCase(name))

  outputFiles[`./src/infra/api/access-service/${kebabName}.ts`] = {
    filterEndpoints: (_, operationDefinition) => {
      const operationId: string =
        operationDefinition?.operation?.operationId ?? ''

      return operationId.startsWith(`${pascalName}_`)
    },
  }
})

const config: ConfigFile = {
  schemaFile: 'http://localhost:5000/api/docs-json',
  apiFile: './src/infra/api/access-service/slice.ts',
  apiImport: 'apiAccessServiceSlice',
  hooks: { lazyQueries: true, mutations: true, queries: true },
  tag: true,
  outputFiles,
}

export default config
