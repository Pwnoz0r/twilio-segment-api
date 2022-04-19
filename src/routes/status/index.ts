import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const StatusRoute: FastifyPluginAsync = async (server: FastifyInstance) => {
    server.get("/", {}, async (request, reply) => {
        try {
            return reply.code(200).send("pong");
        } catch (error) {
            request.log.error(error);
            return reply.send(500);
        }
    });
};

export default fp(StatusRoute);
