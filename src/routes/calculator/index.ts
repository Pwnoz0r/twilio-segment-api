import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { SegmentedMessage } from "sms-segments-calculator";
import { CalculatorRequest, CalculatorResponse } from "../../models/calculator";
import ToCamelCase from "../../utils/helpers/json-helper";

const CalculatorRoute: FastifyPluginAsync = async (
    fastify: FastifyInstance
) => {
    fastify.post<CalculatorRequest>("/calculate", async (request, reply) => {
        let response: CalculatorResponse = {
            Segments: -1,
            MessageSize: -1
        };

        try {
            const { message } = request.body;
            if (!message || message.length === 0) {
                throw new Error("Message is required");
            }

            const result = new SegmentedMessage(message);

            response.Segments = result.segmentsCount;
            response.MessageSize = result.messageSize;

            return reply.send(ToCamelCase(response));
        } catch (error) {
            console.log(error);
            return reply.code(400).send(ToCamelCase(response));
        }
    });
};

export default fp(CalculatorRoute);
