// src/routes.ts

import { Router, Request, Response, NextFunction } from 'express';
import * as parkingLot from './parkingLot';
import { AppError } from './middleware/errorHandler';
import { 
    validateRequiredFields, 
    validateNumericField, 
    validateCarRegistration 
} from './middleware/validation';
import logger from './utils/logger';
import { 
    CreateLotRequest, 
    ParkCarRequest, 
    ParkingLotResponse, 
    ParkingLotStatus 
} from './types';

/**
 * This module defines the API routes and maps them to the parking lot logic.
 */

const router = Router();

// POST /api/create-lot
// Creates a new parking lot
router.post('/create-lot', 
    validateRequiredFields(['capacity']),
    validateNumericField('capacity', 1, 1000),
    (req: Request<{}, {}, CreateLotRequest>, res: Response, next: NextFunction): void => {
        try {
            const { capacity } = req.body;
            const message = parkingLot.createLot(Number(capacity));
            
            logger.logParkingOperation('create-lot', { capacity });
            
            const response: ParkingLotResponse = {
                success: true,
                message,
                data: { capacity }
            };
            
            res.status(201).json(response);
        } catch (error) {
            next(new AppError((error as Error).message, 400));
        }
    }
);

// POST /api/park
// Parks a car
router.post('/park',
    validateRequiredFields(['carId']),
    validateCarRegistration,
    (req: Request<{}, {}, ParkCarRequest>, res: Response, next: NextFunction): void => {
        try {
            const { carId } = req.body;
            const slotNumber = parkingLot.parkCar(carId);
            
            logger.logParkingOperation('park-car', { carId, slotNumber });
            
            const response: ParkingLotResponse = {
                success: true,
                message: `Allocated slot number: ${slotNumber}`,
                data: { slotNumber, carId }
            };
            
            res.status(200).json(response);
        } catch (error) {
            next(new AppError((error as Error).message, 400));
        }
    }
);

// DELETE /api/unpark/:slotNumber
// Unparks a car from a specific slot
router.delete('/unpark/:slotNumber',
    validateNumericField('slotNumber', 1, 1000),
    (req: Request<{ slotNumber: string }>, res: Response, next: NextFunction): void => {
        try {
            const { slotNumber } = req.params;
            const message = parkingLot.unparkCar(Number(slotNumber));
            
            logger.logParkingOperation('unpark-car', { slotNumber: Number(slotNumber) });
            
            const response: ParkingLotResponse = {
                success: true,
                message,
                data: { slotNumber: Number(slotNumber) }
            };
            
            res.status(200).json(response);
        } catch (error) {
            next(new AppError((error as Error).message, 400));
        }
    }
);

// GET /api/status
// Gets the current status of the parking lot
router.get('/status', (req: Request, res: Response, next: NextFunction): void => {
    try {
        const status = parkingLot.getStatus();
        const totalSlots = status.length;
        const occupiedSlots = status.filter(slot => slot.carId !== null).length;
        const availableSlots = status.filter(slot => slot.carId === null).length;
        
        logger.logParkingOperation('get-status', { 
            totalSlots,
            occupiedSlots
        });
        
        const summary: ParkingLotStatus = {
            totalSlots,
            occupiedSlots,
            availableSlots
        };
        
        const response: ParkingLotResponse = {
            success: true,
            data: status,
            summary
        };
        
        res.status(200).json(response);
    } catch (error) {
        next(new AppError((error as Error).message, 400));
    }
});

// GET /api/health
// Health check for the parking lot service
router.get('/health', (req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        service: 'parking-lot-api',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

export default router; 