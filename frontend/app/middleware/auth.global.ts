export default defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = ['/auth/login', '/auth/recuperacao-senha']
  const { ensureSession, isAuthenticated } = useAuth()

  if (publicRoutes.includes(to.path)) {
    try {
      await ensureSession()

      if (isAuthenticated.value) {
        return navigateTo('/', {
          replace: true,
          redirectCode: 302
        })
      }
    } catch {
      return
    }

    return
  }

  try {
    await ensureSession()
  } catch {
    return navigateTo('/auth/login', {
      replace: true,
      redirectCode: 302
    })
  }
})
