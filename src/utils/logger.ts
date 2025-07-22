// src/utils/logger.ts

import { Request, Response, NextFunction } from 'express';
import config from '../config/app';
import { LogData, LogLevel, HttpLogData, ParkingOperationData } from '../types';

/**
 * Logging utility for the application
 * Provides consistent logging across the application
 */

class Logger {
    private logLevel: string;
    private logFormat: string;
    private readonly levels: LogLevel = {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3
    };

    constructor() {
        this.logLevel = config.logging.level;
        this.logFormat = config.logging.format;
    }

    // Get timestamp for logs
    private getTimestamp(): string {
        return new Date().toISOString();
    }

    // Format log message
    private formatMessage(level: string, message: string, data: LogData = {}): string {
        const timestamp = this.getTimestamp();
        
        if (this.logFormat === 'json') {
            return JSON.stringify({
                timestamp,
                level,
                message,
                ...data
            });
        }
        
        return `[${timestamp}] ${level.toUpperCase()}: ${message} ${Object.keys(data).length ? JSON.stringify(data) : ''}`;
    }

    // Check if should log based on log level
    private shouldLog(level: keyof LogLevel): boolean {
        return this.levels[level] <= this.levels[this.logLevel as keyof LogLevel];
    }

    // Log levels
    public info(message: string, data: LogData = {}): void {
        if (this.shouldLog('info')) {
            console.log(this.formatMessage('info', message, data));
        }
    }

    public warn(message: string, data: LogData = {}): void {
        if (this.shouldLog('warn')) {
            console.warn(this.formatMessage('warn', message, data));
        }
    }

    public error(message: string, data: LogData = {}): void {
        if (this.shouldLog('error')) {
            console.error(this.formatMessage('error', message, data));
        }
    }

    public debug(message: string, data: LogData = {}): void {
        if (this.shouldLog('debug')) {
            console.debug(this.formatMessage('debug', message, data));
        }
    }

    // Log HTTP requests
    public logRequest(req: Request, res: Response, next: NextFunction): void {
        const start = Date.now();
        
        res.on('finish', () => {
            const duration = Date.now() - start;
            const logData: HttpLogData = {
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                duration: `${duration}ms`,
                userAgent: req.get('User-Agent') || undefined,
                ip: req.ip
            };
            
            if (res.statusCode >= 400) {
                this.warn('HTTP Request', logData);
            } else {
                this.info('HTTP Request', logData);
            }
        });
        
        next();
    }

    // Log parking lot operations
    public logParkingOperation(operation: string, data: ParkingOperationData = {}): void {
        this.info(`Parking Lot Operation: ${operation}`, data);
    }

    // Log errors with context
    public logError(error: Error, context: LogData = {}): void {
        this.error(error.message, {
            stack: error.stack,
            ...context
        });
    }
}

// Create singleton instance
const logger = new Logger();

export default logger; 