import dotenv from 'dotenv';
import fs from 'fs';
import { createServer as createHttpServer, Server as HttpServer } from 'http';
import { createServer as createHttpsServer, Server as HttpsServer } from 'https';
import path from 'path';

import { app } from '@/server';
import { logger } from '@/utils/logger';

dotenv.config();

let server: HttpServer | HttpsServer;
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
    const options = {
        key: fs.readFileSync(path.join(__dirname, '/certs/localhost-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '/certs/localhost.pem')),
    };
    server = createHttpsServer(options, app);
    server.listen(port, () => {
        logger.info(`[server]: Server is running at https://localhost:${port}`);
    });
} else {
    server = createHttpServer(app);
    server.listen(port, () => {
        logger.info(`[server]: Server is running at http://localhost:${port}`);
    });
}
