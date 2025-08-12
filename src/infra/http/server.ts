import { env } from "../../env.js";
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "VAlidation error",
      issues: error.validation,
    });
  }

  console.log(error);

  return reply.status(500).send({ message: "Internal server error." });
});

server.register(fastifyCors, { origin: "*" });

console.log(env.DATABASE_URL);

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
