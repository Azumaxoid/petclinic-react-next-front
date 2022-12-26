import * as Pino from "pino";

export const logger = Pino.pino({
    name: 'app-name',
    level: 'debug'
});

export default logger;