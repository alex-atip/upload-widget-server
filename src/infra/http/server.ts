import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import { env } from "../../env.js";

const server = fastify()

server.register(fastifyCors, { origin: "*" })

console.log(env.DATABASE_URL)

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})