<script setup lang="ts">
useHead({
  title: 'Login | Dashboard Financeiro',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
  ]
})

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

async function handleLogin() {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    await login(email.value, password.value)
    await router.push('/')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Nao foi possivel entrar.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="auth-shell">
    <section class="auth-card panel">
      <div class="auth-brand">
        <img class="brand-mark" src="/logo.png" alt="" aria-hidden="true" />
        <h1>Entre na sua conta</h1>
      </div>

      <form class="auth-form" @submit.prevent="handleLogin">
        <label>
          E-mail
          <span class="auth-input">
            <Icon name="lucide:mail" class="ui-icon muted" />
            <input v-model="email" type="email" placeholder="jaylon@empresa.com" autocomplete="email" required />
          </span>
        </label>

        <label>
          Senha
          <span class="auth-input">
            <Icon name="lucide:lock-keyhole" class="ui-icon muted" />
            <input v-model="password" type="password" placeholder="Digite sua senha" autocomplete="current-password" required />
          </span>
        </label>

        <div class="auth-options">
          <label class="auth-check">
            <input type="checkbox" />
            Lembrar acesso
          </label>

          <NuxtLink to="/auth/recuperacao-senha">
            Esqueci minha senha
          </NuxtLink>
        </div>

        <p v-if="errorMessage" class="auth-feedback error">{{ errorMessage }}</p>

        <button class="auth-submit" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Entrando...' : 'Entrar' }}
          <Icon name="lucide:arrow-right" class="ui-icon small" />
        </button>
      </form>
    </section>
  </main>
</template>
