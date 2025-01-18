import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'monospaced-frontend',
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter({
    url: 'http://otel-collector:4317/v1/traces',
  })),
})
sdk.start()