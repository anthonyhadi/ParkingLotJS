// src/types/index.ts

import { Request, Response, NextFunction } from 'express';

// Parking lot types
export interface ParkingSlot {
    slotNumber: number;
    carId: string | null;
}

export interface ParkingLotStatus {
    totalSlots: number;
    occupiedSlots: number;
    availableSlots: number;
}

export interface ParkingLotResponse {
    success: boolean;
    message?: string;
    data?: any;
    summary?: ParkingLotStatus;
}

// API Request/Response types
export interface CreateLotRequest {
    capacity: number;
}

export interface ParkCarRequest {
    carId: string;
}

export interface ParkCarResponse {
    slotNumber: number;
    carId: string;
}

export interface UnparkCarResponse {
    slotNumber: number;
}

// Configuration types
export interface ServerConfig {
    port: number;
    host: string;
    environment: string;
}

export interface ApiConfig {
    version: string;
    prefix: string;
    rateLimit: {
        windowMs: number;
        max: number;
    };
}

export interface CorsConfig {
    origin: string;
    methods: string[];
    allowedHeaders: string[];
}

export interface LoggingConfig {
    level: string;
    format: string;
}

export interface ParkingLotConfig {
    maxCapacity: number;
    defaultCapacity: number;
}

export interface AppConfig {
    server: ServerConfig;
    api: ApiConfig;
    cors: CorsConfig;
    logging: LoggingConfig;
    parkingLot: ParkingLotConfig;
}

export interface DatabaseConfig {
    type: string;
    database?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    logging?: boolean;
    description?: string;
}

// Middleware types
export interface RequestHandler {
    (req: Request, res: Response, next: NextFunction): void | Promise<void>;
}

export interface ValidationMiddleware {
    (requiredFields: string[]): RequestHandler;
    (fieldName: string, min?: number, max?: number): RequestHandler;
    (fieldName: string, minLength?: number, maxLength?: number): RequestHandler;
}

// Logger types
export interface LogData {
    [key: string]: any;
}

export interface LogLevel {
    error: 0;
    warn: 1;
    info: 2;
    debug: 3;
}

// Error types
export interface AppErrorInterface extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
}

// HTTP Request/Response logging types
export interface HttpLogData {
    method: string;
    url: string;
    statusCode: number;
    duration: string;
    userAgent?: string;
    ip?: string;
}

// Parking operation logging types
export interface ParkingOperationData {
    carId?: string;
    slotNumber?: number;
    capacity?: number;
    totalSlots?: number;
    occupiedSlots?: number;
} 