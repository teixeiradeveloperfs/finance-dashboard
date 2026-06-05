<script setup lang="ts">
const route = useRoute()

const mobileItems = [
  { label: 'Inicio', icon: 'lucide:layout-dashboard', to: '/' },
  { label: 'Contas', icon: 'lucide:wallet-cards', to: '/contas' },
  { label: 'Transacoes', icon: 'lucide:arrow-left-right', to: '/transacoes' },
  { label: 'Projetos', icon: 'lucide:folder-kanban', to: '/projetos' },
  { label: 'Mais', icon: 'lucide:ellipsis', to: '/configuracoes' }
]

const isActiveRoute = (path: string) => path === '/' ? route.path === '/' : route.path.startsWith(path)
</script>

<template>
  <nav class="mobile-nav" aria-label="Navegacao mobile">
    <NuxtLink
      v-for="item in mobileItems"
      :key="item.label"
      :to="item.to"
      class="mobile-nav-link"
      :class="{ active: isActiveRoute(item.to) }"
    >
      <Icon :name="item.icon" class="ui-icon" />
      <span>{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>
