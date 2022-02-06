import { FastifyInstance } from "fastify"
import { buildGetCurrentUserHandler, GetCurrentUserService, getGetCurrentUserOptions } from "./services/getCurrentUser"
import { buildSignInHandler, signInOptions } from "./services/signIn"
import { buildSignUpHandler, signUpOptions } from "./services/signUp"

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/auth/sign-up", signUpOptions, buildSignUpHandler(fastify))
  fastify.post("/auth/sign-in", signInOptions, buildSignInHandler(fastify))
  fastify.get<GetCurrentUserService>(
    "/users/me",
    getGetCurrentUserOptions(fastify),
    buildGetCurrentUserHandler(fastify)
  )
}
