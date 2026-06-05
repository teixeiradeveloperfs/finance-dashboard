type AuthUser = {
  id: string
  email?: string
}

type AuthResponse = {
  user?: AuthUser | null
  message?: string
}

export function useAuth() {
  const config = useRuntimeConfig()
  const apiBaseUrl = config.public.apiBaseUrl

  const request = async <T>(path: string, options: RequestInit = {}) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined)
    }

    if (import.meta.server) {
      const requestHeaders = useRequestHeaders(['cookie'])

      if (requestHeaders.cookie) {
        headers.cookie = requestHeaders.cookie
      }
    }

    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      credentials: 'include',
      headers
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(data?.message || 'Nao foi possivel concluir a acao.')
    }

    return data as T
  }

  const login = (email: string, password: string) => request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })

  const recoverPassword = (email: string) => request<AuthResponse>('/auth/recover', {
    method: 'POST',
    body: JSON.stringify({ email })
  })

  const logout = () => request<{ ok: boolean }>('/auth/logout', {
    method: 'POST'
  })

  const me = () => request<AuthResponse>('/auth/me')

  return {
    login,
    recoverPassword,
    logout,
    me
  }
}
