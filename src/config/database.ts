// src/config/database.ts

import { DatabaseConfig } from '../types';

/**
 * Database configuration file
 * Currently using in-memory storage, but can be extended for real database connections
 */

const config: Record<string, DatabaseConfig> = {
    // In-memory storage configuration
    memory: {
        type: 'memory',
        description: 'In-memory storage for development'
    },
    
    // Future database configurations
    development: {
        type: 'sqlite',
        database: './parking_lot.db',
        logging: false
    },
    
    production: {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || 'parking_lot',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        logging: false
    }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export configuration based on environment
export default config[environment] || config.memory; 