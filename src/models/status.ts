/**
 * @typedef StatusResponse Status response
 * @property {string} Status Status Message
 * @property {number} Uptime Uptime in seconds
 * @property {any} Message Message as a string if any
 */
export interface StatusResponse {
    Status?: string;
    Uptime?: number;
    Message?: any;
}
