import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { env } from '../config/env.js'
import { clearAuthCookies, setAuthCookies } from '../lib/auth-cookies.js'
import { createSupabaseClient, supabase } from '../lib/supabase.js'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const recoverSchema = z.object({
  email: z.string().email()
})

const passwordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8)
})

const profileSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email().optional(),
  role: z.string().trim().optional()
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

  app.post('/auth/password', {
    preHandler: app.requireAuth
  }, async (request, reply) => {
    const parsedBody = passwordSchema.safeParse(request.body)
    const userEmail = request.user?.email
    const accessToken = request.authTokens?.accessToken
    const refreshToken = request.authTokens?.refreshToken

    if (!parsedBody.success || !userEmail || !accessToken) {
      return reply.code(400).send({
        message: 'Informe a senha atual e a nova senha.'
      })
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: parsedBody.data.currentPassword
    })

    if (signInError) {
      return reply.code(401).send({
        message: 'Senha atual invalida.'
      })
    }

    const authenticatedSupabase = createSupabaseClient(accessToken)

    if (refreshToken) {
      await authenticatedSupabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })
    }

    const { error: updateError } = await authenticatedSupabase.auth.updateUser({
      password: parsedBody.data.newPassword
    })

    if (updateError) {
      return reply.code(400).send({
        message: 'Nao foi possivel alterar a senha.'
      })
    }

    return reply.send({
      ok: true,
      message: 'Senha alterada com sucesso.'
    })
  })

  app.post('/auth/profile', {
    preHandler: app.requireAuth
  }, async (request, reply) => {
    const parsedBody = profileSchema.safeParse(request.body)
    const accessToken = request.authTokens?.accessToken
    const refreshToken = request.authTokens?.refreshToken

    if (!parsedBody.success || !accessToken) {
      return reply.code(400).send({
        message: 'Informe nome e e-mail validos.'
      })
    }

    const authenticatedSupabase = createSupabaseClient(accessToken)

    if (refreshToken) {
      await authenticatedSupabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })
    }

    const nextUserData = {
      data: {
        name: parsedBody.data.name,
        role: parsedBody.data.role || ''
      }
    }

    const { data, error } = await authenticatedSupabase.auth.updateUser(nextUserData)

    if (error || !data.user) {
      app.log.error(error, 'Supabase profile update failed')

      return reply.code(400).send({
        message: error?.message || 'Nao foi possivel atualizar o perfil.'
      })
    }

    return reply.send({
      user: data.user,
      message: 'Perfil atualizado.'
    })
  })

  app.get('/auth/me', {
    preHandler: app.requireAuth
  }, async (request) => ({
    user: request.user
  }))
}
