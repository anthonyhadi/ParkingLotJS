// tests/parkingLot.test.ts

/**
 * Unit tests for parking lot business logic
 */

import * as parkingLot from '../src/parkingLot';

describe('Parking Lot Tests', () => {
    beforeEach(() => {
        // Reset parking lot state before each test
        parkingLot.createLot(5);
    });

    describe('createLot', () => {
        test('should create a parking lot with specified capacity', () => {
            const result = parkingLot.createLot(10);
            expect(result).toBe('Created a parking lot with 10 slots.');
        });

        test('should throw error for invalid capacity', () => {
            expect(() => parkingLot.createLot(-1)).toThrow('Capacity must be a positive number.');
            expect(() => parkingLot.createLot(0)).toThrow('Capacity must be a positive number.');
            expect(() => parkingLot.createLot(NaN)).toThrow('Capacity must be a positive number.');
        });
    });

    describe('parkCar', () => {
        test('should park a car in the first available slot', () => {
            const slotNumber = parkingLot.parkCar('KA-01-HH-1234');
            expect(slotNumber).toBe(1);
        });

        test('should park cars in sequential slots', () => {
            parkingLot.parkCar('KA-01-HH-1234');
            parkingLot.parkCar('KA-01-HH-5678');
            
            const status = parkingLot.getStatus();
            expect(status[0]?.carId).toBe('KA-01-HH-1234');
            expect(status[1]?.carId).toBe('KA-01-HH-5678');
        });

        test('should throw error when parking lot is full', () => {
            parkingLot.parkCar('KA-01-HH-1234');
            parkingLot.parkCar('KA-01-HH-5678');
            parkingLot.parkCar('KA-01-HH-9012');
            parkingLot.parkCar('KA-01-HH-3456');
            parkingLot.parkCar('KA-01-HH-7890');

            expect(() => parkingLot.parkCar('KA-01-HH-1111')).toThrow('Sorry, parking lot is full.');
        });

        test('should throw error when car is already parked', () => {
            parkingLot.parkCar('KA-01-HH-1234');
            expect(() => parkingLot.parkCar('KA-01-HH-1234')).toThrow('This car is already parked.');
        });

        test('should throw error when parking lot is not created', () => {
            parkingLot.createLot(0); // Reset to no capacity
            expect(() => parkingLot.parkCar('KA-01-HH-1234')).toThrow('Parking lot has not been created yet.');
        });
    });

    describe('unparkCar', () => {
        test('should unpark a car from specified slot', () => {
            parkingLot.parkCar('KA-01-HH-1234');
            const result = parkingLot.unparkCar(1);
            expect(result).toBe('Car with registration number KA-01-HH-1234 has been unparked from slot 1.');
        });

        test('should throw error for invalid slot number', () => {
            expect(() => parkingLot.unparkCar(0)).toThrow('Invalid slot number. Please provide a number between 1 and 5.');
            expect(() => parkingLot.unparkCar(6)).toThrow('Invalid slot number. Please provide a number between 1 and 5.');
            expect(() => parkingLot.unparkCar(-1)).toThrow('Invalid slot number. Please provide a number between 1 and 5.');
        });

        test('should throw error when slot is already empty', () => {
            expect(() => parkingLot.unparkCar(1)).toThrow('Slot number 1 is already empty.');
        });

        test('should throw error when parking lot is not created', () => {
            parkingLot.createLot(0); // Reset to no capacity
            expect(() => parkingLot.unparkCar(1)).toThrow('Parking lot has not been created yet.');
        });
    });

    describe('getStatus', () => {
        test('should return correct status of parking lot', () => {
            parkingLot.parkCar('KA-01-HH-1234');
            parkingLot.parkCar('KA-01-HH-5678');

            const status = parkingLot.getStatus();
            expect(status).toHaveLength(5);
            expect(status[0]).toEqual({ slotNumber: 1, carId: 'KA-01-HH-1234' });
            expect(status[1]).toEqual({ slotNumber: 2, carId: 'KA-01-HH-5678' });
            expect(status[2]).toEqual({ slotNumber: 3, carId: null });
        });

        test('should throw error when parking lot is not created', () => {
            parkingLot.createLot(0); // Reset to no capacity
            expect(() => parkingLot.getStatus()).toThrow('Parking lot has not been created yet.');
        });
    });

    describe('getCapacity', () => {
        test('should return correct capacity', () => {
            parkingLot.createLot(10);
            expect(parkingLot.getCapacity()).toBe(10);
        });

        test('should return 0 when parking lot is not created', () => {
            parkingLot.createLot(0);
            expect(parkingLot.getCapacity()).toBe(0);
        });
    });

    describe('getOccupiedSlots', () => {
        test('should return correct number of occupied slots', () => {
            parkingLot.parkCar('KA-01-HH-1234');
            parkingLot.parkCar('KA-01-HH-5678');
            expect(parkingLot.getOccupiedSlots()).toBe(2);
        });

        test('should return 0 when no cars are parked', () => {
            expect(parkingLot.getOccupiedSlots()).toBe(0);
        });
    });

    describe('getAvailableSlots', () => {
        test('should return correct number of available slots', () => {
            parkingLot.parkCar('KA-01-HH-1234');
            parkingLot.parkCar('KA-01-HH-5678');
            expect(parkingLot.getAvailableSlots()).toBe(3);
        });

        test('should return total capacity when no cars are parked', () => {
            expect(parkingLot.getAvailableSlots()).toBe(5);
        });
    });

    describe('Integration Tests', () => {
        test('should handle complete parking and unparking workflow', () => {
            // Create parking lot
            parkingLot.createLot(3);
            
            // Park cars
            const slot1 = parkingLot.parkCar('KA-01-HH-1234');
            const slot2 = parkingLot.parkCar('KA-01-HH-5678');
            
            expect(slot1).toBe(1);
            expect(slot2).toBe(2);
            
            // Check status
            let status = parkingLot.getStatus();
            expect(status[0]?.carId).toBe('KA-01-HH-1234');
            expect(status[1]?.carId).toBe('KA-01-HH-5678');
            expect(status[2]?.carId).toBe(null);
            
            // Unpark car
            const unparkResult = parkingLot.unparkCar(1);
            expect(unparkResult).toBe('Car with registration number KA-01-HH-1234 has been unparked from slot 1.');
            
            // Check status after unparking
            status = parkingLot.getStatus();
            expect(status[0]?.carId).toBe(null);
            expect(status[1]?.carId).toBe('KA-01-HH-5678');
            
            // Park another car (should use slot 1)
            const slot3 = parkingLot.parkCar('KA-01-HH-9012');
            expect(slot3).toBe(1);
        });
    });
}); 