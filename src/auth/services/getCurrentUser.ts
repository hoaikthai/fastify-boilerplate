import { User } from "@prisma/client"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { buildVerifyJwtDecorator } from "../decorators/verifyJwt"
import { buildUserResponse } from "../helpers/buildUserResponse"

export type GetCurrentUserResponse = {
  user: Omit<User, "encryptedPassword">
}

export type GetCurrentUserService = {
  Reply: GetCurrentUserResponse
}

export const getGetCurrentUserOptions = (fastify: FastifyInstance) => {
  const verifyJwt = buildVerifyJwtDecorator(fastify)

  return {
    preValidation: fastify.auth([verifyJwt]),
  }
}

export const buildGetCurrentUserHandler =
  (fastify: FastifyInstance) => async (request: FastifyRequest<GetCurrentUserService>, reply: FastifyReply) => {
    reply.send({ user: buildUserResponse(request.user as User) })
  }
