import fastify from "fastify"
import fastifyAuth from "fastify-auth"
import fastifyCors from "fastify-cors"
import fastifyEnv from "fastify-env"
import fastifyJwt from "fastify-jwt"
import fastifyPostgres from "fastify-postgres"
import { AuthRoute } from "./auth"
import { buildVerifyJwtDecorator } from "./auth/decorators/verifyJwt"
import { corsOptions } from "./cors"
import { envOptions } from "./env"

const server = fastify({ logger: true })

server.register(fastifyEnv, envOptions)
server.register(fastifyPostgres, { connectionString: "postgres://postgres@localhost/postgres" })
server.register(fastifyJwt, { secret: "secret" })
server.register(fastifyAuth)
server.register(fastifyCors, corsOptions)

const verifyJwt = buildVerifyJwtDecorator(server)
server.decorate("verifyJwt", verifyJwt)

server.register(AuthRoute)

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
