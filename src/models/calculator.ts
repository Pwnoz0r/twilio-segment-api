import { RequestGenericInterface } from "fastify";

export interface CalculatorResponse {
    Segments: number;
    MessageSize: number;
}

export interface CalculatorRequest extends RequestGenericInterface {
    Body: {
        message: string;
    };
}
