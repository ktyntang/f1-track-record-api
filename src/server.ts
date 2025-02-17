import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';

import { openAPIRouter } from '@/api-docs/openAPIRouter';
import { httpLogger } from '@/middlewares/httpLogger';
import { healthCheckRouter } from '@/routes/healthCheck/healthCheckRouter';
// import errorHandler from '@/common/middleware/errorHandler';
import { syntaxErrorChecker } from '@/utils/httpHandlers';

const app: Express = express();

// Security Middlewares
app.use(
    cors({
        origin: ['https://localhost:3000'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
        exposedHeaders: ['Retry-After', 'X-RateLimit-Remaining'],
    })
);

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO : add rate limiter
// TODO : add session middleware

// Logging Requests
app.use(httpLogger);

// Routes
app.use('/health-check', healthCheckRouter);

// // Swagger UI
app.use(openAPIRouter);

// // Error handlers
app.use(syntaxErrorChecker);
// app.use(errorHandler());

export { app };
