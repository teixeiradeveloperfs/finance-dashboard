<script setup lang="ts">
const route = useRoute()

const navigationItems = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', to: '/' },
  { label: 'Contas', icon: 'lucide:wallet-cards', to: '/contas' },
  { label: 'Transacoes', icon: 'lucide:arrow-left-right', to: '/transacoes' },
  { label: 'Projetos', icon: 'lucide:folder-kanban', to: '/projetos' },
  { label: 'Categorias', icon: 'lucide:tags', to: '/categorias' },
  { label: 'Relatorios', icon: 'lucide:chart-no-axes-combined', to: '/relatorios' },
  { label: 'IA Financeira', icon: 'lucide:sparkles', to: '/ia-financeira' },
  { label: 'Configuracoes', icon: 'lucide:settings', to: '/configuracoes' }
]

const isActiveRoute = (path: string) => path === '/' ? route.path === '/' : route.path.startsWith(path)
</script>

<template>
  <aside class="dashboard-sidebar panel" aria-label="Navegacao principal">
    <NuxtLink class="sidebar-brand" to="/" aria-label="Ir para dashboard">
      <img class="sidebar-logo" src="/logo.png" alt="" aria-hidden="true" />
    </NuxtLink>

    <nav class="sidebar-nav">
      <NuxtLink
        v-for="item in navigationItems"
        :key="item.label"
        :to="item.to"
        class="sidebar-link"
        :class="{ active: isActiveRoute(item.to) }"
      >
        <Icon :name="item.icon" class="ui-icon" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>
