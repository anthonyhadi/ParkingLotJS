// src/parkingLot.ts

import { ParkingSlot } from './types';

/**
 * This module contains the business logic for the parking lot.
 * It manages the state of the parking slots, including parking and unparking cars.
 */

// In-memory store for the parking lot state.
// In a real-world application, you would replace this with a database.
let slots: (string | null)[] = [];
let capacity: number = 0;

/**
 * Creates a parking lot with a given capacity.
 * Resets the existing lot if one already exists.
 * @param newCapacity - The number of slots in the parking lot.
 * @returns A message indicating the result.
 */
export function createLot(newCapacity: number): string {
    if (isNaN(newCapacity) || newCapacity <= 0) {
        throw new Error('Capacity must be a positive number.');
    }
    capacity = newCapacity;
    slots = Array(capacity).fill(null);
    return `Created a parking lot with ${capacity} slots.`;
}

/**
 * Parks a car in the first available slot.
 * @param carId - The registration number of the car.
 * @returns The slot number allocated to the car.
 * @throws Error if the car is already parked, the lot is full, or the lot hasn't been created.
 */
export function parkCar(carId: string): number {
    if (capacity === 0) {
        throw new Error('Parking lot has not been created yet.');
    }

    if (slots.includes(carId)) {
        throw new Error('This car is already parked.');
    }

    const availableSlotIndex = slots.findIndex(slot => slot === null);

    if (availableSlotIndex === -1) {
        throw new Error('Sorry, parking lot is full.');
    }

    slots[availableSlotIndex] = carId;
    return availableSlotIndex + 1; // Return 1-based slot number
}

/**
 * Removes a car from a specific slot.
 * @param slotNumber - The 1-based slot number to vacate.
 * @returns A message indicating the car has been unparked.
 * @throws Error if the slot number is invalid or the slot is already empty.
 */
export function unparkCar(slotNumber: number): string {
    if (capacity === 0) {
        throw new Error('Parking lot has not been created yet.');
    }
    
    const slotIndex = slotNumber - 1; // Convert to 0-based index

    if (slotIndex < 0 || slotIndex >= capacity) {
        throw new Error(`Invalid slot number. Please provide a number between 1 and ${capacity}.`);
    }

    if (slots[slotIndex] === null) {
        throw new Error(`Slot number ${slotNumber} is already empty.`);
    }

    const carId = slots[slotIndex];
    slots[slotIndex] = null;
    return `Car with registration number ${carId} has been unparked from slot ${slotNumber}.`;
}

/**
 * Gets the current status of the parking lot.
 * @returns An array of objects representing each slot.
 * @throws Error if the parking lot hasn't been created.
 */
export function getStatus(): ParkingSlot[] {
    if (capacity === 0) {
        throw new Error('Parking lot has not been created yet.');
    }
    return slots.map((carId, index) => ({
        slotNumber: index + 1,
        carId: carId || null
    }));
}

/**
 * Gets the current capacity of the parking lot.
 * @returns The current capacity.
 */
export function getCapacity(): number {
    return capacity;
}

/**
 * Gets the number of occupied slots.
 * @returns The number of occupied slots.
 */
export function getOccupiedSlots(): number {
    return slots.filter(slot => slot !== null).length;
}

/**
 * Gets the number of available slots.
 * @returns The number of available slots.
 */
export function getAvailableSlots(): number {
    return slots.filter(slot => slot === null).length;
} 