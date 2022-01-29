import { FastifyInstance, FastifyReply } from "fastify"
import { FastifyRequest } from "fastify"
import { User } from "../../models/User"

export const buildVerifyJwtDecorator =
  (fastify: FastifyInstance) => (request: FastifyRequest, reply: FastifyReply, done: (error?: Error) => void) => {
    if (!request.raw.headers.authorization) {
      return done(new Error("No authorization header"))
    }

    fastify.jwt.verify(request.raw.headers.authorization, async (err, decoded) => {
      if (err || !decoded) return done(new Error("Invalid token"))

      const db = await fastify.pg.connect()
      const result = await db.query<User>("SELECT * FROM users WHERE id = $1 AND email = $2", [
        decoded.id,
        decoded.email,
      ])
      db.release()

      if (result.rowCount === 0) return done(new Error("Invalid token"))

      request.user = result.rows[0]
    })

    done()
  }
