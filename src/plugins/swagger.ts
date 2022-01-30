import { SwaggerOptions } from "fastify-swagger"

export const swaggerOptions = {
  openapi: {
    info: {
      title: "Fastify boilerplate API",
      description: "",
      version: "0.0.1",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  exposeRoute: true,
  routePrefix: "/api-docs",
} as SwaggerOptions
