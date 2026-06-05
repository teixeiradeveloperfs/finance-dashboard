import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3333),
  HOST: z.string().default('127.0.0.1'),
  FRONTEND_ORIGIN: z.string().url().default('http://localhost:3000'),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  COOKIE_SECRET: z.string().min(32),
  AUTH_COOKIE_NAME: z.string().default('af_access_token'),
  AUTH_REFRESH_COOKIE_NAME: z.string().default('af_refresh_token'),
  PASSWORD_RESET_REDIRECT_URL: z.string().url().optional()
})

export const env = envSchema.parse(process.env)

export const isProduction = env.NODE_ENV === 'production'
