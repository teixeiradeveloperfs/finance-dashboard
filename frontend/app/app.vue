<script setup lang="ts">
const route = useRoute()
const isCheckingAuth = useState('auth:isChecking', () => false)
const publicRoutes = ['/auth/login', '/auth/recuperacao-senha']

const isProtectedRouteChecking = computed(() => (
  isCheckingAuth.value && !publicRoutes.includes(route.path)
))
</script>

<template>
  <NuxtRouteAnnouncer />
  <main v-if="isProtectedRouteChecking" class="auth-route-loader" aria-busy="true" aria-live="polite">
    <span class="auth-route-loader__spinner" aria-hidden="true" />
  </main>
  <NuxtPage v-else />
</template>
