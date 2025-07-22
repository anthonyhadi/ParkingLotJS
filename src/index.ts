// src/index.ts

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Import configurations and middleware
import config from './config/app';
import routes from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';
import logger from './utils/logger';

/**
 * This is the main entry point for the application.
 * It sets up the Express server, middleware, and routes.
 */

// Create the Express app
const app: Application = express();
const PORT: number = config.server.port;

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors(config.cors));

// Rate limiting
const limiter = rateLimit(config.api.rateLimit);
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use(logger.logRequest.bind(logger));

// Mount the API routes
app.use(config.api.prefix, routes);

// Simple root endpoint to confirm the server is running
app.get('/', (req, res) => {
    res.json({
        message: 'Parking Lot Web Service is running!',
        version: config.api.version,
        environment: config.server.environment,
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404 handler for undefined routes
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`, {
        environment: config.server.environment,
        port: PORT,
        version: config.api.version
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    process.exit(0);
});

export default app; 