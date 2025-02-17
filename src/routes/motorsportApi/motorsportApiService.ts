import { Races } from '@/routes/motorsportApi/motorsportApiModel';
/**
 * Converts the raw race schedule object received from API to an array of `Races` objects.
 *
 * This function expects an object where each property contains an array of `Races` objects.
 * It iterates through the object, flattens the arrays, and returns an array of `Races` objects.
 *
 * @param {unknown} rawRaceScheduledData - The raw race schedule object, which is expected to have string keys
 *                             with values being arrays of `Races` objects.
 * @returns {Races[]} An array of `Races` objects.
 *
 */
function convertNestedRaceScheduleObjToArray(rawRaceScheduledData: unknown): Races[] {
    // TODO: revisit the implementation of this function to handle the case where the input format changes or sis not as expected
    const result: Races[] = [];

    if (typeof rawRaceScheduledData === 'object' && rawRaceScheduledData !== null) {
        const values = Object.values(rawRaceScheduledData);

        values.forEach((items: Races[]) => {
            if (Array.isArray(items)) {
                items.forEach((item) => {
                    result.push({ ...item });
                });
            }
        });
    }

    return result;
}

export const motorsportApiService = {
    getRaceScheduleForYear: async (year: string): Promise<Races[]> => {
        // fetch data from external API
        const headers: Record<string, string> = {
            'x-rapidapi-host': 'f1-motorsport-data.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
        };
        const response = await fetch(`https://f1-motorsport-data.p.rapidapi.com/schedule?year=${year}`, {
            method: 'GET',
            headers: headers,
        });
        const data = await response.json();

        return convertNestedRaceScheduleObjToArray(data);
    },
};
