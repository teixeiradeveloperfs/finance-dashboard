import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import Fastify from 'fastify'
import { env, isProduction } from './config/env.js'
import authPlugin from './plugins/auth.js'
import { authRoutes } from './routes/auth.js'
import { healthRoutes } from './routes/health.js'

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: isProduction ? 'info' : 'debug'
    }
  })

  await app.register(cors, {
    origin: env.FRONTEND_ORIGIN,
    credentials: true
  })

  await app.register(cookie, {
    secret: env.COOKIE_SECRET
  })

  await app.register(authPlugin)
  await app.register(healthRoutes)
  await app.register(authRoutes)

  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error)

    return reply.code(500).send({
      message: 'Erro interno.'
    })
  })

  return app
}
