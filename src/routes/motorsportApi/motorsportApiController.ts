import { StatusCodes } from 'http-status-codes';

import { Races } from '@/routes/motorsportApi/motorsportApiModel';
import { motorsportApiService } from '@/routes/motorsportApi/motorsportApiService';
import { ResponseStatus, ServiceResponse } from '@/shared/models/serviceResponse';
import { logger } from '@/shared/utils/logger';

export const motorsportApiController = {
    getRaceScheduleForYear: async (year: string): Promise<ServiceResponse<Races[] | null>> => {
        try {
            const races = await motorsportApiService.getRaceScheduleForYear(year);
            if (!races) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    `No races found for ${year}`,
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return new ServiceResponse<Races[]>(
                ResponseStatus.Success,
                `Races found for ${year}`,
                races,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = `Error finding races projects: $${(ex as Error).message}`;
            logger.error(errorMessage);
            return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
};
