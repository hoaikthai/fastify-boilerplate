import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { User } from "../models/User"

export type SignInRequest = {
  email: string
  password: string
}

export type SignInResponse = {
  token: string
  user: User
}

export const signInOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["email", "password"],
    },
  },
}

export const buildSignInHandler =
  (fastify: FastifyInstance) =>
  async (request: FastifyRequest<{ Body: SignInRequest; Reply: SignInResponse }>, reply: FastifyReply) => {
    const { email, password } = request.body
    // todo: encrypt password

    const db = await fastify.pg.connect()
    const result = await db.query<User>("SELECT id, email, password FROM users WHERE email=$1", [email])
    db.release()

    if (result.rowCount === 0) return reply.code(401).send({ message: "Invalid credentials" })

    const user = result.rows[0]

    if (user.password !== password) return reply.code(401).send({ message: "Invalid credentials" })

    fastify.jwt.sign({ id: user.id }, (err: Error | null, token: string) => {
      if (err) {
        reply.code(500).send({ message: "Error signing in" })
      } else {
        reply.send({ token, user })
      }
    })
  }
