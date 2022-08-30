import {
  makeCounterProvider,
  makeHistogramProvider,
} from '@willsoto/nestjs-prometheus'
import { CounterConfiguration, HistogramConfiguration } from 'prom-client'

export function generateCounterProviders(
  configs: CounterConfiguration<string>[]
) {
  return configs.map((config) =>
    makeCounterProvider({
      ...config,
    })
  )
}

export function generateHistogramProviders(
  configs: HistogramConfiguration<string>[]
) {
  return configs.map((config) => makeHistogramProvider({ ...config }))
}
