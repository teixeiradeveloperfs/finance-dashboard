export type AuthUser = {
  id: string
  email?: string
  user_metadata?: {
    name?: string
    role?: string
    [key: string]: unknown
  }
}

type AuthResponse = {
  user?: AuthUser | null
  message?: string
}

type AuthStatus = 'unknown' | 'checking' | 'authenticated' | 'unauthenticated'

const authCheckTtl = 60 * 1000

export function useAuth() {
  const config = useRuntimeConfig()
  const apiBaseUrl = config.public.apiBaseUrl
  const user = useState<AuthUser | null>('auth:user', () => null)
  const status = useState<AuthStatus>('auth:status', () => 'unknown')
  const lastCheckedAt = useState<number>('auth:lastCheckedAt', () => 0)
  const isChecking = useState('auth:isChecking', () => false)

  const isAuthenticated = computed(() => status.value === 'authenticated' && Boolean(user.value))

  const setAuthenticatedUser = (authUser: AuthUser) => {
    user.value = authUser
    status.value = 'authenticated'
    lastCheckedAt.value = Date.now()
  }

  const clearSession = () => {
    user.value = null
    status.value = 'unauthenticated'
    lastCheckedAt.value = Date.now()
  }

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

  const ensureSession = async (options: { force?: boolean } = {}) => {
    const now = Date.now()
    const shouldReuseClientSession = import.meta.client
      && !options.force
      && status.value !== 'unknown'
      && now - lastCheckedAt.value < authCheckTtl

    if (shouldReuseClientSession) {
      return user.value
    }

    status.value = 'checking'
    isChecking.value = true

    try {
      const response = await request<AuthResponse>('/auth/me')

      if (response.user) {
        setAuthenticatedUser(response.user)
        return response.user
      }

      clearSession()
      return null
    } catch (error) {
      clearSession()
      throw error
    } finally {
      isChecking.value = false
    }
  }

  const login = async (email: string, password: string) => {
    status.value = 'checking'
    isChecking.value = true

    try {
      const response = await request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      if (response.user) {
        setAuthenticatedUser(response.user)
      }

      return response
    } catch (error) {
      clearSession()
      throw error
    } finally {
      isChecking.value = false
    }
  }

  const recoverPassword = (email: string) => request<AuthResponse>('/auth/recover', {
    method: 'POST',
    body: JSON.stringify({ email })
  })

  const changePassword = (currentPassword: string, newPassword: string) => request<{ ok: boolean, message?: string }>('/auth/password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword })
  })

  const updateProfile = async (profile: { name: string, email: string, role?: string }) => {
    const response = await request<AuthResponse>('/auth/profile', {
      method: 'POST',
      body: JSON.stringify(profile)
    })

    if (response.user) {
      setAuthenticatedUser(response.user)
    }

    return response
  }

  const logout = async () => {
    try {
      await request<{ ok: boolean }>('/auth/logout', {
        method: 'POST'
      })
    } finally {
      clearSession()
    }
  }

  const me = () => ensureSession({ force: true })

  return {
    user,
    status,
    isChecking,
    isAuthenticated,
    ensureSession,
    clearSession,
    login,
    recoverPassword,
    changePassword,
    updateProfile,
    logout,
    me
  }
}
