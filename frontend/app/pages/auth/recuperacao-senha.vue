<script setup lang="ts">
useHead({
  title: 'Recuperar senha | Dashboard Financeiro',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
  ]
})

const { recoverPassword } = useAuth()

const email = ref('')
const feedbackMessage = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

async function handleRecoverPassword() {
  feedbackMessage.value = ''
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    const response = await recoverPassword(email.value)
    feedbackMessage.value = response.message || 'Se o e-mail existir, enviaremos as instrucoes de recuperacao.'
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Nao foi possivel enviar o link.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="auth-shell">
    <section class="auth-card panel">
      <div class="auth-brand">
        <h1>Receba o link de acesso</h1>
      </div>

      <form class="auth-form" @submit.prevent="handleRecoverPassword">
        <label>
          E-mail cadastrado
          <span class="auth-input">
            <Icon name="lucide:mail" class="ui-icon muted" />
            <input v-model="email" type="email" placeholder="jaylon@empresa.com" autocomplete="email" required />
          </span>
        </label>

        <p v-if="feedbackMessage" class="auth-feedback success">{{ feedbackMessage }}</p>
        <p v-if="errorMessage" class="auth-feedback error">{{ errorMessage }}</p>

        <button class="auth-submit" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Enviando...' : 'Enviar link' }}
          <Icon name="lucide:send" class="ui-icon small" />
        </button>

        <NuxtLink class="auth-back-link" to="/auth/login">
          <Icon name="lucide:arrow-left" class="ui-icon small" />
          Voltar para login
        </NuxtLink>
      </form>
    </section>
  </main>
</template>
