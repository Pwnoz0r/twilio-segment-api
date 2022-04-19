import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { StatusResponse } from "../../models/status";
import ToCamelCase from "../../utils/helpers/json-helper";

/**
 * Route for /status
 */
const StatusRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.get("/status", async (request, reply) => {
        // Initialize response model
        let statusResponse: StatusResponse = {
            Status: "ok",
            Uptime: process.uptime()
        };

        try {
            return reply.send(ToCamelCase(statusResponse));
        } catch (error) {
            statusResponse.Status = "error";
            statusResponse.Message = error;

            return reply.code(400).send(ToCamelCase(statusResponse));
        }
    });
};

export default fp(StatusRoute);
