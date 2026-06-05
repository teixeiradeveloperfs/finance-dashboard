import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { env } from '../config/env.js'
import { clearAuthCookies, setAuthCookies } from '../lib/auth-cookies.js'
import { supabase } from '../lib/supabase.js'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const recoverSchema = z.object({
  email: z.string().email()
})

export const authRoutes: FastifyPluginAsync = async (app) => {
  app.post('/auth/login', async (request, reply) => {
    const parsedBody = loginSchema.safeParse(request.body)

    if (!parsedBody.success) {
      return reply.code(400).send({
        message: 'E-mail ou senha invalidos.'
      })
    }

    const { data, error } = await supabase.auth.signInWithPassword(parsedBody.data)

    if (error || !data.session) {
      return reply.code(401).send({
        message: 'Credenciais invalidas.'
      })
    }

    setAuthCookies(reply, data.session.access_token, data.session.refresh_token)

    return reply.send({
      user: data.user
    })
  })

  app.post('/auth/recover', async (request, reply) => {
    const parsedBody = recoverSchema.safeParse(request.body)

    if (!parsedBody.success) {
      return reply.code(400).send({
        message: 'Informe um e-mail valido.'
      })
    }

    const { error } = await supabase.auth.resetPasswordForEmail(parsedBody.data.email, {
      redirectTo: env.PASSWORD_RESET_REDIRECT_URL
    })

    if (error) {
      return reply.code(400).send({
        message: 'Nao foi possivel enviar o link de recuperacao.'
      })
    }

    return reply.send({
      message: 'Se o e-mail existir, enviaremos as instrucoes de recuperacao.'
    })
  })

  app.post('/auth/logout', async (_request, reply) => {
    clearAuthCookies(reply)

    return reply.send({
      ok: true
    })
  })

  app.get('/auth/me', {
    preHandler: app.requireAuth
  }, async (request) => ({
    user: request.user
  }))
}
