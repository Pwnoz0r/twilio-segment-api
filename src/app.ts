import * as dotenv from "dotenv";
import fastify from "fastify";
import fastifyAutoload from "fastify-autoload";
import fastifyCors from "fastify-cors";
import fastifySwagger from "fastify-swagger";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

/**
 * @typedef AppConfig Application configuration
 * @property {string} Env Application environment
 * @property {string} Address Host to listen
 * @property {string} Port Port to listen
 */
interface AppConfig {
    Env: string;
    Address: string;
    Port: number;
}

/**
 * Initialize application configuration
 */
const AppConfig: AppConfig = {
    Env: process.env.NODE_ENV || "production",
    Address: process.env.LISTEN_ADDRESS || "0.0.0.0",
    Port: Number(process.env.LISTEN_PORT) || 3000
};

/**
 * Function to initialize fastify instance
 */
async function CreateServer() {
    // Initialize fastify server
    const server = fastify({
        logger: AppConfig.Env === "development",
        ignoreTrailingSlash: true
    });

    // Register CORS
    server.register(fastifyCors, {
        origin: true,
        credentials: true
    });

    // Register auto-load
    server.register(fastifyAutoload, {
        dir: path.join(__dirname, "routes"),
        routeParams: true
    });

    // Register Swagger
    server.register(fastifySwagger, {
        routePrefix: "/docs",
        swagger: {
            info: {
                title: "Twilio Segment Calculator API",
                version: "1.0.0"
            },
            externalDocs: {
                url: "https://github.com/skyePBX/twilio-segment-api",
                description: "GitHub"
            },
            consumes: ["application/json"],
            produces: ["application/json"]
        },
        exposeRoute: true
    });

    await server.ready((err) => {
        if (err) throw err;
        server.swagger();
    });

    return server;
}

export { CreateServer, AppConfig };
