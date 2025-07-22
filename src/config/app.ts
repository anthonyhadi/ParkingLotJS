// src/config/app.ts

import { AppConfig } from '../types';

/**
 * Application configuration file
 * Centralizes all application settings and environment variables
 */

const config: AppConfig = {
    // Server configuration
    server: {
        port: Number(process.env.PORT) || 3000,
        host: process.env.HOST || 'localhost',
        environment: process.env.NODE_ENV || 'development'
    },
    
    // API configuration
    api: {
        version: 'v1',
        prefix: '/api',
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        }
    },
    
    // CORS configuration
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    },
    
    // Logging configuration
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: process.env.NODE_ENV === 'production' ? 'json' : 'dev'
    },
    
    // Parking lot configuration
    parkingLot: {
        maxCapacity: Number(process.env.MAX_CAPACITY) || 1000,
        defaultCapacity: Number(process.env.DEFAULT_CAPACITY) || 10
    }
};

export default config; 