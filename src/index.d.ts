declare module "fastify" {
  interface FastifyInstance {
    env: {
      AUTH_SECRET: string
    }
  }
}
