<script setup lang="ts">
useHead({ title: 'Configuracoes | Dashboard Financeiro' })

const { user, changePassword, updateProfile, logout } = useAuth()
const { settings, loadSettings, saveSettings } = useUserSettings()

const profileForm = reactive({ ...settings.value.profile })
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const feedbackMessage = ref('')
const errorMessage = ref('')
const isSaving = ref(false)
const isChangingPassword = ref(false)

const avatarColors = ['#03c494', '#0ea5e9', '#6d28d9', '#f97316', '#111827']

const syncForms = () => {
  Object.assign(profileForm, settings.value.profile)
}

onMounted(() => {
  loadSettings(user.value?.email, {
    name: user.value?.user_metadata?.name,
    role: user.value?.user_metadata?.role
  })
  syncForms()
})

const avatarStyle = computed(() => ({
  background: `linear-gradient(135deg, ${profileForm.avatarColor}, #111827)`
}))

const showFeedback = (message: string) => {
  feedbackMessage.value = message
  errorMessage.value = ''
}

const showError = (message: string) => {
  errorMessage.value = message
  feedbackMessage.value = ''
}

const handleSaveSettings = async () => {
  if (!profileForm.name.trim()) {
    showError('Informe o nome do perfil.')
    return
  }

  if (!profileForm.email.trim()) {
    showError('Informe o e-mail do perfil.')
    return
  }

  isSaving.value = true

  try {
    const response = await updateProfile({
      name: profileForm.name,
      email: user.value?.email || profileForm.email,
      role: profileForm.role
    })

    saveSettings({
      profile: { ...profileForm },
      preferences: { ...settings.value.preferences },
      notifications: { ...settings.value.notifications },
      security: { ...settings.value.security }
    })
    showFeedback(response.message || 'Configuracoes salvas.')
  } catch (error) {
    showError(error instanceof Error ? error.message : 'Nao foi possivel salvar as configuracoes.')
  } finally {
    isSaving.value = false
  }
}

const handleChangePassword = async () => {
  if (passwordForm.newPassword.length < 8) {
    showError('A nova senha precisa ter pelo menos 8 caracteres.')
    return
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    showError('A confirmacao da senha nao confere.')
    return
  }

  isChangingPassword.value = true

  try {
    const response = await changePassword(passwordForm.currentPassword, passwordForm.newPassword)
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    showFeedback(response.message || 'Senha alterada com sucesso.')
  } catch (error) {
    showError(error instanceof Error ? error.message : 'Nao foi possivel alterar a senha.')
  } finally {
    isChangingPassword.value = false
  }
}

const handleLogoutAll = async () => {
  await logout()
  await navigateTo('/auth/login', { replace: true })
}
</script>

<template>
  <DashboardPageShell>
    <section class="page-heading">
      <div>
        <p>Configuracoes</p>
        <h2>Perfil e seguranca</h2>
      </div>
      <button class="primary-action" type="button" :disabled="isSaving" @click="handleSaveSettings">
        <Icon name="lucide:save" class="ui-icon small" />
        {{ isSaving ? 'Salvando...' : 'Salvar' }}
      </button>
    </section>

    <div v-if="feedbackMessage || errorMessage" class="settings-feedback" :class="{ error: errorMessage }">
      {{ feedbackMessage || errorMessage }}
    </div>

    <section class="page-grid two">
      <article class="panel profile-settings-card">
        <div class="section-heading compact">
          <h2>Foto e dados do perfil</h2>
        </div>

        <div class="profile-photo-row">
          <span class="profile-photo-preview" :style="avatarStyle"></span>
          <div class="settings-swatches" aria-label="Cor do perfil">
            <button
              v-for="color in avatarColors"
              :key="color"
              class="color-swatch"
              :class="{ active: profileForm.avatarColor === color }"
              :style="{ background: color }"
              type="button"
              :aria-label="`Usar cor ${color}`"
              @click="profileForm.avatarColor = color"
            />
          </div>
        </div>

        <div class="settings-form">
          <label>
            Nome
            <input v-model="profileForm.name" type="text" autocomplete="name" />
          </label>
          <label>
            E-mail de acesso
            <input v-model="profileForm.email" type="email" autocomplete="email" readonly />
          </label>
          <label>
            Cargo
            <input v-model="profileForm.role" type="text" />
          </label>
        </div>
      </article>

      <article class="panel profile-settings-card">
        <div class="section-heading compact">
          <h2>Senha e acesso</h2>
        </div>

        <div class="settings-form">
          <label>
            Senha atual
            <input v-model="passwordForm.currentPassword" type="password" placeholder="Digite sua senha atual" autocomplete="current-password" />
          </label>
          <label>
            Nova senha
            <input v-model="passwordForm.newPassword" type="password" placeholder="Digite uma nova senha" autocomplete="new-password" />
          </label>
          <label>
            Confirmar senha
            <input v-model="passwordForm.confirmPassword" type="password" placeholder="Confirme a nova senha" autocomplete="new-password" />
          </label>
        </div>

        <div class="settings-actions-row">
          <button class="secondary-action" type="button" :disabled="isChangingPassword" @click="handleChangePassword">
            <Icon name="lucide:key-round" class="ui-icon small" />
            {{ isChangingPassword ? 'Alterando...' : 'Alterar senha' }}
          </button>
          <button class="secondary-action danger" type="button" @click="handleLogoutAll">
            <Icon name="lucide:arrow-left" class="ui-icon small" />
            Sair
          </button>
        </div>
      </article>
    </section>
  </DashboardPageShell>
</template>
