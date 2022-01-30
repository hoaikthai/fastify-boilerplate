import { User } from "@prisma/client"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { buildUserResponse } from "./helpers/buildUserResponse"

export type SignUpRequest = {
  username: string
  password: string
}

export type SignUpResponse = {
  token: string
  user: User
}

export const signUpOptions = {
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

export const buildSignUpHandler =
  (fastify: FastifyInstance) =>
  async (request: FastifyRequest<{ Body: SignUpRequest; Reply: SignUpResponse }>, reply: FastifyReply) => {
    request.log.info("Signing up")
    const { username, password } = request.body
    const encryptedPassword = await fastify.bcrypt.hash(password)

    const user = await fastify.prisma.user.create({
      data: {
        username,
        encryptedPassword,
      },
    })

    request.log.info("User created")

    fastify.jwt.sign({ id: user.id }, (err: Error | null, token: string) => {
      if (err) {
        reply.code(500).send({ message: "Error signing up" })
      } else {
        reply.send({ token, user: buildUserResponse(user) })
      }
    })
  }
