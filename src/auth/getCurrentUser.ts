import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { User } from "../models/User"
import { buildVerifyJwtDecorator } from "./decorators/verifyJwt"

export type GetCurrentUserResponse = {
  user: User
}

export const getGetCurrentUserOptions = (fastify: FastifyInstance) => {
  const verifyJwt = buildVerifyJwtDecorator(fastify)

  return {
    preHandler: fastify.auth([verifyJwt]),
  }
}

export const buildGetCurrentUserHandler =
  (fastify: FastifyInstance) =>
  async (request: FastifyRequest<{ Reply: GetCurrentUserResponse }>, reply: FastifyReply) => {
    reply.send({ user: request.user })
  }
