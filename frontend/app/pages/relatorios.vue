<script setup lang="ts">
useHead({ title: 'Relatorios | Dashboard Financeiro' })
</script>

<template>
  <DashboardPageShell>
    <section class="page-heading">
      <div>
        <p>Relatorios</p>
        <h2>Analises e exportacoes</h2>
      </div>
      <button class="primary-action" type="button">
        <Icon name="lucide:download" class="ui-icon small" />
        Exportar
      </button>
    </section>

    <section class="page-grid three">
      <article class="panel report-card">
        <Icon name="lucide:chart-no-axes-combined" class="report-icon" />
        <p>DRE gerencial</p>
        <small>Receitas, despesas e lucro por periodo.</small>
      </article>
      <article class="panel report-card">
        <Icon name="lucide:landmark" class="report-icon" />
        <p>Extrato consolidado</p>
        <small>Movimentacoes por conta e projeto.</small>
      </article>
      <article class="panel report-card">
        <Icon name="lucide:pie-chart" class="report-icon" />
        <p>Categorias</p>
        <small>Distribuicao mensal das despesas.</small>
      </article>
    </section>
  </DashboardPageShell>
</template>
