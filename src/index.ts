import fastify from "fastify"
import fastifyAuth from "fastify-auth"
import fastifyCors from "fastify-cors"
import fastifyEnv from "fastify-env"
import fastifyJwt from "fastify-jwt"
import fastifyPostgres from "fastify-postgres"
import fastifySwagger from "fastify-swagger"
import { authRoutes } from "./auth"
import { corsOptions } from "./cors"
import { envOptions } from "./env"
import { swaggerOptions } from "./swagger"

const server = fastify({ logger: true })

server.register(fastifyEnv, envOptions)
server.register(fastifyPostgres, { connectionString: "postgres://postgres@localhost/postgres" })
server.register(fastifySwagger, swaggerOptions)
server.register(fastifyJwt, { secret: "secret" })
server.register(fastifyAuth)
server.register(fastifyCors, corsOptions)

server.register(authRoutes)

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
