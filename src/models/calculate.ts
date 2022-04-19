import { RequestGenericInterface } from "fastify";

/**
 * @typedef CalculateResponse Calculate response
 * @property {number} Segments Number of segments
 * @property {number} MessageSize Message size in bytes
 */
export interface CalculateResponse {
    Segments: number;
    MessageSize: number;
}

/**
 * @typedef CalculateRequest Calculate request
 * @property {string} message Message to be calculated
 */
export interface CalculateRequest extends RequestGenericInterface {
    Body: {
        message: string;
    };
}
