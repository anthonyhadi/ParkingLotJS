// src/middleware/validation.ts

import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';
import { RequestHandler } from '../types';

/**
 * Request validation middleware
 * Validates incoming requests before they reach the route handlers
 */

// Validate required fields in request body
export const validateRequiredFields = (requiredFields: string[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            next(new AppError(
                `Missing required fields: ${missingFields.join(', ')}`, 
                400
            ));
            return;
        }
        
        next();
    };
};

// Validate numeric fields
export const validateNumericField = (
    fieldName: string, 
    min: number = 0, 
    max: number = Infinity
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const value = req.body[fieldName] || req.params[fieldName];
        
        if (value !== undefined) {
            const numValue = Number(value);
            
            if (isNaN(numValue)) {
                next(new AppError(
                    `${fieldName} must be a valid number`, 
                    400
                ));
                return;
            }
            
            if (numValue < min || numValue > max) {
                next(new AppError(
                    `${fieldName} must be between ${min} and ${max}`, 
                    400
                ));
                return;
            }
        }
        
        next();
    };
};

// Validate string fields
export const validateStringField = (
    fieldName: string, 
    minLength: number = 1, 
    maxLength: number = 255
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const value = req.body[fieldName] || req.params[fieldName];
        
        if (value !== undefined) {
            if (typeof value !== 'string') {
                next(new AppError(
                    `${fieldName} must be a string`, 
                    400
                ));
                return;
            }
            
            if (value.length < minLength || value.length > maxLength) {
                next(new AppError(
                    `${fieldName} must be between ${minLength} and ${maxLength} characters`, 
                    400
                ));
                return;
            }
        }
        
        next();
    };
};

// Validate car registration number format (basic validation)
export const validateCarRegistration: RequestHandler = (
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
    const { carId } = req.body;
    
    if (carId) {
        // Basic regex for car registration number (can be customized based on country)
        const carRegRegex = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/;
        
        if (!carRegRegex.test(carId)) {
            next(new AppError(
                'Invalid car registration number format. Expected format: XX-XX-XX-XXXX', 
                400
            ));
            return;
        }
    }
    
    next();
}; 