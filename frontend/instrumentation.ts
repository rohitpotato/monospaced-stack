export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        await import('./instrumentation.node')
    } else if (typeof window !== 'undefined') {
        // Initialize browser tracer
        const { WebTracerProvider } = await import('@opentelemetry/sdk-trace-web');
        const { BatchSpanProcessor } = await import('@opentelemetry/sdk-trace-base');
        const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http');
        const { Resource } = await import('@opentelemetry/resources');
        const { SemanticResourceAttributes } = await import('@opentelemetry/semantic-conventions');
        const { registerInstrumentations } = await import('@opentelemetry/instrumentation');
        const { DocumentLoadInstrumentation } = await import('@opentelemetry/instrumentation-document-load');
        const { UserInteractionInstrumentation } = await import('@opentelemetry/instrumentation-user-interaction');

        const provider = new WebTracerProvider({
            resource: new Resource({
                [SemanticResourceAttributes.SERVICE_NAME]: 'monospaced-frontend-browser',
            }),
        });

        const exporter = new OTLPTraceExporter({
            url: 'http://otel-collector:4317/v1/traces'
        });

        provider.addSpanProcessor(new BatchSpanProcessor(exporter));
        provider.register();

        registerInstrumentations({
            instrumentations: [
                new DocumentLoadInstrumentation(),
                new UserInteractionInstrumentation(),
            ],
        });
    }
}