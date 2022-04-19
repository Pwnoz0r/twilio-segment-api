import { AppConfig, CreateServer } from "./app";

/**
 * Initialize and start the server
 */
async function startServer() {
    const server = await CreateServer();

    try {
        await server.listen(AppConfig.Port, AppConfig.Address);
        console.log(
            `Server listening on ${AppConfig.Address}:${AppConfig.Port}`
        );
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

startServer().finally();
