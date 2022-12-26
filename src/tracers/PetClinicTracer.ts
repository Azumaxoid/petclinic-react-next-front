import { context, trace, Tracer, Span, Exception, SpanStatusCode } from '@opentelemetry/api'
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { OTLPTraceExporter } from  '@opentelemetry/exporter-trace-otlp-http'
import { WebTracerProvider } from'@opentelemetry/sdk-trace-web'
import { Resource } from '@opentelemetry/resources'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
export const exporterConfig = {
    url: "https://otlp.nr-data.net/v1/traces",
    headers: {
        'api-key': '12c98a959684ed8c824925d635add9d2FFFFNRAL',
    }
}

export class PetClinicSpan {
    span: Span
    constructor(span: Span) {
        this.span = span
    }

    end = () => {
        this.span.end(new Date().getTime())
    }

    recordException = (e: any ) => {
        if (typeof e === 'string') {
            var obj: any = {};
            Error.captureStackTrace(obj);
            this.span.recordException({
                message: e,
                stack: obj.stack,
            })
            this.span.setStatus({ code: SpanStatusCode.ERROR, message: e });
        } else {
            const err = e as Error
            this.span.recordException({
                message: e.message,
                name: e.name,
                stack: e.stack,
            }, new Date().getTime())
            this.span.setStatus({ code: SpanStatusCode.ERROR, message: (e.message+'\n'+e.stack) });
        }
    }
}
export class PetClinicTracer {
    provider: WebTracerProvider;
    webTracerWithZone: Tracer;

    constructor () {
        this.provider = new WebTracerProvider({
            resource: new Resource({
                [SemanticResourceAttributes.SERVICE_NAME]: 'pet-clinic-otel-web',
            })
        })
        this.provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
        this.provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter(exporterConfig)));
        registerInstrumentations({
            tracerProvider: this.provider,
        });
        this.provider.register();
        this.webTracerWithZone = this.provider.getTracer('pet-clinic-otel-web');
    }
    /*
    provider.register({
        contextManager: new ZoneContextManager(),
        propagator: new B3Propagator(),
    });
     */

    startSpan = (name: string, parent?: PetClinicSpan, process?: ()=>void): PetClinicSpan => {
        if (!parent) {
            return new PetClinicSpan(this.webTracerWithZone.startSpan(name, {startTime: new Date().getTime()}));
        } else {
            context.with(trace.setSpan(
                context.active(),
                parent.span
            ), (()=>process && process()))
            return new PetClinicSpan(this.webTracerWithZone.startSpan(name, {startTime: new Date().getTime()}));
        }
    }

    startActiveSpan = (name: string, process: ()=>void): PetClinicSpan => {
        return new PetClinicSpan(this.webTracerWithZone.startActiveSpan(name, (span: Span) => {
            try {
                process();
                span.setStatus({code: SpanStatusCode.OK});
                return span;
            } catch (e: any) {
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: e.message,
                });
                if (typeof e === 'string') {
                    var obj: any = {};
                    Error.captureStackTrace(obj);
                    span.recordException({
                        message: e,
                        stack: obj.stack,
                    })
                } else {
                    const err = e as Error
                    span.recordException({
                        message: err.message,
                        name: err.name,
                        stack: e.stack,
                    }, new Date().getTime())
                }
                return span;
            } finally {
                span.end(new Date().getTime());
            }}))
    }
    
    getTracer = () => {
        return this.webTracerWithZone
    }
};

export default  new PetClinicTracer()
