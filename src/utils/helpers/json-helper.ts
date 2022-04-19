import camelcaseKeys from "camelcase-keys";

/**
 * Converts an object to camelcase in order to be used in the API
 *
 * @param {object} obj
 * @returns {object}
 */
function ToCamelCase(obj: object): object {
    return camelcaseKeys(obj, { deep: true });
}

export default ToCamelCase;
