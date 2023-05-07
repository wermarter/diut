import { ShutdownSignal } from '@nestjs/common'
import {
  CompositePropagator,
  W3CTraceContextPropagator,
  W3CBaggagePropagator,
} from '@opentelemetry/core'
import {
  BatchSpanProcessor,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger'
import { B3InjectEncoding, B3Propagator } from '@opentelemetry/propagator-b3'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { Resource } from '@opentelemetry/resources'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { MongooseInstrumentation } from '@opentelemetry/instrumentation-mongoose'

const traceExporter = new JaegerExporter({})

const spanProcessor =
  process.env.NODE_ENV === `development`
    ? new SimpleSpanProcessor(traceExporter)
    : new BatchSpanProcessor(traceExporter)

const otelSDK = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: `access-server`, // update this to a more relevant name for you!
  }),

  metricReader: new PrometheusExporter({
    port: 8081,
  }),
  spanProcessor,
  contextManager: new AsyncLocalStorageContextManager(),
  textMapPropagator: new CompositePropagator({
    propagators: [
      new JaegerPropagator(),
      new W3CTraceContextPropagator(),
      new W3CBaggagePropagator(),
      new B3Propagator(),
      new B3Propagator({
        injectEncoding: B3InjectEncoding.MULTI_HEADER,
      }),
    ],
  }),
  instrumentations: [
    // getNodeAutoInstrumentations({
    //   '@opentelemetry/instrumentation-mongodb': {
    //     enabled: false,
    //   },
    //   '@opentelemetry/instrumentation-fs': {
    //     enabled: false,
    //   },
    //   '@opentelemetry/instrumentation-dns': {
    //     enabled: false,
    //   },
    //   '@opentelemetry/instrumentation-express': {
    //     enabled: false,
    //   },
    //   '@opentelemetry/instrumentation-net': {
    //     enabled: false,
    //   },
    // }),
    new HttpInstrumentation(),
    new MongooseInstrumentation(),
  ],
})

export default otelSDK

process.on(ShutdownSignal.SIGTERM, () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err)
    )
    .finally(() => process.exit(0))
})
