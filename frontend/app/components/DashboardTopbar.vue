<script setup lang="ts">
const { user, logout } = useAuth()
const { settings, loadSettings } = useUserSettings()

onMounted(() => {
  loadSettings(user.value?.email, {
    name: user.value?.user_metadata?.name,
    role: user.value?.user_metadata?.role
  })
})

const userEmail = computed(() => settings.value.profile.email || user.value?.email || 'Usuario')
const userName = computed(() => settings.value.profile.name || user.value?.user_metadata?.name || userEmail.value.split('@')[0] || 'Usuario')

async function handleLogout() {
  await logout()
  await navigateTo('/auth/login', {
    replace: true
  })
}
</script>

<template>
  <header class="topbar panel">
    <div class="brand-block">
      <img class="brand-mark topbar-logo" src="/favicon.ico" alt="" aria-hidden="true" />
      <div>
        <p class="eyebrow">Bom dia, {{ userName }}</p>
        <h1>Aqui esta o resumo financeiro da sua empresa hoje.</h1>
      </div>
    </div>

    <label class="search-box">
      <Icon name="lucide:search" class="ui-icon muted" />
      <input type="search" placeholder="Buscar..." />
      <kbd>⌘K</kbd>
    </label>

    <div class="header-actions">
      <button class="icon-button" type="button" aria-label="Notificacoes">
        <Icon name="lucide:bell" class="ui-icon" />
      </button>
      <button class="profile-button" type="button" aria-label="Abrir perfil">
        <span class="avatar"></span>
        <span>
          <strong>{{ userName }}</strong>
          <small>{{ userEmail }}</small>
        </span>
        <Icon name="lucide:chevron-down" class="ui-icon small muted" />
      </button>
      <button class="icon-button" type="button" aria-label="Sair" @click="handleLogout">
        <Icon name="lucide:arrow-left" class="ui-icon" />
      </button>
    </div>
  </header>
</template>
