import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'http://localhost:9050/api/docs-json',
  apiFile: './src/api/slice.ts',
  apiImport: 'emptySplitApi',
  hooks: true,
  tag: true,

  outputFiles: {
    './src/api/prometheus.ts': {
      filterEndpoints: [/prometheus/i],
    },
    './src/api/patient-type.ts': {
      filterEndpoints: [/patienttype/i],
    },
  },
}

export default config
