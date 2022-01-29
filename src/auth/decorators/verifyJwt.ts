import { User } from "@prisma/client"
import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "fastify"

export const buildVerifyJwtDecorator =
  (fastify: FastifyInstance) => (request: FastifyRequest, reply: FastifyReply, done: (error?: Error) => void) => {
    if (!request.raw.headers.authorization) {
      return done(new Error("No authorization header"))
    }

    fastify.jwt.verify(request.raw.headers.authorization, async (err, decoded?: User) => {
      if (err || !decoded) return done(new Error("Invalid token"))

      const user = await fastify.prisma.user.findFirst({ where: { id: decoded.id, username: decoded.username } })

      if (!user) return done(new Error("Invalid token"))

      request.user = user
    })

    done()
  }
