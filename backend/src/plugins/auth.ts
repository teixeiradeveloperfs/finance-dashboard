import fp from 'fastify-plugin'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '../config/env.js'
import { getSignedCookie, setAuthCookies } from '../lib/auth-cookies.js'
import { supabase } from '../lib/supabase.js'

export default fp(async (app) => {
  app.decorate('requireAuth', async (request: FastifyRequest, reply: FastifyReply) => {
    const accessToken = getSignedCookie(request, env.AUTH_COOKIE_NAME)
    const refreshToken = getSignedCookie(request, env.AUTH_REFRESH_COOKIE_NAME)

    if (accessToken) {
      const { data, error } = await supabase.auth.getUser(accessToken)

      if (!error && data.user) {
        request.user = data.user
        request.authTokens = {
          accessToken,
          refreshToken: refreshToken || undefined
        }
        return
      }
    }

    if (refreshToken) {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken
      })

      if (!error && data.session?.access_token && data.session.refresh_token && data.user) {
        setAuthCookies(reply, data.session.access_token, data.session.refresh_token)
        request.user = data.user
        request.authTokens = {
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token
        }
        return
      }
    }

    return reply.code(401).send({
      message: 'Sessao invalida ou expirada.'
    })
  })
})

declare module 'fastify' {
  interface FastifyInstance {
    requireAuth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}
