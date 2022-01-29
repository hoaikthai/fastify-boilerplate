import { FastifyRequest } from "fastify"
import { FastifyCorsOptions } from "fastify-cors"

export const corsOptions =
  () =>
  (request: FastifyRequest, callback: (error: Error | null, corsOptions?: FastifyCorsOptions | undefined) => void) => {
    let corsOptions = { origin: true }

    if (/localhost/.test(request.headers.origin ?? "")) {
      corsOptions = { origin: false }
    }

    callback(null, corsOptions)
  }
