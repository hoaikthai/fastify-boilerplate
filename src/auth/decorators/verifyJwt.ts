import { User } from "@prisma/client"
import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "fastify"

export const buildVerifyJwtDecorator =
  (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply, done: (error?: Error) => void) => {
    const { authorization } = request.headers
    if (!authorization) {
      return done(new Error("No authorization header"))
    }

    const [, token] = authorization.split(" ")

    const decoded = fastify.jwt.verify<User>(token)
    if (!decoded) return done(new Error("Invalid token"))

    const user = await fastify.prisma.user.findFirst({ where: { id: decoded.id } })
    if (!user) return done(new Error("Invalid token"))

    request.user = user
    done()
  }
