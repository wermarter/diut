import { NodeEnv } from '@diut/common'
// import { DiagConsoleLogger, DiagLogLevel, diag } from '@opentelemetry/api'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { config } from 'dotenv'
config()

if (process.env.NODE_ENV !== NodeEnv.Production) {
  // diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)
}

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: process.env.SERVICE_NAME,
  }),
  metricReader: new PrometheusExporter({ port: 9464 }),
  traceExporter: process.env.TRACE_OTLP_URL
    ? new OTLPTraceExporter({
        url: process.env.TRACE_OTLP_URL,
      })
    : undefined,
  instrumentations: getNodeAutoInstrumentations({
    '@opentelemetry/instrumentation-pino': {
      disableLogSending: true,
    },
    '@opentelemetry/instrumentation-express': {
      enabled: false,
    },
    '@opentelemetry/instrumentation-http': {
      enabled: false,
    },
  }),
})

sdk.start()

process.on('beforeExit', async () => {
  await sdk.shutdown()
})
