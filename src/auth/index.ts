import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { buildSignInHandler, signInOptions } from "./signIn"
import { buildSignUpHandler, buildSignUpRoute, signUpOptions } from "./signUp"

export const AuthRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // fastify.route(buildSignUpRoute(fastify))
  fastify.post("/auth/sign-up", signUpOptions, buildSignUpHandler(fastify))
  fastify.post("/auth/sign-in", signInOptions, buildSignInHandler(fastify))
}
