import type { FastifyReply, FastifyRequest } from 'fastify'
import { env, isProduction } from '../config/env.js'

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax' as const,
  path: '/',
  signed: true
}

const accessMaxAge = 60 * 60
const refreshMaxAge = 60 * 60 * 24 * 30

export function setAuthCookies(reply: FastifyReply, accessToken: string, refreshToken: string) {
  reply
    .setCookie(env.AUTH_COOKIE_NAME, accessToken, {
      ...cookieOptions,
      maxAge: accessMaxAge
    })
    .setCookie(env.AUTH_REFRESH_COOKIE_NAME, refreshToken, {
      ...cookieOptions,
      maxAge: refreshMaxAge
    })
}

export function clearAuthCookies(reply: FastifyReply) {
  reply
    .clearCookie(env.AUTH_COOKIE_NAME, { path: '/' })
    .clearCookie(env.AUTH_REFRESH_COOKIE_NAME, { path: '/' })
}

export function getSignedCookie(request: FastifyRequest, name: string) {
  const rawCookie = request.cookies[name]

  if (!rawCookie) {
    return null
  }

  const unsignedCookie = request.unsignCookie(rawCookie)

  return unsignedCookie.valid ? unsignedCookie.value : null
}
