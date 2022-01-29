const envSchema = {
  type: "object",
  require: ["AUTH_SECRET"],
  properties: {
    AUTH_SECRET: {
      type: "string",
    },
  },
}

export const envOptions = {
  confKey: "env",
  schema: envSchema,
  dotenv: true,
  data: process.env,
}
