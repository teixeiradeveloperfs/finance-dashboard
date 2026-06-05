<script setup lang="ts">
import type { DashboardAccount } from '~/composables/useDashboardData'

defineProps<{
  accounts: DashboardAccount[]
}>()
</script>

<template>
  <article class="panel list-card">
    <div class="section-heading compact">
      <h2>Contas</h2>
      <button type="button">Ver todas</button>
    </div>
    <ul class="rows-list">
      <li v-for="account in accounts" :key="account.name">
        <span class="row-badge" :style="{ backgroundColor: account.color }">{{ account.badge }}</span>
        <span class="row-main"><strong>{{ account.name }}</strong><small>{{ account.type }}</small></span>
        <strong>{{ account.amount }}</strong>
        <Icon name="lucide:chevron-right" class="ui-icon small muted" />
      </li>
    </ul>
  </article>
</template>
