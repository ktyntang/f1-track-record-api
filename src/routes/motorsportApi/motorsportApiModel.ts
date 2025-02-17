import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Request } from 'express';
import { z } from 'zod';

export interface MotosportAPIRequest extends Request {
    headers: {
        'x-rapidapi-host'?: string;
        'x-rapidapi-key'?: string;
    };
}

extendZodWithOpenApi(z);
export type Races = z.infer<typeof RacesSchema>;

export const RacesSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
    featuredAthletes: z.string(),
    status: z.object({
        id: z.string(),
        state: z.string(),
        detail: z.string(),
    }),
    completed: z.boolean(),
    gPrx: z.string(),
    crct: z.string(),
    evLink: z.string(),
    isPostponedOrCanceled: z.boolean(),
    winner: z.string().optional(),
    broadcasts: z.array(z.string()).optional(),
    time: z.string().optional(),
});

// Input Validation for 'GET races/schedule' endpoint
export const RacesScheduleQuerySchema = z.object({
    year: z.string(),
});
