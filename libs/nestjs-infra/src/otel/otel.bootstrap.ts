// import { NodeSDK } from '@opentelemetry/sdk-node'
// // import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
// import { Resource } from '@opentelemetry/resources'
// import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
// import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
// import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
// import {
//   CompositePropagator,
//   W3CBaggagePropagator,
//   W3CTraceContextPropagator,
// } from '@opentelemetry/core'
// import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base'
// // import { trace } from '@opentelemetry/api'
// import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

// import { BootstrapConfig } from '../bootstrap'
// import { loadConfigFromEnv } from '../config'
// import { OtelConfig } from './otel.config'

// export let OtelSDK: NodeSDK

// export const OtelBootstrap: BootstrapConfig = {
//   beforeInit(ctx) {
//     const { PROMETHEUS_ENDPOINT, PROMETHEUS_PORT, OTLP_TRACE_EXPORTER_URL } =
//       loadConfigFromEnv(OtelConfig)

//     // const traceExporter = new OTLPTraceExporter({
//     //   url: OTLP_TRACE_EXPORTER_URL,
//     // })
//     const metricExporter = new PrometheusExporter({
//       port: PROMETHEUS_PORT,
//       endpoint: PROMETHEUS_ENDPOINT,
//     })

//     OtelSDK = new NodeSDK({
//       resource: new Resource({
//         [SemanticResourceAttributes.SERVICE_NAME]: ctx.serviceName,
//       }),
//       metricReader: metricExporter,
//       traceExporter: new ConsoleSpanExporter(),
//       contextManager: new AsyncLocalStorageContextManager(),
//       textMapPropagator: new CompositePropagator({
//         propagators: [
//           new W3CTraceContextPropagator(),
//           new W3CBaggagePropagator(),
//         ],
//       }),
//       instrumentations: [
//         getNodeAutoInstrumentations({
//           // '@opentelemetry/instrumentation-mongodb': {
//           //   enabled: false,
//           // },
//           '@opentelemetry/instrumentation-fs': {
//             enabled: false,
//           },
//           // '@opentelemetry/instrumentation-dns': {
//           //   enabled: false,
//           // },
//           // '@opentelemetry/instrumentation-express': {
//           //   enabled: false,
//           // },
//           // '@opentelemetry/instrumentation-net': {
//           //   enabled: false,
//           // },
//         }),
//       ],
//     })

//     OtelSDK.start()

//     // trace
//     //   .getTracerProvider()
//     //   .getTracer('debug')
//     //   .startSpan('test manual from main app')
//     //   .end()
//     // setInterval(() => {
//     //   trace
//     //     .getTracerProvider()
//     //     .getTracer('debug')
//     //     .startSpan('test manual span each 10 second')
//     //     .end()
//     // }, 10000)
//   },
//   onExit() {
//     OtelSDK.shutdown()
//       .then(
//         () => console.log('SDK shut down successfully'),
//         (err) => console.log('Error shutting down SDK', err),
//       )
//       .finally(() => process.exit(0))
//   },
// }

export const OtelBootstrap = {
  beforeInit() {},
  onExit() {},
}
