import * as winston from "winston";

const logger = winston.createLogger({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.json()
            ),
            defaultMeta: { service: "winston-lambda" },
            transports: new winston.transports.Console()
        });

export default logger;