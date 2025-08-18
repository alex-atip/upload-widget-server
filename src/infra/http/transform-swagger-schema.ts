import { jsonSchemaTransform } from "fastify-type-provider-zod";

export function transformSwaggerSchema(data: any) {
  const { schema, url } = jsonSchemaTransform(data);

  if (schema.consumes?.includes("multipart/form-data")) {
    if (!schema.body) {
      schema.body = {
        type: "object",
        required: [],
        properties: {},
      };
    }

    (schema.body as any).properties.file = {
      type: "string",
      format: "binary",
    };

    (schema.body as any).required.push("file");
  }

  return { schema, url };
}
