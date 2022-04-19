import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { SegmentedMessage } from "sms-segments-calculator";
import { CalculateRequest, CalculateResponse } from "../../models/calculate";
import ToCamelCase from "../../utils/helpers/json-helper";

/**
 * Route for /calculate
 */
const CalculateRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post<CalculateRequest>("/calculate", async (request, reply) => {
        // Initialize response model
        let response: CalculateResponse = {
            Segments: -1,
            MessageSize: -1
        };

        try {
            // Get the message from the request
            const { message } = request.body;

            // Check if the message is empty
            if (!message || message.length === 0) {
                throw new Error("Message is required");
            }

            const result = new SegmentedMessage(message);
            if (!result) {
                throw new Error("Message is not valid");
            }

            // Set the response
            response.Segments = result.segmentsCount;
            response.MessageSize = result.messageSize;

            return reply.send(ToCamelCase(response));
        } catch (error) {
            console.log(error);
            return reply.code(400).send(ToCamelCase(response));
        }
    });
};

export default fp(CalculateRoute);
