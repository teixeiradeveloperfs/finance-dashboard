<script setup lang="ts">
useHead({ title: 'IA Financeira | Dashboard Financeiro' })

const { transactions, categoryLegend } = useDashboardData()
</script>

<template>
  <DashboardPageShell>
    <section class="page-heading">
      <div>
        <p>IA Financeira</p>
        <h2>Automacoes e insights</h2>
      </div>
      <button class="primary-action" type="button">
        <Icon name="lucide:sparkles" class="ui-icon small" />
        Gerar analise
      </button>
    </section>

    <section class="page-grid two">
      <AiInsights :category-legend="categoryLegend" :transactions="transactions" />
      <article class="panel management-card">
        <div class="section-heading compact">
          <h2>Automacoes sugeridas</h2>
        </div>
        <p v-if="!transactions.length" class="empty-state compact">Nenhuma transacao cadastrada para sugerir automacoes.</p>
        <div v-else class="settings-list">
          <div v-for="transaction in transactions.slice(0, 3)" :key="`${transaction.description}-${transaction.date}`">
            <span>{{ transaction.description }}</span>
            <em>{{ transaction.category }}</em>
          </div>
        </div>
      </article>
    </section>
  </DashboardPageShell>
</template>
