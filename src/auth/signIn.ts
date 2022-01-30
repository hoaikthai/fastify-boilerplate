import { User } from "@prisma/client"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { buildUserResponse } from "./helpers/buildUserResponse"

export type SignInRequest = {
  username: string
  password: string
}

export type SignInResponse = {
  token: string
  user: Omit<User, "encryptedPassword">
}

export const signInOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
      required: ["username", "password"],
    },
  },
}

export const buildSignInHandler =
  (fastify: FastifyInstance) =>
  async (request: FastifyRequest<{ Body: SignInRequest; Reply: SignInResponse }>, reply: FastifyReply) => {
    const { username, password } = request.body

    const user: User | null = await fastify.prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, encryptedPassword: true },
    })

    if (!user) return reply.code(401).send({ message: "Invalid credentials" })

    const result = await fastify.bcrypt.compare(password, user.encryptedPassword)
    if (!result) return reply.code(401).send({ message: "Invalid credentials" })

    fastify.jwt.sign({ id: user.id }, (err: Error | null, token: string) => {
      if (err) {
        reply.code(500).send({ message: "Error signing in" })
      } else {
        reply.send({ token, user: buildUserResponse(user) })
      }
    })
  }
