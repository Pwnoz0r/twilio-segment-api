let Responses: Record<number, object> = {};

const errorResponse = {
    type: "object",
    properties: {
        statusCode: {
            type: "number"
        },
        error: {
            type: "string"
        },
        message: {
            type: "string"
        }
    }
};

Responses[400] = errorResponse;

export { Responses };
