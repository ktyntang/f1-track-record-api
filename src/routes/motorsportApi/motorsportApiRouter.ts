import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { motorsportApiController } from '@/routes/motorsportApi/motorsportApiController';
import { RacesSchema } from '@/routes/motorsportApi/motorsportApiModel';
import { handleServiceResponse } from '@/shared/utils/httpHandlers';
import { logger } from '@/shared/utils/logger';

export const motorsportApiRegistry = new OpenAPIRegistry();

motorsportApiRegistry.register('Motorsport API', RacesSchema);

export const motorsportAPIRouter: Router = (() => {
    const router = express.Router();

    motorsportApiRegistry.registerPath({
        method: 'get',
        path: '/races/schedule',
        tags: ['Motorsport API'],
        request: {
            query: z.object({
                year: z.string(),
            }),
        },
        responses: createApiResponse(z.array(RacesSchema), 'Success'),
    });

    router.get('/schedule', async (req: Request, res: Response) => {
        logger.info('Fetching data from external API');
        const year = req.query.year as string;
        const serviceResponse = await motorsportApiController.getRaceScheduleForYear(year);
        handleServiceResponse(serviceResponse, res);
    });
    return router;
})();
