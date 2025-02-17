import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodSchema } from 'zod';

import { ResponseStatus, ServiceResponse } from '@/models/serviceResponse';
import { logger } from '@/utils/logger';

export const handleServiceResponse = (serviceResponse: ServiceResponse<unknown>, response: Response) => {
    return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            ...req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (err) {
        const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(', ')}`;
        const statusCode = StatusCodes.BAD_REQUEST;
        res.status(statusCode).send(new ServiceResponse<null>(ResponseStatus.Failed, errorMessage, null, statusCode));
    }
};

export const syntaxErrorChecker = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // prevent json parse error from stopping server
    logger.info(res);
    if (err instanceof SyntaxError && 'body' in err) {
        const response = new ServiceResponse(ResponseStatus.Failed, 'Invalid input', null, StatusCodes.BAD_REQUEST);
        handleServiceResponse(response, res);
    }
    logger.error(`server.ts : ${err}`);
    next();
};
