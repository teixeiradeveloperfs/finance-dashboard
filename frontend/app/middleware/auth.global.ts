export default defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = ['/auth/login', '/auth/recuperacao-senha']

  if (publicRoutes.includes(to.path)) {
    return
  }

  const { me } = useAuth()

  try {
    await me()
  } catch {
    return navigateTo('/auth/login')
  }
})
