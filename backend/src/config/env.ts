import { z } from 'zod'

enum EEnvironment {
  Development = 'development',
  Testing = 'testing',
  Production = 'production'
}

const schema = z.object({
  NODE_ENV: z.nativeEnum(EEnvironment),
  API_HOST: z.string().optional(),
  PORT: z.string(),
  DATABASE_URL: z.string(),
  EMAIL: z.string(),
  REDIS_HOST: z.string()
})

export default schema

export type IEnv = z.infer<typeof schema>
