import { pino } from 'pino';
const logger = pino({
    name: 'server start',
});

export { logger };
