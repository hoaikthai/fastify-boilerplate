const envSchema = {
  type: "object",
  required: ["AUTH_SECRET"],
  properties: {
    AUTH_SECRET: {
      type: "string",
    },
  },
}

declare module "fastify" {
  interface FastifyInstance {
    env: {
      AUTH_SECRET: string
    }
  }
}

export const envOptions = {
  confKey: "env",
  schema: envSchema,
  dotenv: true,
  data: process.env,
}
