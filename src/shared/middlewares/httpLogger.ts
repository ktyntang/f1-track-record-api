import { Request, Response } from 'express';
import pinoHttp from 'pino-http';

const httpLogger = pinoHttp({
    transport: {
        target: 'pino-pretty',
        options: {
            levelFirst: true,
            colorize: true,
        },
    },
    serializers: {
        req: (req: Request) => {
            if (process.env.NODE_ENV === 'development') {
                return {
                    method: req.method,
                    url: req.url,
                };
            } else {
                return req;
            }
        },
        res: (res: Response) => {
            if (process.env.NODE_ENV === 'development') {
                return {
                    status: res.statusCode,
                    body: res.json,
                };
            } else {
                return res;
            }
        },
    },
});

export { httpLogger };
