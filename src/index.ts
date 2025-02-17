import dotenv from 'dotenv';
import { createServer as createHttpServer, Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';

import { app } from '@/server';
import { logger } from '@/shared/utils/logger';

dotenv.config();

let server: HttpServer | HttpsServer;
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
    server = createHttpServer(app);
    server.listen(port, () => {
        logger.info(`[server]: Server is running at http://localhost:${port}`);
    });
}
