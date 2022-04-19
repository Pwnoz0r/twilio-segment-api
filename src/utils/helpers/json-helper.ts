import camelcaseKeys from "camelcase-keys";

function ToCamelCase(obj: object): object {
    return camelcaseKeys(obj, { deep: true });
}

export default ToCamelCase;
