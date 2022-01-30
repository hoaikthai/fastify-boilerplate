import { FastifyInstance } from "fastify"
import { buildGetCurrentUserHandler, GetCurrentUserResponse, getGetCurrentUserOptions } from "./getCurrentUser"
import { buildSignInHandler, signInOptions } from "./signIn"
import { buildSignUpHandler, signUpOptions } from "./signUp"

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/auth/sign-up", signUpOptions, buildSignUpHandler(fastify))
  fastify.post("/auth/sign-in", signInOptions, buildSignInHandler(fastify))
  fastify.get<{ Reply: GetCurrentUserResponse }>(
    "/users/me",
    getGetCurrentUserOptions(fastify),
    buildGetCurrentUserHandler(fastify)
  )
}
