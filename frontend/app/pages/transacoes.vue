<script setup lang="ts">
useHead({ title: 'Transacoes | Dashboard Financeiro' })

const { transactions } = useDashboardData()
</script>

<template>
  <DashboardPageShell>
    <section class="page-heading">
      <div>
        <p>Transacoes</p>
        <h2>Movimentacoes financeiras</h2>
      </div>
      <button class="primary-action" type="button">
        <Icon name="lucide:plus" class="ui-icon small" />
        Novo lancamento
      </button>
    </section>

    <section class="filter-bar panel">
      <button type="button">Todas</button>
      <button type="button">Receitas</button>
      <button type="button">Despesas</button>
      <button type="button">Pendentes</button>
    </section>

    <TransactionsTable :transactions="transactions" />
  </DashboardPageShell>
</template>
