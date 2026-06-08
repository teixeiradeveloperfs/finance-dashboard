<script setup lang="ts">
import type { DashboardLegendItem, DashboardTransaction } from '~/composables/useDashboardData'

const props = defineProps<{
  categoryLegend: DashboardLegendItem[]
  transactions: DashboardTransaction[]
}>()

const topCategory = computed(() => props.categoryLegend[0])
const recurringCount = computed(() => {
  const descriptions = new Set(props.transactions.map((transaction) => transaction.description.toLowerCase()))

  return Math.max(0, props.transactions.length - descriptions.size)
})
</script>

<template>
  <article class="panel ai-card">
    <span class="side-icon ai-icon"><Icon name="lucide:sparkles" class="ui-icon" /></span>
    <h2>IA Financeira</h2>
    <div class="insight-box">
      <p v-if="transactions.length">Identifiquei {{ recurringCount }} lancamentos com padrao recorrente.</p>
      <p v-else>Nenhuma transacao cadastrada para gerar insights.</p>
      <button type="button">Ver sugestoes</button>
    </div>
    <p v-if="topCategory">Categoria mais alta do mes: <strong>{{ topCategory.name }}</strong></p>
    <p v-else>Cadastre categorias e transacoes para acompanhar padroes.</p>
    <div v-if="topCategory" class="insight-metric">
      <span>{{ topCategory.value }} das despesas</span>
      <strong>↗</strong>
    </div>
  </article>
</template>
